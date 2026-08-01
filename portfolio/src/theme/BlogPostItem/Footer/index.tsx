import React, {type ReactNode} from 'react';
import Footer from '@theme-original/BlogPostItem/Footer';
import type FooterType from '@theme/BlogPostItem/Footer';
import type {WrapperProps} from '@docusaurus/types';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import ShareButtons from '@site/src/components/ShareButtons';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): ReactNode {
  const {metadata, isBlogPostPage} = useBlogPost();
  return (
    <>
      <Footer {...props} />
      {isBlogPostPage && (
        <ShareButtons title={metadata.title} permalink={metadata.permalink} />
      )}
    </>
  );
}
