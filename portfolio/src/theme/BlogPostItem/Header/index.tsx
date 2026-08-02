import React, {type ReactNode} from 'react';
import Header from '@theme-original/BlogPostItem/Header';
import type HeaderType from '@theme/BlogPostItem/Header';
import type {WrapperProps} from '@docusaurus/types';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import ShareButtons from '@site/src/components/ShareButtons';

type Props = WrapperProps<typeof HeaderType>;

export default function HeaderWrapper(props: Props): ReactNode {
  const {metadata, isBlogPostPage} = useBlogPost();
  return (
    <>
      <Header {...props} />
      {isBlogPostPage && (
        <ShareButtons
          title={metadata.title}
          permalink={metadata.permalink}
          placement="top"
        />
      )}
    </>
  );
}
