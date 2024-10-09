import { Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import { useState } from 'react';
import { Geolocation } from './formSlice';
import Results from './components/Results';

export function App() {
  const [state, setState] = useState<{
    results: Geolocation | null;
    loading: boolean;
    error: string | null;
  }>({
    results: null,
    loading: false,
    error: null,
  });

  const handleResults = (data: Geolocation) => {
    setState({ results: data, loading: false, error: null });
  };

  const handleLoading = (isLoading: boolean) => {
    setState((prevState) => ({ ...prevState, loading: isLoading }));
  };

  const handleError = (error: string | null) => {
    setState((prevState) => ({ ...prevState, error }));
  };

  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover flex justify-center items-center p-4">
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-wrap gap-12 justify-center items-center p-12">
              <div className="App text-center space-y-8 p-8 pb-12 bg-black/90 rounded-2xl shadow-2xl w-[30rem] h-[30rem] max-w-lg w-full">
                <h1 className="text-4xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                  Geolocation Form
                </h1>
                <p className="text-base text-white">
                  Enter your address and email to get geolocation data.
                </p>
                <Form
                  onResults={handleResults}
                  onLoading={handleLoading}
                  onError={handleError}
                />
              </div>
              <Results state={state} />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
