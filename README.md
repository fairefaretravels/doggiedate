# Doggie Date App

## Overview
Doggie Date is a modern web application designed for dog owners to connect with other local dog lovers for playdates. Inspired by popular dating apps, it provides a fun and intuitive way to discover compatible canine companions and their human counterparts. The app also integrates features for finding local pet businesses, veterinarians, and pet supply stores, making it a comprehensive resource for the dog community.

## Features

### Core Doggie Matching
* **Dog Profiles:** Create detailed profiles for your dog(s) including photos, videos, breed, age, size, energy level, and temperament.
* **Health Checkup Sharing:** Optionally share health checkup summaries and vaccination statuses for peace of mind during playdates.
* **Location-Based Swiping:** Discover other dog profiles in your vicinity.
* **Like/Nope Functionality:** Swipe right on dogs you're interested in, and left on those you're not.
* **"Liked Dogs" Tracking:** Keep track of the dog profiles you've shown interest in.

### Local Resources
* **Advertised Businesses:** Dedicated sections for local pet-related businesses (groomers, trainers, cafes) to advertise their services.
* **Vets & Pet Supplies Search:** A directory and search function for finding local veterinary clinics and pet supply stores.

### Technical Stack
* **Frontend:** React.js with Tailwind CSS for a responsive and modern user interface.
* **Backend/Database:** Google Firebase (Firestore) for real-time data storage and authentication.

## How to Run the App (in a Canvas/Immersive Environment)

This application is designed to run within a Canvas or similar immersive environment that provides global Firebase configuration variables.

1.  **Firebase Setup:** Ensure your Canvas environment provides the following global variables:
    * `__app_id`: A unique ID for your application within the Canvas environment.
    * `__firebase_config`: A JSON string containing your Firebase project's configuration (API key, project ID, etc.).
    * `__initial_auth_token`: An initial custom Firebase authentication token, or `null` if anonymous sign-in is preferred.

2.  **Deployment:** Copy and paste the entire React code into your Canvas/Immersive code editor.

3.  **Firestore Data:**
    * The app includes dummy data that will be used as a fallback if your Firestore collections are empty.
    * For persistent data, ensure your Firebase Firestore is set up. The app expects the following collections:
        * `artifacts/{appId}/public/data/dogs`: For all public dog profiles.
        * `artifacts/{appId}/public/data/businesses`: For public business listings.
        * `artifacts/{appId}/public/data/vetsSupplies`: For public veterinary and pet supply listings.
        * `artifacts/{appId}/users/{userId}/myDogs/myDog`: For the current user's private dog profile.
        * `artifacts/{appId}/users/{userId}/likedDogs`: For tracking dogs the current user has "liked".

4.  **Firebase Security Rules:** To ensure proper read/write access, you'll need to configure your Firestore security rules. Example rules:

    ```firestore
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        // Public data for dogs, businesses, vets/supplies
        match /artifacts/{appId}/public/data/{collectionName}/{documentId} {
          allow read: if request.auth != null;
          allow write: if request.auth != null; // For admin/app to populate, or users to create public profiles
        }

        // Private user data
        match /artifacts/{appId}/users/{userId}/{collectionName}/{documentId} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
      }
    }
    ```

## Future Enhancements (Roadmap)

* **Full User Authentication:** Implement email/password and social login options.
* **Real-time Chat:** Develop a dedicated chat interface for matched users.
* **Match Notification System:** Alert users when they have a new match.
* **Photo/Video Uploads:** Integrate Firebase Storage for actual image and video uploads to dog profiles.
* **Geolocation:** Use real user location for more accurate "nearby" dog and business suggestions.
* **Playdate Scheduling:** Add functionality to propose and confirm playdate times and locations within the app.
* **User Reviews:** Allow users to review and rate businesses and vets.
* **Advanced Filters:** Implement more robust filtering for dog profiles and business searches.
* **Reporting System:** Tools for reporting inappropriate content or behavior.
