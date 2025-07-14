// Facebook API Service
const FACEBOOK_ACCESS_TOKEN = process.env.REACT_APP_FACEBOOK_ACCESS_TOKEN;
const FACEBOOK_PAGE_ID = '61559057724990';

export interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  likes?: {
    summary: {
      total_count: number;
    };
  };
  comments?: {
    summary: {
      total_count: number;
    };
  };
  attachments?: {
    data: Array<{
      media?: {
        image?: {
          src: string;
        };
      };
    }>;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  likes: number;
  comments: number;
  author: string;
  fullMessage?: string;
}

// Function to fetch posts from Facebook Graph API
export const fetchFacebookPosts = async (): Promise<BlogPost[]> => {
  try {
    if (!FACEBOOK_ACCESS_TOKEN) {
      console.warn('Facebook access token not found. Using sample data.');
      return getSamplePosts();
    }

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/posts?fields=id,message,created_time,likes.summary(total_count),comments.summary(total_count),attachments{media{image{src}}}&access_token=${FACEBOOK_ACCESS_TOKEN}&limit=6`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Facebook posts');
    }

    const data = await response.json();
    return transformFacebookPosts(data.data);
  } catch (error) {
    console.error('Error fetching Facebook posts:', error);
    return getSamplePosts();
  }
};

// Transform Facebook posts to blog format
const transformFacebookPosts = (posts: FacebookPost[]): BlogPost[] => {
  return posts.map((post) => {
    const message = post.message || '';
    const words = message.split(' ');
    const title = words.slice(0, 8).join(' ') + (words.length > 8 ? '...' : '');
    const excerpt = words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '');
    
    const image = post.attachments?.data?.[0]?.media?.image?.src || 'Design Post';
    
    const createdDate = new Date(post.created_time);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60));
    
    let dateString = '';
    if (diffInHours < 1) {
      dateString = 'Just now';
    } else if (diffInHours < 24) {
      dateString = `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      dateString = `${diffInDays} days ago`;
    }

    return {
      id: post.id,
      title,
      excerpt,
      image,
      date: dateString,
      likes: post.likes?.summary?.total_count || 0,
      comments: post.comments?.summary?.total_count || 0,
      author: 'Portfolio',
      fullMessage: message
    };
  });
};

// Sample posts as fallback
const getSamplePosts = (): BlogPost[] => [
  {
    id: '1',
    title: 'How to Start with Good UI/UX Design',
    excerpt: 'Learn user-centered design techniques and methods to create great user experiences...',
    image: 'UI/UX Design',
    date: '2 hours ago',
    likes: 45,
    comments: 12,
    author: 'Portfolio'
  },
  {
    id: '2',
    title: 'Web Design Trends 2024',
    excerpt: 'Discover the latest web design trends for 2024, from Glassmorphism to Micro-interactions...',
    image: 'Web Design Trends',
    date: '1 day ago',
    likes: 89,
    comments: 23,
    author: 'Portfolio'
  },
  {
    id: '3',
    title: 'Tips for Creating an Outstanding Portfolio',
    excerpt: 'How to create a portfolio that will help you stand out in the eyes of clients and employers...',
    image: 'Portfolio Tips',
    date: '3 days ago',
    likes: 156,
    comments: 34,
    author: 'Portfolio'
  }
]; 