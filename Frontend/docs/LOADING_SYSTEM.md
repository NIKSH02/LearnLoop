# Loading System Documentation

This project now includes a comprehensive loading system that provides smooth transitions between pages and loading states throughout the application.

## Components

### 1. LoaderComponent (`/src/components/LoaderComponent.jsx`)
A reusable loader component with customizable messages and duration.

**Props:**
- `onComplete`: Function called when loading completes
- `customMessage`: Array of strings for the loading text (default: ['YOUR', 'WEB EXPERIENCE', 'IS LOADING RIGHT', 'NOW'])
- `duration`: Loading duration in milliseconds (default: 4000)

### 2. PageWithLoader (`/src/components/PageWithLoader.jsx`)
A wrapper component that shows a loader before rendering the page content.

**Props:**
- `children`: The page content to render after loading
- `customMessage`: Custom loading message array
- `loadingDuration`: Duration in milliseconds (default: 3000)
- `showLoader`: Boolean to control if loader should be shown (default: true)

### 3. GlobalLoader (`/src/components/GlobalLoader.jsx`)
A global loader that can be controlled from anywhere in the app using the LoadingContext.

### 4. LoadingProvider (`/src/context/LoadingContext.jsx`)
Context provider that manages global loading state.

## Hooks

### 1. useLoading (`/src/hooks/useLoading.js`)
Hook to access the loading context.

**Returns:**
- `isLoading`: Boolean indicating if loading is active
- `loadingMessage`: Current loading message
- `showLoader(message)`: Function to show the loader with optional message
- `hideLoader()`: Function to hide the loader

### 2. useNavigateWithLoader (`/src/hooks/useNavigateWithLoader.js`)
Hook that provides navigation with automatic loading states.

**Returns:**
- `navigateWithLoader(path, options)`: Navigate with loader
- `navigate`: Standard React Router navigate function
- `showLoader`: Function to show loader
- `hideLoader`: Function to hide loader

**Options for navigateWithLoader:**
- `message`: Loading message (default: 'LOADING YOUR EXPERIENCE')
- `duration`: Loading duration in milliseconds (default: 2000)
- `skipLoader`: Boolean to skip loading animation (default: false)

## Usage Examples

### 1. Page-Level Loading (Automatic)
```jsx
// In App.jsx - Automatic loading for each route
<Route 
  path="/about"
  element={
    <PageWithLoader 
      customMessage={['LOADING', 'ABOUT US', 'INFORMATION']}
      loadingDuration={2000}
    >
      <AboutPage />
    </PageWithLoader>
  }
/>
```

### 2. Navigation with Loading
```jsx
// In any component
import { useNavigateWithLoader } from '../hooks/useNavigateWithLoader';

const MyComponent = () => {
  const { navigateWithLoader } = useNavigateWithLoader();

  const handleNavigation = () => {
    navigateWithLoader('/dashboard', {
      message: 'LOADING DASHBOARD',
      duration: 2000
    });
  };

  return <button onClick={handleNavigation}>Go to Dashboard</button>;
};
```

### 3. Manual Loading Control
```jsx
// In any component
import { useLoading } from '../hooks/useLoading';

const MyComponent = () => {
  const { showLoader, hideLoader } = useLoading();

  const handleAsyncOperation = async () => {
    showLoader('PROCESSING REQUEST');
    try {
      await someAsyncOperation();
    } finally {
      hideLoader();
    }
  };

  return <button onClick={handleAsyncOperation}>Process</button>;
};
```

### 4. Custom Loader in Component
```jsx
import LoaderComponent from '../components/LoaderComponent';

const MyPage = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <LoaderComponent 
          onComplete={() => setLoading(false)}
          customMessage={['CUSTOM', 'LOADING', 'MESSAGE']}
          duration={3000}
        />
      )}
      {!loading && <div>Page Content</div>}
    </>
  );
};
```

## Customization

### Loading Messages
You can customize loading messages by passing an array of strings:
```jsx
customMessage={['WELCOME TO', 'OUR AMAZING', 'PLATFORM']}
```

### Duration
Control loading duration:
```jsx
loadingDuration={2500} // 2.5 seconds
```

### Skip Loading
Skip loading for instant navigation:
```jsx
navigateWithLoader('/path', { skipLoader: true });
```

## Current Implementation

The loading system is currently integrated into:

1. **App.jsx**: All routes wrapped with PageWithLoader
2. **LandingPage.jsx**: Uses useNavigateWithLoader for signup navigation
3. **LoginPage.jsx**: Uses useNavigateWithLoader for post-login navigation
4. **Global Context**: LoadingProvider wraps the entire app

## Benefits

1. **Consistent UX**: Uniform loading experience across all pages
2. **Smooth Transitions**: No jarring page changes
3. **Customizable**: Different messages and durations per page
4. **Global Control**: Manage loading from anywhere in the app
5. **Flexible**: Use automatic page loaders or manual control
6. **Accessible**: Proper loading states for screen readers

## Future Enhancements

1. **Progress Indicators**: Add progress bars for specific operations
2. **Loading Skeletons**: Page-specific skeleton screens
3. **Error States**: Loading error handling
4. **Preloading**: Background page preloading
5. **Analytics**: Loading time tracking
