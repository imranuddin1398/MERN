import { Analytics } from "../components/Analytics";
import { useAuth } from "../store/auth";
import { useState, useEffect } from "react";

export const About = () => {
  const [data, setData] = useState('username: ""');
  const { user } = useAuth();
  const [userData, setUserData] = useState(true);

  useEffect(() => {
    if (userData && user) {
      setData({
        username: user.username || "",  // Fallback to empty string if username is undefined
      });
      setUserData(false);
    }
  }, [user, userData]); 
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>Welcome {data.username ? data.username : ""} to our website</p>

              <h1>Why Choose Us? </h1>
              <p>
                Expertise: Our team consists of experienced IT professionals who
                are passionate about staying up-to-date with the latest industry
                trends.
              </p>
              <p>
                Customization: We understand that every business is unique.
                Thats why we create solutions that are tailored to your specific
                needs and goals.
              </p>
              <p>
                Customer-Centric Approach: We prioritize your satisfaction and
                provide top-notch support to address your IT concerns.
              </p>
              <p>
                Affordability: We offer competitive pricing without compromising
                on the quality of our services.
              </p>
              <p>
                Reliability: Count on us to be there when you need us. We're
                committed to ensuring your IT environment is reliable and
                available 24/7.
              </p>
              <div className="btn btn-group">
                <a href="/Contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/Service">
                  <button className="btn secondary-btn">learn more</button>
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="/images/register.png"
                alt="coding buddies "
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      <Analytics />
    </>
  );
};