export const menuToRoutes = (list: any[], parent_id: number | null) => {
  const children = list.filter((item) => item.parent_id === parent_id);
  return children.map((item) => ({
    ...{
      id: item.id,
      path: item.parent_id || item.link ? item.path : `/${item.path}`,
      name: item.path,
      component: item.component,
      redirect: item.redirect,
      meta: {
        title: item.name,
        icon: item.icon,
        link: item.link ? true : false,
        cache: item.cache ? true : false,
        hidden: item.hidden ? true : false,
      },
    },
    children: item.link ? undefined : menuToRoutes(list, item.id),
  }));
};

export const changeTree = (list: any[], parent_id: number | null) => {
  const children = list.filter((item) => item.parent_id === parent_id);
  return children.map((item) => ({
    ...item,
    children: changeTree(list, item.id),
  }));
};
