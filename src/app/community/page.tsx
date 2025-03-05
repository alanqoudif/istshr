'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaSearch, FaThumbsUp, FaComment, FaShare, 
  FaUserCircle, FaPlus, FaFilter, FaEllipsisH, FaTimes
} from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { CounsellingField } from '@/types';
import { authService } from '@/lib/auth';

// Mock data for community posts
const communityPosts = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Ahmed M.',
    userImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    title: 'Dealing with workplace anxiety',
    content: 'I have been experiencing increased anxiety at work lately. The pressure to perform and meet deadlines is overwhelming. Has anyone found effective strategies to manage workplace anxiety without it affecting your performance?',
    field: CounsellingField.MENTAL_HEALTH,
    likes: 24,
    commentCount: 8,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isAnonymous: false
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Anonymous User',
    userImage: null,
    title: 'Struggling with financial decisions',
    content: 'I recently received a job offer with higher pay but it would require relocating away from family. I am torn between financial security and maintaining close family connections. Any advice on how to approach this decision?',
    field: CounsellingField.FINANCIAL_ADVICE,
    likes: 15,
    commentCount: 12,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    isAnonymous: true
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Fatima H.',
    userImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    title: 'Parenting a teenager with anxiety',
    content: 'My 15-year-old has been showing signs of anxiety, especially around school and social situations. I want to support them without being overprotective. Any parents who have navigated this successfully?',
    field: CounsellingField.PARENTING,
    likes: 32,
    commentCount: 18,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isAnonymous: false
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'Khalid R.',
    userImage: 'https://randomuser.me/api/portraits/men/45.jpg',
    title: 'Career change at 40',
    content: 'I am considering a complete career change at 40. I have been in finance for 15 years but feel unfulfilled. Has anyone successfully transitioned to a new field later in life? What challenges did you face?',
    field: CounsellingField.CAREER_GUIDANCE,
    likes: 45,
    commentCount: 22,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    isAnonymous: false
  },
  {
    id: '5',
    userId: 'user5',
    userName: 'Anonymous User',
    userImage: null,
    title: 'Dealing with grief',
    content: 'I lost a close family member recently and am struggling to cope with the grief. It affects my daily life and ability to function. Any advice on grief counseling or coping mechanisms would be appreciated.',
    field: CounsellingField.MENTAL_HEALTH,
    likes: 56,
    commentCount: 34,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    isAnonymous: true
  }
];

// Trending topics
const trendingTopics = [
  'Anxiety Management',
  'Work-Life Balance',
  'Parenting Teens',
  'Career Transitions',
  'Relationship Advice',
  'Financial Planning',
  'Stress Reduction',
  'Self-Care Practices'
];

// Add these interfaces
interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userImage?: string | null;
  content: string;
  createdAt: Date;
  likes: number;
}

// Add these storage keys
const POSTS_STORAGE_KEY = 'istashr_community_posts';
const COMMENTS_STORAGE_KEY = 'istashr_community_comments';
const LIKES_STORAGE_KEY = 'istashr_community_likes';

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    field: '',
    isAnonymous: false
  });
  const [posts, setPosts] = useState<typeof communityPosts>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [userLikes, setUserLikes] = useState<Record<string, boolean>>({});
  const [activePost, setActivePost] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState<string | null>(null);
  
  // Load posts from localStorage and initialize with mock data if empty
  useEffect(() => {
    const user = authService.getCurrentUser();
    setIsLoggedIn(!!user);
    setCurrentUser(user);
    
    // Load posts from localStorage
    const savedPosts = localStorage.getItem(POSTS_STORAGE_KEY);
    if (savedPosts) {
      try {
        // Parse dates properly
        const parsedPosts = JSON.parse(savedPosts, (key, value) => {
          if (key === 'createdAt') {
            return new Date(value);
          }
          return value;
        });
        setPosts(parsedPosts);
      } catch (error) {
        console.error('Failed to parse saved posts:', error);
        setPosts(communityPosts);
      }
    } else {
      // Initialize with mock data
      setPosts(communityPosts);
      // Save mock data to localStorage
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(communityPosts));
    }
    
    // Load comments
    const savedComments = localStorage.getItem(COMMENTS_STORAGE_KEY);
    if (savedComments) {
      try {
        const parsedComments = JSON.parse(savedComments, (key, value) => {
          if (key === 'createdAt') {
            return new Date(value);
          }
          return value;
        });
        setComments(parsedComments);
      } catch (error) {
        console.error('Failed to parse saved comments:', error);
        setComments([]);
      }
    }
    
    // Load user likes
    if (user) {
      const savedLikes = localStorage.getItem(`${LIKES_STORAGE_KEY}_${user.id}`);
      if (savedLikes) {
        try {
          setUserLikes(JSON.parse(savedLikes));
        } catch (error) {
          console.error('Failed to parse saved likes:', error);
          setUserLikes({});
        }
      }
    }
  }, []);
  
  // Format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };
  
  // Filter posts based on search and field
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = 
      searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesField = selectedField === '' || post.field === selectedField;
    
    return matchesSearch && matchesField;
  });

  // Handle new post submission
  const handleNewPostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.title || !newPost.content || !newPost.field) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newPostObj = {
      id: `${Date.now()}`, // Use timestamp for unique ID
      userId: currentUser?.id || 'anonymous',
      userName: newPost.isAnonymous ? 'Anonymous User' : (currentUser?.name || 'User'),
      userImage: newPost.isAnonymous ? null : (currentUser?.image || null),
      title: newPost.title,
      content: newPost.content,
      field: newPost.field as CounsellingField,
      likes: 0,
      commentCount: 0,
      createdAt: new Date(),
      isAnonymous: newPost.isAnonymous
    };
    
    const updatedPosts = [newPostObj, ...posts];
    setPosts(updatedPosts);
    
    // Save to localStorage
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(updatedPosts));
    
    setShowNewPostModal(false);
    setNewPost({
      title: '',
      content: '',
      field: '',
      isAnonymous: false
    });
  };
  
  // Handle like post
  const handleLikePost = (postId: string) => {
    if (!isLoggedIn) {
      alert('Please login to like posts');
      return;
    }
    
    const userId = currentUser?.id;
    if (!userId) return;
    
    const likeKey = `post_${postId}`;
    const hasLiked = userLikes[likeKey];
    
    // Update user likes
    const updatedLikes = { ...userLikes };
    
    if (hasLiked) {
      // Unlike
      delete updatedLikes[likeKey];
      
      // Update post likes count
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: Math.max(0, post.likes - 1) };
        }
        return post;
      });
      
      setPosts(updatedPosts);
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(updatedPosts));
    } else {
      // Like
      updatedLikes[likeKey] = true;
      
      // Update post likes count
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      });
      
      setPosts(updatedPosts);
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(updatedPosts));
    }
    
    setUserLikes(updatedLikes);
    localStorage.setItem(`${LIKES_STORAGE_KEY}_${userId}`, JSON.stringify(updatedLikes));
  };
  
  // Handle show comments
  const handleShowComments = (postId: string) => {
    if (activePost === postId) {
      setActivePost(null);
    } else {
      setActivePost(postId);
    }
  };
  
  // Handle add comment
  const handleAddComment = (postId: string) => {
    if (!isLoggedIn) {
      alert('Please login to add comments');
      return;
    }
    
    setShowCommentForm(postId);
  };
  
  // Handle submit comment
  const handleSubmitComment = (postId: string) => {
    if (!newComment.trim()) {
      alert('Please enter a comment');
      return;
    }
    
    const userId = currentUser?.id;
    if (!userId) return;
    
    const newCommentObj: Comment = {
      id: `comment_${Date.now()}`,
      postId,
      userId,
      userName: currentUser?.name || 'User',
      userImage: currentUser?.image || null,
      content: newComment,
      createdAt: new Date(),
      likes: 0
    };
    
    // Update comments
    const updatedComments = [...comments, newCommentObj];
    setComments(updatedComments);
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(updatedComments));
    
    // Update post comment count
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, commentCount: post.commentCount + 1 };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(updatedPosts));
    
    // Reset form
    setNewComment('');
    setShowCommentForm(null);
  };
  
  // Get comments for a post
  const getPostComments = (postId: string) => {
    return comments.filter(comment => comment.postId === postId);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main content area */}
          <div className="md:flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Search posts..."
                    leftIcon={<FaSearch className="text-gray-400" />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth
                  />
                </div>
                <div className="flex space-x-2">
                  <select
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                  >
                    <option value="">All Topics</option>
                    {Object.values(CounsellingField).map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                  {isLoggedIn ? (
                    <Button leftIcon={<FaPlus />} onClick={() => setShowNewPostModal(true)}>
                      New Post
                    </Button>
                  ) : (
                    <Link href="/auth/login">
                      <Button leftIcon={<FaPlus />}>
                        Login to Post
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        {post.isAnonymous ? (
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <FaUserCircle className="text-gray-500 h-6 w-6" />
                          </div>
                        ) : (
                          <img
                            src={post.userImage}
                            alt={post.userName}
                            className="flex-shrink-0 h-10 w-10 rounded-full"
                          />
                        )}
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                <Link href={`/community/post/${post.id}`} className="hover:text-blue-600">
                                  {post.title}
                                </Link>
                              </h3>
                              <div className="mt-1 flex items-center">
                                <span className="text-sm text-gray-500">
                                  {post.userName} • {formatRelativeTime(post.createdAt)}
                                </span>
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {post.field}
                                </span>
                              </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-500">
                              <FaEllipsisH />
                            </button>
                          </div>
                          <div className="mt-3 text-gray-700">
                            <p>{post.content}</p>
                          </div>
                          <div className="mt-4 flex items-center space-x-4">
                            <button
                              onClick={() => handleLikePost(post.id)}
                              className={`flex items-center ${userLikes[`post_${post.id}`] ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                            >
                              <FaThumbsUp className="mr-1" />
                              <span>{post.likes}</span>
                            </button>
                            <button
                              onClick={() => handleShowComments(post.id)}
                              className="flex items-center text-gray-500 hover:text-blue-600"
                            >
                              <FaComment className="mr-1" />
                              <span>{post.commentCount}</span>
                            </button>
                            <button className="flex items-center text-gray-500 hover:text-blue-600">
                              <FaShare className="mr-1.5 h-4 w-4" />
                              <span>Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <p className="text-gray-500 mb-4">No posts found matching your criteria</p>
                  <Button onClick={() => { setSearchTerm(''); setSelectedField(''); }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-80 space-y-6">
            {/* Create Post Card */}
            {isLoggedIn && (
              <Card>
                <CardHeader>
                  <CardTitle>Create a Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    Share your thoughts, questions, or experiences with the community
                  </p>
                  <Button 
                    leftIcon={<FaPlus />} 
                    fullWidth
                    onClick={() => setShowNewPostModal(true)}
                  >
                    Create New Post
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingTopics.map((topic, index) => (
                    <button
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                      onClick={() => setSearchTerm(topic)}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Be respectful and supportive of others
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Maintain confidentiality and privacy
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    No promotional or spam content
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Report inappropriate content
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Create New Post</h2>
              <button 
                onClick={() => setShowNewPostModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleNewPostSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="post-title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="post-title"
                    type="text"
                    placeholder="Enter a descriptive title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    fullWidth
                    required
                  />
                </div>
                <div>
                  <label htmlFor="post-content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="post-content"
                    rows={5}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Share your thoughts, questions, or experiences..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    required
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="post-field" className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="post-field"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newPost.field}
                    onChange={(e) => setNewPost({...newPost, field: e.target.value})}
                    required
                  >
                    <option value="">Select a category</option>
                    {Object.values(CounsellingField).map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    id="post-anonymous"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={newPost.isAnonymous}
                    onChange={(e) => setNewPost({...newPost, isAnonymous: e.target.checked})}
                  />
                  <label htmlFor="post-anonymous" className="ml-2 block text-sm text-gray-700">
                    Post anonymously
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => setShowNewPostModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Create Post
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Comment Form */}
      {activePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Comments ({getPostComments(activePost).length})</h2>
              <button 
                onClick={() => handleShowComments(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              {getPostComments(activePost).map(comment => (
                <div key={comment.id} className="mb-3 pb-3 border-b border-gray-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {comment.userImage ? (
                        <img
                          src={comment.userImage}
                          alt={comment.userName}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <FaUserCircle className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="text-sm font-medium text-gray-900">{comment.userName}</div>
                      <div className="text-sm text-gray-700">{comment.content}</div>
                      <div className="mt-1 text-xs text-gray-500">
                        {formatRelativeTime(comment.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoggedIn ? (
                showCommentForm === activePost ? (
                  <div className="mt-3">
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      placeholder="Write your comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <div className="mt-2 flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowCommentForm(null)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleSubmitComment(activePost)}
                      >
                        Post Comment
                      </Button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddComment(activePost)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Add a comment...
                  </button>
                )
              ) : (
                <div className="mt-2 text-sm text-gray-500">
                  <Link href="/auth/login" className="text-blue-600 hover:text-blue-800">
                    Login
                  </Link>{' '}
                  to add a comment
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 