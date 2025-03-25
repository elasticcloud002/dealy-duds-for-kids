
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

// This would normally come from a database or API
const getBlogPost = (id: string) => {
  // Mock blog post data
  return {
    id: parseInt(id),
    title: "Top 10 Kids' Clothing Brands in 2023",
    content: `
      <p>Finding the perfect balance between quality, style, and affordability in children's clothing can be challenging. Kids grow quickly, and their preferences change just as fast, making it essential to invest in brands that offer durability without breaking the bank.</p>
      
      <p>In this comprehensive guide, we've compiled the top 10 kids' clothing brands of 2023 that parents love and children enjoy wearing. These selections are based on fabric quality, design versatility, size consistency, and value for money.</p>
      
      <h2>1. Carter's</h2>
      <p>A long-standing favorite among parents, Carter's continues to deliver reliable quality at accessible price points. Their size range accommodates children from newborn to youth, with particularly strong offerings in the baby and toddler categories.</p>
      
      <h2>2. H&M Kids</h2>
      <p>Known for translating current trends into age-appropriate designs, H&M offers stylish options at budget-friendly prices. Their Conscious collection features sustainable materials, perfect for environmentally-conscious families.</p>
      
      <h2>3. Primary</h2>
      <p>Focusing on basics in a rainbow of colors, Primary creates gender-neutral clothing without slogans or characters. Their pieces are built to last and designed for mix-and-match versatility.</p>
      
      <h2>4. Gap Kids</h2>
      <p>With a perfect balance of classic and contemporary styles, Gap Kids provides clothing that stands up to active wear while maintaining its shape and color through multiple washes.</p>
      
      <h2>5. Old Navy</h2>
      <p>Budget-friendly without compromising on durability, Old Navy excels in providing seasonal essentials and playful designs that kids and parents both appreciate.</p>
    `,
    date: "October 15, 2023",
    author: "Emily Johnson",
    category: "Shopping Tips",
    image: "https://images.unsplash.com/photo-1579616043939-95d87a6e8512?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  };
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = getBlogPost(id || "1");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all articles
            </Link>
            
            <article>
              <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4">{post.title}</h1>
              
              <div className="flex items-center text-sm text-muted-foreground mb-8">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.category}</span>
                <span className="mx-2">•</span>
                <span>By {post.author}</span>
              </div>
              
              <div className="mb-8 overflow-hidden rounded-lg">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-80 object-cover" 
                />
              </div>
              
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
