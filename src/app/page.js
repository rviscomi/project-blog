import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';
import { getBlogPostList } from '@/helpers/file-helpers';
import { BLOG_TITLE } from '@/constants';

import styles from './homepage.module.css';

export function generateMetadata() {
  return {
    title: BLOG_TITLE
  }
}

async function Home() {
  const blogPosts = await getBlogPostList();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Latest Content:
      </h1>

      { blogPosts.map(blogPost => (
        <BlogSummaryCard
          key={blogPost.slug}
          slug={blogPost.slug}
          title={blogPost.title}
          abstract={blogPost.abstract}
          publishedOn={blogPost.publishedOn}
        />
      )
      ) }
    </div>
  );
}

export default Home;
