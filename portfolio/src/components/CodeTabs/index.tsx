import React, {type ReactNode} from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

/**
 * CodeTabs — a thin wrapper over Docusaurus's built-in <Tabs>/<TabItem> that
 * renders a JavaScript / TypeScript pair of code blocks as synced tabs.
 *
 * Usage in MDX (registered globally in src/theme/MDXComponents.tsx, so no
 * import is needed in the page):
 *
 *   <CodeTabs>
 *   ```js
 *   const session = await LanguageModel.create();
 *   ```
 *   ```ts
 *   const session: LanguageModel = await LanguageModel.create();
 *   ```
 *   </CodeTabs>
 *
 * Convention: the FIRST fenced block is JavaScript, the SECOND is TypeScript.
 *
 * Why the built-in Tabs: a shared `groupId` syncs the JS/TS choice across every
 * CodeTabs on the page and persists it in localStorage — and BOTH panels are
 * emitted into the static HTML, so JS-less AI crawlers see both languages.
 */
export interface CodeTabsProps {
  children: ReactNode;
  /** Tabs sharing a groupId sync their selection. Default: 'code-lang'. */
  groupId?: string;
}

export default function CodeTabs({
  children,
  groupId = 'code-lang',
}: CodeTabsProps): ReactNode {
  // MDX interleaves whitespace text nodes between the fenced blocks — keep
  // only real elements, then take [js, ts] by position.
  const blocks = React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  );

  const [js, ts] = blocks;

  return (
    <Tabs groupId={groupId}>
      <TabItem value="js" label="JavaScript">
        {js}
      </TabItem>
      <TabItem value="ts" label="TypeScript">
        {ts}
      </TabItem>
    </Tabs>
  );
}
