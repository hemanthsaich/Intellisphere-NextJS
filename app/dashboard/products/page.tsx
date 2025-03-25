'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Grid,
  Column,
  ClickableTile,
  AspectRatio,
  Loading,
  Search,
  Content,
} from '@carbon/react';
import styles from './products.module.scss';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading description="Loading products..." withOverlay={false} />
      </div>
    );
  }

  return (
    <Content>
      <div className={styles.container}>
        <Grid className="mb-8">
          <Column sm={4} md={8} lg={16}>
            <h1 className="cds--type-productive-heading-05">Products</h1>
          </Column>
          <Column sm={4} md={8} lg={8}>
            <Search
              labelText="Search products"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="lg"
              className={styles.search}
            />
          </Column>
        </Grid>

        <Grid narrow className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <Column sm={4} md={4} lg={4} key={product.id} className={styles.column}>
              <ClickableTile
                className={styles.productTile}
                onClick={() => router.push(`/dashboard/products/product/${product.id}`)}
              >
                <AspectRatio ratio="16x9">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className={styles.productImage}
                  />
                </AspectRatio>
                <div className={styles.productContent}>
                  <h3 className="cds--type-productive-heading-02">{product.title}</h3>
                  <p className="cds--type-body-long-01 mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </ClickableTile>
            </Column>
          ))}
        </Grid>
      </div>
    </Content>
  );
}