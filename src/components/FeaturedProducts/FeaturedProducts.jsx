import { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProducts = () => {
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
        heading="Featured Products"
        description="Discover Tech Fusion's featured products: cutting-edge web and mobile apps, innovative AI tools, and powerful software solutions. Designed for efficiency and user engagement, our products help transform your business and drive success in the digital age. Explore the future of technology with Tech Fusion!"
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

export default FeaturedProducts;
