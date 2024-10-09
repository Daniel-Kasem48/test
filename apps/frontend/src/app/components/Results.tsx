import { Geolocation } from '../formSlice';

interface FormProps {
  state: {
    results: Geolocation | null;
    loading: boolean;
    error: string | null;
  };
}

const Results: React.FC<FormProps> = ({ state }) => {
  return (
    <div
      className={`App text-center space-y-8 p-8 bg-black/90 rounded-2xl shadow-2xl w-[30rem] max-w-lg h-[16rem] ${
        state.loading
          ? 'text-yellow-700'
          : state.error
            ? 'text-red-700'
            : 'text-green-700'
      }`}
    >

      <h1 className="text-4xl font-extrabold  bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
        Your Results
      </h1>
      <div className="mt-4 p-4 rounded-lg text-xl">
        {state.loading ? (
          <p className="font-semibold">Loading...</p>
        ) : (
          <>
            {state.error && <p>Error: {state.error}</p>}
            {!state.error && !state.results && (
              <p className="font-semibold">
                No search has been performed yet. Enter your details to get
                started
              </p>
            )}
            {!state.error && state.results && (
              <div className="font-semibold text-left w-fit mx-auto">
                <p className="text-gray-100">Geolocation:</p>{' '}
                <p>{state.results.latitude}</p> <p>{state.results.longitude}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Results;
