🍽️ ZOMATO BACKEND

This is the backend server for a Zomato-like food delivery application. It provides RESTful APIs for user management, restaurants, food items, reviews, and more.

====================
✨ FEATURES
====================
✅ User authentication & authorization (JWT-based)  
✅ Restaurant & food item management  
✅ Reviews and ratings system  
✅ MongoDB integration with Mongoose  
✅ Secure password hashing (bcrypt)  
✅ Clean Express.js architecture  
✅ Environment variable setup (.env)  
✅ Vercel-ready deployment  

====================
🛠️ TECH STACK USED
====================
🟩 Node.js  
⚙️ Express.js  
🍃 MongoDB + Mongoose  
🔐 JSON Web Token (JWT)  
🧪 dotenv  
🧂 bcryptjs  
🚀 Vercel (Deployment)

============================
📥 INSTALLATION PROCESS
============================
1️⃣ Ensure Node.js and npm are installed.  
2️⃣ Clone the repository:  
   `git clone https://github.com/SAINIKHILCHARY/Zomato-Backend.git`  

3️⃣ Navigate into the project folder:  
   `cd Zomato-Backend`  

4️⃣ Install all dependencies:  
   `npm install`  

5️⃣ Create a `.env` file and add the following environment variables:
    PORT=5000  
    MONGODB_URI=your_mongodb_connection_string  
    JWT_SECRET=your_jwt_secret

6️⃣ Start the server:  
   `npm start`  

7️⃣ Visit:  
   `http://localhost:5000`

============================
📂 PROJECT STRUCTURE
============================
📁 config/        - DB configuration  
📁 controllers/   - Business logic & handlers  
📁 middleware/    - JWT auth & custom middleware  
📁 models/        - Mongoose schemas  
📁 routes/        - Route definitions  
📄 server.js      - Main server file  
📝 .env           - Environment variables  
📄 vercel.json    - Vercel deployment config  
📄 package.json   - Project metadata & scripts  

============================
🔗 SAMPLE API ENDPOINTS
============================
📨 POST    /api/user/signup            - Register new user  
🔐 POST    /api/user/login             - User login  
🍴 GET     /api/restaurants            - Fetch all restaurants  
🍔 GET     /api/foods                  - Fetch all food items  
🗣️ POST    /api/review/:restaurantId   - Post a review for a restaurant  

============================
🚀 DEPLOYMENT
============================
This project is Vercel-ready. Just connect the GitHub repo on [https://vercel.com](https://vercel.com), add your environment variables in the dashboard, and deploy!

============================
🤝 CONTRIBUTING
============================
Pull requests are welcome!  
1. Fork the repository  
2. Create your branch  
3. Make changes  
4. Open a pull request 🎉

============================
📝 LICENSE
============================
Licensed under the MIT License 📄
