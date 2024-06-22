import useUserProducts from "../../assets/Hooks/useUserProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import SectionHeader from "../../components/SectionHeader/SectionHeader";

const AllProducts = () => {
  const [products] = useUserProducts();
  const acceptedProducts = products.filter(
    (item) => item.status === "accepted"
  );
  return (
    <div className="pt-8">
      <SectionHeader
        heading="All Products"
        description="The latest in web and mobile apps, AI tools, and software solutions. These popular offerings are redefining industry standards, delivering innovation, and enhancing user experience. Stay ahead with the top-rated products making waves in the tech world."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-auto max-w-6xl my-10">
        {acceptedProducts.map((product) => (
          <ProductCard
            key={product.product_name}
            product={product}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
