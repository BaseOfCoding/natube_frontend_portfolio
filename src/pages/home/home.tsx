import "../home/home.css";

function Home() {
  return (
    <>
      <div className="home-body">
        <div className="home-side" />
        <div className="home-center">
          <RadioSelect />
        </div>
      </div>
    </>
  );
}

function RadioSelect() {
  return (
    <div className="home-button-group">
      <button>zz</button>
      <button>zzzzz</button>
    </div>
  );
}

export default Home;
