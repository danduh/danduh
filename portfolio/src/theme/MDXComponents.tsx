import MDXComponents from '@theme-original/MDXComponents';
import CodeTabs from '@site/src/components/CodeTabs';
import {CourseSchema, LessonSchema} from '@site/src/components/Schema';

// Register course-authoring components globally so MDX pages can use
// <CodeTabs>, <CourseSchema>, and <LessonSchema> without a per-file import.
// Existing content that doesn't use these tags is unaffected.
export default {
  ...MDXComponents,
  CodeTabs,
  CourseSchema,
  LessonSchema,
};
