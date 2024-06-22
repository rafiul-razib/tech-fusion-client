const SectionHeader = ({ heading, description }) => {
  return (
    <div className="text-center mt-20 mb-6 space-y-4 px-4">
      <h3 className="text-3xl md:text-5xl font-bold text-orange-600">
        {heading}
      </h3>
      <p className="tex-sm md:text-md font-extralight mx-auto max-w-4xl">
        {description}
      </p>
      <div className="divider w-1/2 mx-auto"></div>
    </div>
  );
};

export default SectionHeader;
