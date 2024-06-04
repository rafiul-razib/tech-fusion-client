import { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import ProductCard from "../ProductCard/ProductCard";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("fakeProductByUser.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  return (
    <div>
      <SectionHeader
        heading="Trending Products"
        description="The latest in web and mobile apps, AI tools, and software solutions. These popular offerings are redefining industry standards, delivering innovation, and enhancing user experience. Stay ahead with the top-rated products making waves in the tech world."
      />

      <div className="grid grid-cols-2 gap-5 mx-auto max-w-6xl my-10">
        {products.map((product) => (
          <ProductCard
            key={product.product_name}
            product={product}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
