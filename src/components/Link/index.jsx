import React, { useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Index = ({ isCurrent: _isCurrent, to, ...props }) => {
  const { location } = useHistory();

  const isCurrent = useMemo(() => {
    if (_isCurrent !== undefined) {
      return _isCurrent;
    }

    let url = to;

    if (typeof to !== 'string') {
      url = to?.pathname;
    }

    return pathnameIsCurrentPath(url, location.pathname);
  }, [to, location.pathname, _isCurrent]);

  if (!isCurrent) {
    return <a href={to} {...props} />;
  } else {
    return <Link to={to} {...props} />;
  }
};

export const pathnameIsCurrentPath = (url, pathname) => {
  const entry = getEntry(pathname);
  let value = true; // 是否当前入口路由

  if (url) {
    if (entry) {
      value = new RegExp(`^/${entry}`).test(url);
    } else {
      value = !/^\/(book)/.test(url);
    }
  }
  return value;
};

const getEntry = (pathname) => {
  if (/^\/book/.test(pathname)) {
    return 'book';
  }
  return '';
};

export default Index;
