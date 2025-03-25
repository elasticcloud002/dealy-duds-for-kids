
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Kids' Clothing Brands in 2023",
    excerpt: "Discover the best children's clothing brands that combine style, comfort, and durability without breaking the bank.",
    date: "October 15, 2023",
    author: "Emily Johnson",
    category: "Shopping Tips",
    image: "https://images.unsplash.com/photo-1579616043939-95d87a6e8512?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "How to Buy Kids' Clothes That Last Longer",
    excerpt: "Smart shopping tips to ensure your children's clothes withstand playtime, spills, and multiple washes.",
    date: "September 28, 2023",
    author: "Michael Roberts",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "Seasonal Clothing Guide: What Your Kids Need",
    excerpt: "A comprehensive guide to building a practical wardrobe for your children throughout all four seasons.",
    date: "August 10, 2023",
    author: "Sarah Williams",
    category: "Seasonal",
    image: "https://images.unsplash.com/photo-1560406896-c66ef8677e77?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    title: "Budget-Friendly Back to School Shopping",
    excerpt: "How to prepare your kids for school without spending a fortune on new clothes and accessories.",
    date: "July 22, 2023",
    author: "David Miller",
    category: "Budgeting",
    image: "https://images.unsplash.com/photo-1614964579797-8c6bd7a8477e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
];

const Blog = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-medium mb-6 text-center">Our Blog</h1>
            <p className="text-lg text-center text-muted-foreground mb-12">
              Discover tips, guides and the latest trends in children's fashion
            </p>

            <div className="space-y-10">
              {blogPosts.map((post) => (
                <article key={post.id} className="border-b pb-10">
                  <Link to={`/blog/${post.id}`} className="group cursor-pointer">
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                    </div>
                    <div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.category}</span>
                      </div>
                      <h2 className="text-2xl font-medium mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">By {post.author}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
