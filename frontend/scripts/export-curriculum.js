/**
 * Export all curriculum data to JSON for database seeding
 * Run with: node scripts/export-curriculum.js
 */

const fs = require('fs');
const path = require('path');

// We need to use ts-node or compile first, so let's parse the TS files directly
// This is a simplified parser for the curriculum structure

function parseTypeScriptCurriculum(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract the curriculum object using regex
  // This works because the structure is consistent
  const levelMatch = content.match(/level:\s*['"](\w+)['"]/);
  const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
  const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/);
  const totalWordsMatch = content.match(/totalWords:\s*(\d+)/);
  const totalLessonsMatch = content.match(/totalLessons:\s*(\d+)/);

  // Extract courses array
  const coursesStart = content.indexOf('courses: [');
  if (coursesStart === -1) return null;

  const curriculum = {
    level: levelMatch ? levelMatch[1] : '',
    title: titleMatch ? titleMatch[1] : '',
    description: descMatch ? descMatch[1] : '',
    totalWords: totalWordsMatch ? parseInt(totalWordsMatch[1]) : 0,
    totalLessons: totalLessonsMatch ? parseInt(totalLessonsMatch[1]) : 0,
    courses: []
  };

  // Parse courses using a more robust approach
  // Find each course block
  const courseRegex = /\{\s*id:\s*['"]([^'"]+)['"],\s*level:\s*['"](\w+)['"],\s*courseNumber:\s*(\d+),\s*title:\s*['"]([^'"]+)['"],\s*description:\s*['"]([^'"]+)['"],\s*totalLessons:\s*(\d+),\s*totalWords:\s*(\d+),\s*lessons:\s*\[/g;

  let courseMatch;
  let coursePositions = [];

  while ((courseMatch = courseRegex.exec(content)) !== null) {
    coursePositions.push({
      index: courseMatch.index,
      id: courseMatch[1],
      level: courseMatch[2],
      courseNumber: parseInt(courseMatch[3]),
      title: courseMatch[4],
      description: courseMatch[5],
      totalLessons: parseInt(courseMatch[6]),
      totalWords: parseInt(courseMatch[7]),
      lessons: []
    });
  }

  // For each course, extract its lessons
  for (let i = 0; i < coursePositions.length; i++) {
    const course = coursePositions[i];
    const startPos = course.index;
    const endPos = i < coursePositions.length - 1 ? coursePositions[i + 1].index : content.length;
    const courseContent = content.substring(startPos, endPos);

    // Parse lessons within this course
    const lessonRegex = /\{\s*id:\s*['"]([^'"]+)['"],\s*courseId:\s*['"]([^'"]+)['"],\s*lessonNumber:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"],\s*duration:\s*['"]([^'"]+)['"],\s*vocabularyCount:\s*(\d+),\s*theme:\s*['"]([^'"]+)['"]/g;

    let lessonMatch;
    while ((lessonMatch = lessonRegex.exec(courseContent)) !== null) {
      const lesson = {
        id: lessonMatch[1],
        courseId: lessonMatch[2],
        lessonNumber: lessonMatch[3],
        title: lessonMatch[4],
        duration: lessonMatch[5],
        vocabularyCount: parseInt(lessonMatch[6]),
        theme: lessonMatch[7],
        objectives: [],
        grammarNotes: []
      };

      // Try to extract objectives for this lesson
      const lessonStart = lessonMatch.index;
      const nextLessonMatch = lessonRegex.exec(courseContent);
      const lessonEnd = nextLessonMatch ? nextLessonMatch.index : courseContent.length;
      lessonRegex.lastIndex = lessonMatch.index + 1; // Reset to continue from current position

      const lessonContent = courseContent.substring(lessonStart, lessonEnd);

      // Extract objectives array
      const objectivesMatch = lessonContent.match(/objectives:\s*\[([\s\S]*?)\]/);
      if (objectivesMatch) {
        const objectivesStr = objectivesMatch[1];
        const objectives = objectivesStr.match(/['"]([^'"]+)['"]/g);
        if (objectives) {
          lesson.objectives = objectives.map(o => o.replace(/['"]/g, ''));
        }
      }

      // Extract grammar notes array
      const grammarMatch = lessonContent.match(/grammarNotes:\s*\[([\s\S]*?)\]/);
      if (grammarMatch) {
        const grammarStr = grammarMatch[1];
        const grammarNotes = grammarStr.match(/['"]([^'"]+)['"]/g);
        if (grammarNotes) {
          lesson.grammarNotes = grammarNotes.map(g => g.replace(/['"]/g, ''));
        }
      }

      // Extract prerequisite
      const prereqMatch = lessonContent.match(/prerequisite:\s*['"]([^'"]+)['"]/);
      if (prereqMatch) {
        lesson.prerequisite = prereqMatch[1];
      }

      course.lessons.push(lesson);
    }

    delete course.index;
    curriculum.courses.push(course);
  }

  return curriculum;
}

// Main export function
function exportAllCurriculum() {
  const curriculumDir = path.join(__dirname, '..', 'data', 'curriculum');
  const outputDir = path.join(__dirname, '..', '..', 'backend', 'data');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const curriculumFiles = [
    'a1-curriculum.ts',
    'a2-curriculum.ts',
    'b1-curriculum.ts',
    'b2-curriculum.ts',
    'tourist-curriculum.ts'
  ];

  const allCurriculum = [];

  for (const file of curriculumFiles) {
    const filePath = path.join(curriculumDir, file);
    if (fs.existsSync(filePath)) {
      console.log(`Parsing ${file}...`);
      const curriculum = parseTypeScriptCurriculum(filePath);
      if (curriculum) {
        allCurriculum.push(curriculum);
        console.log(`  Found ${curriculum.courses.length} courses with ${curriculum.totalLessons} lessons`);
      }
    } else {
      console.log(`  File not found: ${file}`);
    }
  }

  // Write combined output
  const outputPath = path.join(outputDir, 'curriculum.json');
  fs.writeFileSync(outputPath, JSON.stringify(allCurriculum, null, 2));
  console.log(`\nExported curriculum to: ${outputPath}`);

  // Summary
  let totalCourses = 0;
  let totalLessons = 0;
  for (const curr of allCurriculum) {
    totalCourses += curr.courses.length;
    for (const course of curr.courses) {
      totalLessons += course.lessons.length;
    }
  }
  console.log(`Total: ${allCurriculum.length} levels, ${totalCourses} courses, ${totalLessons} lessons`);
}

exportAllCurriculum();
