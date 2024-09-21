import { useAuth } from "../store/auth";


export const Service = () => {
  const { services } = useAuth();
  console.log(services);
  return (

    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>
      {/* contact page main  */}
      <div className="container grid grid-three-cols">
        {services.map((curElem) => {
          return (
            <div className="card" key={curElem.id || curElem.provider}>
              <div className="card-img">
                <img src="/images/register.png" alt="designer"/>
              </div>
              <div className="card-details">
                <div className="grid grid-two-cols">
                  <h3>{curElem.provider}</h3>
                  <h3>{curElem.price}</h3>
                </div>
                <h2>{curElem.service}</h2>
                <p>{curElem.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};