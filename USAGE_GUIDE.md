# Concept Master - AI Tutor Usage Guide

## 🚀 Quick Start

### 1. Setup (First Time Only)
```bash
# Install all dependencies
install-dependencies.bat

# Test the setup
test-project.bat
```

### 2. Start the Application
```bash
# Terminal 1: Start Backend
start-backend.bat

# Terminal 2: Start Frontend  
start-frontend.bat
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🎓 AI Tutor Features

### Chat Interface
- **Real-time AI conversations** about any study topic
- **Quick prompts** for common questions
- **Message history** with timestamps
- **Smart responses** tailored to your level

### Interactive Quiz System
- **Auto-generated quizzes** based on your current topic
- **Multiple difficulty levels**: Beginner, Intermediate, Advanced
- **Instant feedback** with detailed explanations
- **Score tracking** and progress monitoring
- **Customizable question count**

### Smart Summaries
- **Comprehensive topic summaries** generated on-demand
- **Level-appropriate content** based on your study mode
- **Key concepts and definitions**
- **Practical applications and examples**
- **Easy-to-read formatting**

### Real-World Examples
- **Industry applications** of theoretical concepts
- **Code examples** when applicable
- **Step-by-step explanations**
- **Practical use cases**
- **Career relevance**

## 🎯 How to Use Each Feature

### 1. Chat with AI Tutor
1. Navigate to **AI Tutor** from the sidebar
2. Select your **study level** (Beginner/Intermediate/Advanced)
3. Choose a **topic** from the sidebar
4. Start chatting or use **quick prompts**
5. Ask follow-up questions for deeper understanding

### 2. Take a Quiz
1. Select your topic and study level
2. Click **"Generate Quiz"** in the sidebar
3. Answer multiple-choice questions
4. Get instant feedback and explanations
5. Track your progress with the score counter

### 3. Get Topic Summaries
1. Choose your topic from the sidebar
2. Click **"Get Summary"** or use the Summary tab
3. Review comprehensive topic overview
4. Use as study notes or quick reference

### 4. Explore Examples
1. Select a topic you want to understand better
2. Click **"Show Examples"** or use the Examples tab
3. Review real-world applications
4. See how concepts apply in practice

## 🌙 Dark Mode
- Toggle dark mode in **Settings** page
- Preference is saved automatically
- Works across all pages and components
- Smooth transitions between themes

## 📚 Available Topics

### Computer Science Fundamentals
- **Introduction** - Basic concepts and overview
- **Data Structures** - Arrays, lists, trees, graphs
- **Algorithms** - Sorting, searching, optimization
- **Complexity Analysis** - Big O notation, performance
- **Advanced Topics** - Design patterns, architecture

### Additional Subjects
- **Programming** - Languages, paradigms, best practices
- **Databases** - SQL, NoSQL, design principles
- **Networks** - Protocols, security, architecture

## 💡 Tips for Best Results

### Getting Better AI Responses
- **Be specific** in your questions
- **Provide context** about your current understanding
- **Ask for examples** when concepts are unclear
- **Request step-by-step explanations** for complex topics

### Using Study Levels Effectively
- **Beginner**: Basic concepts, simple explanations
- **Intermediate**: More detail, practical applications
- **Advanced**: Complex topics, industry-level depth

### Maximizing Learning
- **Start with summaries** to get topic overview
- **Use chat** for specific questions and clarifications
- **Take quizzes** to test your understanding
- **Review examples** to see practical applications

## 🔧 Troubleshooting

### Common Issues

**Backend not starting?**
- Check if Python is installed
- Run `pip install -r requirements.txt` in backend folder
- Verify Gemini API key in backend/.env

**Frontend not loading?**
- Check if Node.js is installed
- Run `npm install` in edu_ai folder
- Clear browser cache and reload

**AI not responding?**
- Check internet connection
- Verify API key is correct
- Check browser console for errors

**Dark mode not working?**
- Clear browser localStorage
- Refresh the page
- Check if JavaScript is enabled

### Getting Help
- Check the browser console for error messages
- Verify both backend and frontend are running
- Ensure all dependencies are installed
- Test with the provided test-project.bat script

## 🎯 Study Workflow Recommendations

### Daily Study Session
1. **Start** with a topic summary
2. **Chat** with AI about unclear concepts
3. **Take a quiz** to test understanding
4. **Review examples** for practical context
5. **Ask follow-up questions** as needed

### Exam Preparation
1. **Generate quizzes** for all topics
2. **Review summaries** for quick revision
3. **Focus on examples** for application questions
4. **Use chat** for last-minute clarifications

### Project Work
1. **Ask for examples** related to your project
2. **Get explanations** of relevant concepts
3. **Request code examples** when needed
4. **Clarify implementation details**

## 🚀 Advanced Features

### API Integration
- All features work through REST API
- Can be extended with additional endpoints
- Supports authentication for multi-user setups

### Customization
- Modify topics in the sidebar
- Adjust AI prompts for different subjects
- Customize difficulty levels and quiz formats

### Data Persistence
- Chat history maintained during session
- Quiz scores tracked automatically
- Theme preferences saved locally

---

**Happy Learning! 🎓**

For technical support or feature requests, check the project documentation or create an issue in the repository.