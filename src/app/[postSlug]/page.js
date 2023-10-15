import React from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet';
const DivisionGroupsDemo = dynamic(() => import('@/components/DivisionGroupsDemo'), {
  ssr: false
});
const CircularColorsDemo = dynamic(() => import('@/components/CircularColorsDemo'), {
  ssr: false
});

import { loadBlogPost } from '@/helpers/file-helpers';
import styles from './postSlug.module.css';

const getBlogPost = React.cache(async (slug) => {
  return await loadBlogPost(slug);
});

const mdxComponents = {
  pre: (props) => (
    <CodeSnippet {...props}>
      {props.children}
    </CodeSnippet>
  ),
  DivisionGroupsDemo: (props) => (
    <React.Suspense>
      <DivisionGroupsDemo {...props} />
    </React.Suspense>
  ),
  CircularColorsDemo: (props) => (
    <React.Suspense>
      <CircularColorsDemo {...props} />
    </React.Suspense>
  )
};

export async function generateMetadata({ params }) {
  let post;
  try {
    post = await getBlogPost(params.postSlug);
  } catch {
    notFound();
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.abstract
  }
}

async function BlogPost({ params }) {
  const post = await getBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote components={mdxComponents} source={post.content} />
      </div>
    </article>
  );
}

export default BlogPost;
