const Detail = (props) => {
  const {
    details,
    title = "Details",
    styleClass = "",
    separator = "/",
  } = props;

  if (!details) return;
  if (!Array.isArray(details) || !details.length)
    return <div className={styleClass}>{`${title}: ${details}`}</div>;

  return (
    <div className={styleClass}>
      {title}:
      {details.map((e, i) => (
        <span key={e}>
          {i === details.length - 1 ? ` ${e}` : ` ${e} ${separator}`}
        </span>
      ))}
    </div>
  );
};

export default Detail;
