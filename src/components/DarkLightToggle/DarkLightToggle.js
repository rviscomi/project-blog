'use client';
import React from 'react';
import { Sun, Moon } from 'react-feather';
import Cookie from 'js-cookie';

import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';

import VisuallyHidden from '@/components/VisuallyHidden';


function DarkLightToggle({ initialTheme, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function toggleTheme() {
    const nextTheme = theme == 'light' ? 'dark' : 'light';

    setTheme(nextTheme);

    Cookie.set('color-theme', nextTheme, {expires: 1000});

    const root = document.documentElement;
    const colors = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    root.setAttribute('style', Object.entries(colors).map(([key, value]) => `${key}: ${value}`).join('; '));
    root.setAttribute('data-color-theme', nextTheme);
  }
  return (
    <button {...delegated} onClick={toggleTheme}>
      {theme === 'dark' ? (
        <Moon size="1.5rem" />
      ) : (
        <Sun size="1.5rem" />
      )}
      <VisuallyHidden>
        Toggle dark / light mode
      </VisuallyHidden>
    </button>
  );
}

export default DarkLightToggle;
