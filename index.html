import React, { useState, useEffect, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, addDoc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';

// Global variables provided by the Canvas environment
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-doggie-date-app';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Dummy data for demonstration - used as fallback if Firestore is empty
const dummyDogs = [
  {
    id: 'dog1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 3,
    size: 'Large',
    energy: 'High',
    temperament: 'Friendly, playful',
    photos: [
      'https://placehold.co/400x300/AEC9FF/000?text=Buddy+1',
      'https://placehold.co/400x300/B2D8B2/000?text=Buddy+2',
    ],
    videos: [], // Placeholder for video URLs
    healthCheckup: {
      date: '2025-01-15',
      status: 'Healthy, vaccinations up-to-date',
      details: 'Annual checkup, clear bill of health. Vaccinations: Rabies, DHPP. Dewormed. Next checkup due Jan 2026.',
    },
    owner: 'Alice',
  },
  {
    id: 'dog2',
    name: 'Bella',
    breed: 'Poodle',
    age: 2,
    size: 'Medium',
    energy: 'Medium',
    temperament: 'Calm, smart',
    photos: [
      'https://placehold.co/400x300/FFDDC1/000?text=Bella+1',
      'https://placehold.co/400x300/FFEEDD/000?text=Bella+2',
    ],
    videos: [],
    healthCheckup: {
      date: '2024-11-20',
      status: 'Healthy, all clear',
      details: 'Regular checkup, no concerns. Vaccinations: Rabies, Bordetella. Microchipped. Next checkup due Nov 2025.',
    },
    owner: 'Bob',
  },
  {
    id: 'dog3',
    name: 'Max',
    breed: 'German Shepherd',
    age: 5,
    size: 'Large',
    energy: 'High',
    temperament: 'Protective, loyal',
    photos: [
      'https://placehold.co/400x300/C1FFDD/000?text=Max+1',
      'https://placehold.co/400x300/DDEEFF/000?text=Max+2',
    ],
    videos: [],
    healthCheckup: {
      date: '2025-03-01',
      status: 'Healthy, good condition',
      details: 'Standard health check. Vaccinations: Rabies, DHPP, Leptospirosis. Good weight and muscle tone. Next checkup due Mar 2026.',
    },
    owner: 'Charlie',
  },
  {
    id: 'dog4',
    name: 'Daisy',
    breed: 'Beagle',
    age: 1,
    size: 'Small',
    energy: 'Medium',
    temperament: 'Curious, energetic',
    photos: [
      'https://placehold.co/400x300/FFC1DD/000?text=Daisy+1',
      'https://placehold.co/400x300/FFEECC/000?text=Daisy+2',
    ],
    videos: [],
    healthCheckup: {
      date: '2025-02-10',
      status: 'Puppy, healthy growth',
      details: 'First annual checkup for puppy. All puppy shots completed. Good development. Next checkup due Feb 2026.',
    },
    owner: 'Diana',
  },
];

const dummyBusinesses = [
  {
    id: 'biz1',
    name: 'Pawsitively Groomed',
    type: 'Grooming Salon',
    address: '123 Pet St, Doggie Town',
    phone: '555-1234',
    description: 'Full-service grooming for all breeds. Includes baths, cuts, and nail trims.',
    ad: true, // Example of an advertised business
  },
  {
    id: 'biz2',
    name: 'Healthy Bites Pet Food',
    type: 'Pet Supply Store',
    address: '456 Bone Ave, Doggie Town',
    phone: '555-5678',
    description: 'Organic and natural pet foods, toys, and accessories.',
    ad: false,
  },
  {
    id: 'biz3',
    name: 'Bark Park Cafe',
    type: 'Pet-Friendly Cafe',
    address: '789 Leash Ln, Doggie Town',
    phone: '555-9012',
    description: 'Enjoy coffee and treats with your furry friend on our outdoor patio.',
    ad: true,
  },
];

const dummyVetsSupplies = [
  {
    id: 'vs1',
    name: 'Community Animal Hospital',
    type: 'Veterinary Clinic',
    address: '101 Healing Rd, Doggie Town',
    phone: '555-0001',
    hours: 'Mon-Fri: 9AM-5PM',
    description: 'Comprehensive veterinary care, emergency services available.',
  },
  {
    id: 'vs2',
    name: 'Petco - Doggie Town',
    type: 'Pet Supply Store',
    address: '202 Furry Blvd, Doggie Town',
    phone: '555-0002',
    hours: 'Mon-Sun: 9AM-9PM',
    description: 'Wide selection of pet food, toys, and grooming supplies.',
  },
  {
    id: 'vs3',
    name: 'Happy Tails Vet',
    type: 'Veterinary Clinic',
    address: '303 Wag Way, Doggie Town',
    phone: '555-0003',
    hours: 'Mon-Sat: 8AM-6PM',
    description: 'Preventative care, dental services, and surgery.',
  },
  {
    id: 'vs4',
    name: 'Doggie Depot',
    type: 'Pet Supply Store',
    address: '404 Chew St, Doggie Town',
    phone: '555-0004',
    hours: 'Mon-Sat: 10AM-8PM',
    description: 'Local pet store with unique gifts and specialty foods.',
  },
];

const App = () => {
  const [view, setView] = useState('home'); // 'home', 'profile', 'businesses', 'vets', 'chat'
  const [dogs, setDogs] = useState([]); // All public dog profiles
  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [vetsSupplies, setVetsSupplies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVetsSupplies, setFilteredVetsSupplies] = useState([]);

  // State for the current user's dog profile
  const [myDogProfile, setMyDogProfile] = useState({
    id: '', // Will be userId or a unique ID from Firestore
    name: '',
    breed: '',
    age: '',
    size: '',
    energy: '',
    temperament: '',
    photos: ['https://placehold.co/400x300/DDDDDD/666666?text=Upload+Photo'],
    videos: [],
    healthCheckup: {
      date: '',
      status: '',
      details: '',
    },
  });
  const [isEditingMyDog, setIsEditingMyDog] = useState(false);
  const [myLikedDogs, setMyLikedDogs] = useState([]); // Dogs the current user has "liked"

  // Firebase states
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [authReady, setAuthReady] = useState(false); // Indicates if Firebase auth is ready

  // Initialize Firebase and set up auth listener
  useEffect(() => {
    try {
      const firebaseApp = initializeApp(firebaseConfig);
      const authInstance = getAuth(firebaseApp);
      const firestoreInstance = getFirestore(firebaseApp);

      setAuth(authInstance);
      setDb(firestoreInstance);

      // Listen for auth state changes
      const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
        if (user) {
          setUserId(user.uid);
          console.log("Firebase: User signed in:", user.uid);
        } else {
          // If no user, sign in anonymously or with custom token
          if (initialAuthToken) {
            try {
              await signInWithCustomToken(authInstance, initialAuthToken);
              console.log("Firebase: Signed in with custom token.");
            } catch (error) {
              console.error("Firebase: Error signing in with custom token:", error);
              await signInAnonymously(authInstance);
              console.log("Firebase: Signed in anonymously after custom token failure.");
            }
          } else {
            await signInAnonymously(authInstance);
            console.log("Firebase: Signed in anonymously.");
          }
        }
        setAuthReady(true); // Auth is ready after initial check/sign-in
      });

      return () => unsubscribe(); // Cleanup auth listener
    } catch (error) {
      console.error("Firebase: Error initializing Firebase:", error);
    }
  }, []);

  // Fetch data from Firestore once auth is ready and userId is available
  useEffect(() => {
    if (!authReady || !db || !userId) {
      console.log("Firebase: Waiting for auth ready, db, or userId to fetch data.");
      return; // Wait until auth is ready and userId is available
    }

    console.log("Firebase: Fetching data for userId:", userId);

    // --- Public Data Collections ---
    // Dogs
    const dogsColRef = collection(db, `artifacts/${appId}/public/data/dogs`);
    const dogsUnsubscribe = onSnapshot(dogsColRef, (snapshot) => {
      const fetchedDogs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Filter out the current user's dog from the public list for swiping
      const filteredForSwipe = fetchedDogs.filter(dog => dog.id !== userId);
      setDogs(filteredForSwipe.length > 0 ? filteredForSwipe : dummyDogs.filter(dog => dog.owner !== 'Alice')); // Dummy fallback
      console.log("Firebase: Fetched public dogs data.");
    }, (error) => {
      console.error("Firebase: Error fetching public dogs data:", error);
      setDogs(dummyDogs.filter(dog => dog.owner !== 'Alice')); // Fallback to dummy data on error
    });

    // Businesses
    const businessesColRef = collection(db, `artifacts/${appId}/public/data/businesses`);
    const businessesUnsubscribe = onSnapshot(businessesColRef, (snapshot) => {
      const fetchedBusinesses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBusinesses(fetchedBusinesses.length > 0 ? fetchedBusinesses : dummyBusinesses);
      console.log("Firebase: Fetched public businesses data.");
    }, (error) => {
      console.error("Firebase: Error fetching public businesses data:", error);
      setBusinesses(dummyBusinesses);
    });

    // Vets and Supplies
    const vetsSuppliesColRef = collection(db, `artifacts/${appId}/public/data/vetsSupplies`);
    const vetsSuppliesUnsubscribe = onSnapshot(vetsSuppliesColRef, (snapshot) => {
      const fetchedVetsSupplies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVetsSupplies(fetchedVetsSupplies.length > 0 ? fetchedVetsSupplies : dummyVetsSupplies);
      setFilteredVetsSupplies(fetchedVetsSupplies.length > 0 ? fetchedVetsSupplies : dummyVetsSupplies);
      console.log("Firebase: Fetched public vets/supplies data.");
    }, (error) => {
      console.error("Firebase: Error fetching public vets/supplies data:", error);
      setVetsSupplies(dummyVetsSupplies);
      setFilteredVetsSupplies(dummyVetsSupplies);
    });

    // --- Private User Data Collections ---
    // User's own dog profile
    const myDogDocRef = doc(db, `artifacts/${appId}/users/${userId}/myDogs`, 'myDog');
    const myDogUnsubscribe = onSnapshot(myDogDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setMyDogProfile({ id: docSnapshot.id, ...docSnapshot.data() });
        console.log("Firebase: Fetched user's dog profile.");
      } else {
        // If no profile exists, set to a default empty state
        setMyDogProfile({
          id: userId, // Use userId as the default ID for the user's dog
          name: '', breed: '', age: '', size: '', energy: '', temperament: '',
          photos: ['https://placehold.co/400x300/DDDDDD/666666?text=Upload+Photo'],
          videos: [],
          healthCheckup: { date: '', status: '', details: '' },
        });
        console.log("Firebase: User's dog profile not found, set default.");
      }
    }, (error) => {
      console.error("Firebase: Error fetching user's dog profile:", error);
    });

    // User's liked dogs (for match tracking)
    const likedDogsColRef = collection(db, `artifacts/${appId}/users/${userId}/likedDogs`);
    const likedDogsUnsubscribe = onSnapshot(likedDogsColRef, (snapshot) => {
      const fetchedLikedDogs = snapshot.docs.map(doc => doc.id); // Store only the IDs of liked dogs
      setMyLikedDogs(fetchedLikedDogs);
      console.log("Firebase: Fetched user's liked dogs:", fetchedLikedDogs);
    }, (error) => {
      console.error("Firebase: Error fetching user's liked dogs:", error);
    });


    // Optional: Add dummy data to Firestore if collections are empty (for testing)
    const addInitialData = async () => {
      const dogsSnapshot = await getDocs(dogsColRef);
      if (dogsSnapshot.empty) {
        console.log("Firebase: Adding dummy public dogs to Firestore.");
        for (const dog of dummyDogs) {
          await addDoc(dogsColRef, dog); // Use addDoc for auto-generated IDs in public collection
        }
      }

      const businessesSnapshot = await getDocs(businessesColRef);
      if (businessesSnapshot.empty) {
        console.log("Firebase: Adding dummy businesses to Firestore.");
        for (const biz of dummyBusinesses) {
          await addDoc(businessesColRef, biz);
        }
      }

      const vetsSuppliesSnapshot = await getDocs(vetsSuppliesColRef);
      if (vetsSuppliesSnapshot.empty) {
        console.log("Firebase: Adding dummy vets/supplies to Firestore.");
        for (const vs of dummyVetsSupplies) {
          await addDoc(vetsSuppliesColRef, vs);
        }
      }
    };
    addInitialData();

    return () => {
      dogsUnsubscribe();
      businessesUnsubscribe();
      vetsSuppliesUnsubscribe();
      myDogUnsubscribe();
      likedDogsUnsubscribe();
    };
  }, [authReady, db, userId]); // Dependencies: authReady, db, userId

  // Handle search for vets and supplies
  useEffect(() => {
    const filtered = vetsSupplies.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVetsSupplies(filtered);
  }, [searchQuery, vetsSupplies]);


  const currentDog = dogs[currentDogIndex];

  // Function to handle swiping left (Nope)
  const swipeLeft = () => {
    setCurrentDogIndex((prevIndex) => (prevIndex + 1) % dogs.length);
  };

  // Function to handle swiping right (Like)
  const swipeRight = async () => {
    if (!db || !userId || !currentDog) {
      console.log("Cannot like dog: DB, userId, or currentDog missing.");
      return;
    }

    // Prevent liking your own dog
    if (currentDog.id === userId) {
      console.log("Cannot like your own dog!");
      setCurrentDogIndex((prevIndex) => (prevIndex + 1) % dogs.length);
      return;
    }

    // Prevent liking the same dog multiple times
    if (myLikedDogs.includes(currentDog.id)) {
        console.log("Already liked this dog!");
        setCurrentDogIndex((prevIndex) => (prevIndex + 1) % dogs.length);
        return;
    }

    try {
      // Store the liked dog's ID in the user's private likedDogs collection
      const likedDogsColRef = collection(db, `artifacts/${appId}/users/${userId}/likedDogs`);
      // Use setDoc with the dog's ID as the document ID for easy lookup
      await setDoc(doc(likedDogsColRef, currentDog.id), {
        likedAt: new Date().toISOString(),
        dogId: currentDog.id,
        dogName: currentDog.name,
      });
      console.log(`Liked ${currentDog.name}! (ID: ${currentDog.id})`);

      // In a real app, you would also check if this is a mutual like
      // If the other dog's owner also liked this user's dog, it's a match!
      // This would involve querying the other owner's likedDogs collection.

      setCurrentDogIndex((prevIndex) => (prevIndex + 1) % dogs.length);
    } catch (error) {
      console.error("Error liking dog:", error);
    }
  };

  // Handler for updating user's dog profile form fields
  const handleMyDogProfileChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('healthCheckup.')) {
      setMyDogProfile(prev => ({
        ...prev,
        healthCheckup: {
          ...prev.healthCheckup,
          [name.split('.')[1]]: value
        }
      }));
    } else {
      setMyDogProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handler for saving user's dog profile to Firestore
  const saveMyDogProfile = async () => {
    if (!db || !userId) {
      console.log("Cannot save profile: DB or userId missing.");
      return;
    }
    if (!myDogProfile.name || !myDogProfile.breed) {
      alert("Please fill in your dog's name and breed."); // Use a custom modal instead of alert in production
      return;
    }

    try {
      const myDogDocRef = doc(db, `artifacts/${appId}/users/${userId}/myDogs`, 'myDog');
      // Set the document with merge: true to avoid overwriting other fields if they exist
      await setDoc(myDogDocRef, { ...myDogProfile, id: userId }, { merge: true });

      // Also update the public dogs collection if the user's dog is meant to be discoverable
      // In a real app, this might be triggered by a "publish profile" action.
      const publicDogDocRef = doc(db, `artifacts/${appId}/public/data/dogs`, userId);
      await setDoc(publicDogDocRef, {
          ...myDogProfile,
          id: userId, // Ensure the ID matches the userId for easy lookup
          owner: userId // Indicate the owner (userId) of this public dog profile
      }, { merge: true });

      setIsEditingMyDog(false);
      console.log("User's dog profile saved successfully!");
    } catch (error) {
      console.error("Error saving user's dog profile:", error);
      alert("Failed to save profile. Please try again."); // Use custom modal
    }
  };


  const DogProfileCard = ({ dog }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm mx-auto my-4 transform transition-all duration-300 hover:scale-105">
      <div className="relative h-64 w-full bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src={dog.photos[0]}
          alt={`${dog.name}`}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/CCCCCC/000?text=Dog+Image+Error"; }}
        />
        {/* Placeholder for video icon if video exists */}
        {dog.videos && dog.videos.length > 0 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full text-xs">
            <svg className="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg> Video
          </div>
        )}
      </div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">{dog.name}</h2>
      <p className="text-gray-600 text-center text-lg mb-4">{dog.breed}, {dog.age} years old</p>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 8a1 1 0 00-1 1v1a1 1 0 002 0V9a1 1 0 00-1-1zM11 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1z" /><path fillRule="evenodd" d="M12 2H8a2 2 0 00-2 2v2H5a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 002 2h4a2 2 0 002-2v-2h2a2 2 0 002-2V8a2 2 0 00-2-2h-1V4a2 2 0 00-2-2zm-5 6a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H8a1 1 0 01-1-1V8z" clipRule="evenodd"></path></svg>
          Size: {dog.size}
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17.555 13.555A8.001 8.001 0 0013 6a8.001 8.001 0 00-4.555 7.555L2 20h16l-2.445-6.445z" /></svg>
          Energy: {dog.energy}
        </div>
        <div className="col-span-2 flex items-center">
          <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
          Temperament: {dog.temperament}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setShowHealthModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
        >
          View Health Checkup
        </button>
      </div>
    </div>
  );

  const HealthCheckupModal = ({ dog, onClose }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Health Checkup for {dog.name}</h3>
        {dog.healthCheckup && dog.healthCheckup.date ? (
          <>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Last Checkup:</span> {dog.healthCheckup.date}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Status:</span> {dog.healthCheckup.status}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Details:</span> {dog.healthCheckup.details}
            </p>
          </>
        ) : (
          <p className="text-gray-700 mb-4 text-center">No health checkup details available.</p>
        )}
        <p className="text-sm text-gray-500 text-center italic">
          Disclaimer: Health information is provided by owners and should be verified independently.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-inter text-gray-900 flex flex-col items-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Header and Navigation */}
      <header className="w-full bg-white shadow-md py-4 px-6 flex flex-col sm:flex-row justify-between items-center rounded-b-xl z-10">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2 sm:mb-0">Doggie Date</h1>
        <nav className="flex space-x-4">
          <button
            onClick={() => setView('home')}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
              view === 'home' ? 'bg-indigo-500 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setView('businesses')}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
              view === 'businesses' ? 'bg-indigo-500 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Businesses
          </button>
          <button
            onClick={() => setView('vets')}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
              view === 'vets' ? 'bg-indigo-500 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Vets & Supplies
          </button>
          <button
            onClick={() => setView('profile')}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
              view === 'profile' ? 'bg-indigo-500 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            My Profile
          </button>
        </nav>
      </header>

      {/* User ID Display */}
      {userId && (
        <div className="bg-yellow-100 text-yellow-800 text-sm p-2 rounded-md mt-4 shadow-sm">
          Your User ID: <span className="font-mono break-all">{userId}</span>
        </div>
      )}

      <main className="flex-grow w-full max-w-4xl p-4">
        {view === 'home' && (
          <section className="text-center py-8">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Find Doggie Playdates!</h2>
            {dogs.length > 0 && currentDog ? (
              <>
                <DogProfileCard dog={currentDog} />
                <div className="flex justify-center space-x-6 mt-8">
                  <button
                    onClick={swipeLeft}
                    className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white text-xl p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-300"
                    aria-label="Nope"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                  </button>
                  <button
                    onClick={swipeRight}
                    className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white text-xl p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
                    aria-label="Like"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"></path></svg>
                  </button>
                </div>
                {showHealthModal && currentDog && (
                  <HealthCheckupModal dog={currentDog} onClose={() => setShowHealthModal(false)} />
                )}
              </>
            ) : (
              <p className="text-gray-600 text-lg">Loading dog profiles or no dogs available for swiping...</p>
            )}
          </section>
        )}

        {view === 'businesses' && (
          <section className="py-8">
            <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">Local Dog Businesses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <div
                  key={business.id}
                  className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 transform hover:scale-105 ${
                    business.ad ? 'border-4 border-yellow-400 ring-4 ring-yellow-200' : 'border border-gray-200'
                  }`}
                >
                  <h3 className="text-xl font-bold text-indigo-700 mb-2">{business.name}</h3>
                  <p className="text-gray-600 mb-1">Type: {business.type}</p>
                  <p className="text-gray-600 mb-1">Address: {business.address}</p>
                  <p className="text-gray-600 mb-4">Phone: {business.phone}</p>
                  <p className="text-gray-700 text-sm">{business.description}</p>
                  {business.ad && (
                    <div className="mt-4 text-center text-yellow-700 font-semibold text-sm bg-yellow-100 p-2 rounded-full">
                      ✨ Advertised Spot ✨
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {view === 'vets' && (
          <section className="py-8">
            <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">Local Vets & Pet Supplies</h2>
            <div className="mb-6 flex justify-center">
              <input
                type="text"
                placeholder="Search vets or supplies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVetsSupplies.length > 0 ? (
                filteredVetsSupplies.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105">
                    <h3 className="text-xl font-bold text-indigo-700 mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-1">Type: {item.type}</p>
                    <p className="text-600 mb-1">Address: {item.address}</p>
                    <p className="text-gray-600 mb-1">Phone: {item.phone}</p>
                    <p className="text-gray-700 text-sm mt-2">{item.description}</p>
                    {item.hours && <p className="text-gray-700 text-sm mt-1">Hours: {item.hours}</p>}
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center col-span-full">No results found for your search.</p>
              )}
            </div>
          </section>
        )}

        {view === 'profile' && (
          <section className="text-center py-8">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Your Doggie Profile</h2>
            {!userId ? (
              <p className="text-gray-600 text-lg">Loading user profile...</p>
            ) : (
              <div className="mt-8 p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto">
                {isEditingMyDog ? (
                  <>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Edit Your Dog's Profile</h3>
                    <div className="space-y-4 text-left">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Dog's Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={myDogProfile.name}
                          onChange={handleMyDogProfileChange}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="e.g., Sparky"
                        />
                      </div>
                      <div>
                        <label htmlFor="breed" className="block text-sm font-medium text-gray-700">Breed</label>
                        <input
                          type="text"
                          id="breed"
                          name="breed"
                          value={myDogProfile.breed}
                          onChange={handleMyDogProfileChange}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="e.g., Labrador"
                        />
                      </div>
                      <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age (Years)</label>
                        <input
                          type="number"
                          id="age"
                          name="age"
                          value={myDogProfile.age}
                          onChange={handleMyDogProfileChange}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="e.g., 2"
                        />
                      </div>
                      <div>
                        <label htmlFor="size" className="block text-sm font-medium text-gray-700">Size</label>
                        <select
                          id="size"
                          name="size"
                          value={myDogProfile.size}
                          onChange={handleMyDogProfileChange}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="">Select Size</option>
                          <option value="Small">Small</option>
                          <option value="Medium">Medium</option>
                          <option value="Large">Large</option>
                          <option value="Giant">Giant</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="energy" className="block text-sm font-medium text-gray-700">Energy Level</label>
                        <select
                          id="energy"
                          name="energy"
                          value={myDogProfile.energy}
                          onChange={handleMyDogProfileChange}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="">Select Energy</option>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="temperament" className="block text-sm font-medium text-gray-700">Temperament</label>
                        <textarea
                          id="temperament"
                          name="temperament"
                          value={myDogProfile.temperament}
                          onChange={handleMyDogProfileChange}
                          rows="3"
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="e.g., Playful, loves kids, a bit shy with new dogs."
                        ></textarea>
                      </div>
                      {/* Placeholder for Photo/Video Upload */}
                      <div className="text-center mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Dog Photos/Videos</label>
                        <div className="flex justify-center items-center h-32 w-full bg-gray-100 rounded-md border-2 border-dashed border-gray-300 text-gray-500">
                          <span className="text-center">Click to upload (Coming Soon!)</span>
                        </div>
                        {myDogProfile.photos[0] && myDogProfile.photos[0] !== 'https://placehold.co/400x300/DDDDDD/666666?text=Upload+Photo' && (
                            <img src={myDogProfile.photos[0]} alt="Dog Profile" className="mt-2 mx-auto max-w-full h-auto rounded-md" />
                        )}
                      </div>

                      <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Health Checkup</h4>
                      <div>
                        <label htmlFor="healthCheckup.date" className="block text-sm font-medium text-gray-700">Last Checkup Date</label>
                        <input
                          type="date"
                          id="healthCheckup.date"
                          name="healthCheckup.date"
                          value={myDogProfile.healthCheckup.date}
                          onChange={handleMyDogProfileChange}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="healthCheckup.status" className="block text-sm font-medium text-gray-700">Health Status</label>
                        <input
                          type="text"
                          id="healthCheckup.status"
                          name="healthCheckup.status"
                          value={myDogProfile.healthCheckup.status}
                          onChange={handleMyDogProfileChange}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="e.g., Healthy, Vaccinations up-to-date"
                        />
                      </div>
                      <div>
                        <label htmlFor="healthCheckup.details" className="block text-sm font-medium text-gray-700">Health Details</label>
                        <textarea
                          id="healthCheckup.details"
                          name="healthCheckup.details"
                          value={myDogProfile.healthCheckup.details}
                          onChange={handleMyDogProfileChange}
                          rows="4"
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="e.g., Annual checkup, clear bill of health. All vaccinations current (Rabies, DHPP). No known allergies."
                        ></textarea>
                      </div>

                    </div>
                    <div className="flex justify-between mt-6 space-x-4">
                      <button
                        onClick={saveMyDogProfile}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Save Profile
                      </button>
                      <button
                        onClick={() => setIsEditingMyDog(false)}
                        className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Dog's Current Profile</h3>
                    {myDogProfile.name ? (
                      <div className="space-y-3 text-left">
                         <img
                            src={myDogProfile.photos[0]}
                            alt={`${myDogProfile.name}`}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/CCCCCC/000?text=No+Photo"; }}
                        />
                        <p><span className="font-semibold">Name:</span> {myDogProfile.name}</p>
                        <p><span className="font-semibold">Breed:</span> {myDogProfile.breed}</p>
                        <p><span className="font-semibold">Age:</span> {myDogProfile.age} years</p>
                        <p><span className="font-semibold">Size:</span> {myDogProfile.size}</p>
                        <p><span className="font-semibold">Energy:</span> {myDogProfile.energy}</p>
                        <p><span className="font-semibold">Temperament:</span> {myDogProfile.temperament}</p>
                        <h4 className="font-semibold mt-4">Health Checkup:</h4>
                        {myDogProfile.healthCheckup && myDogProfile.healthCheckup.date ? (
                            <>
                                <p><span className="font-semibold text-sm">Last Checkup:</span> {myDogProfile.healthCheckup.date}</p>
                                <p><span className="font-semibold text-sm">Status:</span> {myDogProfile.healthCheckup.status}</p>
                                <p><span className="font-semibold text-sm">Details:</span> {myDogProfile.healthCheckup.details}</p>
                            </>
                        ) : (
                            <p className="text-sm italic text-gray-500">No health details recorded.</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-lg text-gray-700">
                        You haven't created your dog's profile yet!
                      </p>
                    )}
                    <button
                      onClick={() => setIsEditingMyDog(true)}
                      className="mt-6 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      {myDogProfile.name ? "Edit My Dog's Profile" : "Set Up My Dog's Profile"}
                    </button>
                  </>
                )}
              </div>
            )}
            <div className="mt-8 p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Dogs You've Liked</h3>
                {myLikedDogs.length > 0 ? (
                    <ul className="list-disc list-inside text-left text-gray-700 space-y-2">
                        {myLikedDogs.map(likedDogId => {
                            const dog = dogs.find(d => d.id === likedDogId);
                            return dog ? <li key={likedDogId}>{dog.name} ({dog.breed})</li> : <li key={likedDogId}>Unknown Dog (ID: {likedDogId})</li>;
                        })}
                    </ul>
                ) : (
                    <p className="text-gray-600">You haven't liked any dogs yet. Start swiping on the Home screen!</p>
                )}
                <p className="text-sm text-gray-500 mt-4 italic">
                    In a full app, these would be your potential matches.
                </p>
            </div>
          </section>
        )}
      </main>

      <footer className="w-full bg-white shadow-inner py-4 px-6 mt-8 text-center text-gray-600 text-sm rounded-t-xl">
        &copy; {new Date().getFullYear()} Doggie Date App. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
