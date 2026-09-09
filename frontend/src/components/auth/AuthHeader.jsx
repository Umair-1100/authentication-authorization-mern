const AuthHeader = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-2 text-center">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default AuthHeader;
