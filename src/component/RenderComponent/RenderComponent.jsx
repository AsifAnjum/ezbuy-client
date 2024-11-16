const RenderComponent = ({
  isLoading,
  isError,
  item,
  loadingComponent,
  errorComponent,
  emptyComponent,
  contentComponent,
}) => {
  const itemType = Object.prototype.toString.call(item).slice(8, -1);

  if (isLoading) return loadingComponent;
  if (isError) return errorComponent;

  if (itemType === "Array") {
    if (item.length === 0) return emptyComponent;

    return contentComponent;
  }

  if (itemType === "Object") {
    if (!Object.keys(item).length) return emptyComponent;

    return contentComponent;
  }

  return emptyComponent;
};
export default RenderComponent;
