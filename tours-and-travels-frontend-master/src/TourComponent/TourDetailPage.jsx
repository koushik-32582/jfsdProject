import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TourCarousel from "./TourCarousel";

const TourDetailPage = () => {
  const { tourId } = useParams();

  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const guide = JSON.parse(sessionStorage.getItem("active-guide"));
  const guide_jwtToken = sessionStorage.getItem("guide-jwtToken");

  const navigate = useNavigate();

  const [tour, setTour] = useState({
    id: "",
    name: "",
    description: "",
    totalDaysOfTour: "",
    guide: {
      id: "",
      firstName: "",
      lastName: "",
      emailId: "",
      phoneNo: "",
      role: "",
      address: {
        id: "",
        street: "",
        city: "",
        pincode: "",
      },
      status: "",
    },
    fromLocation: {
      id: "",
      name: "",
      description: "",
      status: "",
    },
    toLocation: {
      id: "",
      name: "",
      description: "",
      status: "",
    },
    activities: [
      {
        id: "",
        name: "",
        description: "",
      },
    ],
    meals: [
      {
        id: "",
        name: "",
        description: "",
      },
    ],
    transport: {
      id: "",
      name: "",
      description: "",
      status: "",
    },
    vehicleRegistrationNo: "",
    transportDescription: "",
    lodging: {
      id: "",
      type: "",
      description: "",
      status: "",
    },
    lodgingName: "",
    lodgingAddress: "",
    totalTickets: "",
    availableTickets: "",
    ticketPrice: "",
    addedDate: "",
    startDate: "",
    endDate: "",
    specialNote: "",
    status: "",
  });

  useEffect(() => {
    const getTour = async () => {
      const fetchTourResponse = await retrieveTour();
      if (fetchTourResponse) {
        setTour(fetchTourResponse.tours[0]);
      }
    };
    getTour();
  }, []);

  const retrieveTour = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/tour/fetch?tourId=" + tourId
    );
    console.log(response.data);
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  const bookTourPage = (e) => {
    e.preventDefault();
    if (customer === null) {
      alert("Please login as customer to book an tour!!!");
    } else {
      navigate("/tour/booking/page", { state: tour });
    }
  };

  const updateTourActivity = () => {
    navigate("/tour-guide/tour/activity/update", { state: tour });
  };

  const updateTourMeal = () => {
    navigate("/tour-guide/tour/meal/update", { state: tour });
  };

  const updateTourImages = () => {
    navigate("/tour-guide/tour/images/update", { state: tour });
  };

  const updateTourDetails = () => {
    navigate("/tour-guide/tour/update/detail", { state: tour });
  };

  return (
    <div className="mb-3">
      <div className="col ml-5 mt-3 ms-5 me-5">
        {/* Company and Employer Details Card */}
        <div className="card rounded-card h-100 shadow-lg ">
          <h2 className="card-title text-center text-color ms-4">
            Tour Detail
          </h2>

          <div className="row g-0">
            {/* Left side - Company Details Card */}
            <div className="col-md-6">
              <div className="card-body">
                <div className="row g-0">
                  {/* Left side - Company Logo */}
                  <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <TourCarousel
                      item={{
                        image1: tour.image1,
                        image2: tour.image2,
                        image3: tour.image3,
                      }}
                    />
                  </div>
                  {/* Right side - Job Details */}
                  <div className="col-md-8">
                    <div className="card-body text-color">
                      <h3 className="card-title d-flex justify-content-between text-color-second">
                        <div>
                          <b>{tour.name}</b>
                        </div>
                      </h3>
                      <p className="card-text text-dark">{tour.description}</p>
                      <br />
                      <b className="card-text">
                        <div className="col-md-4 d-flex justify-content-between">
                          <div>
                            <span className="text-dark">From:</span>
                            <span className="text-color ms-2">
                              {tour.fromLocation.name + " "}
                            </span>
                          </div>
                          <div className="ms-5">
                            <span className="text-dark"> To:</span>
                            <span className="text-color ms-2">
                              {tour.toLocation.name + " "}
                            </span>
                          </div>
                        </div>
                      </b>
                      <br />
                      <b>
                        <span className="text-dark">Tour Guide:</span>
                        <span className="text-color ms-2">
                          {tour.guide.firstName + " " + tour.guide.lastName}
                        </span>
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Employer Details Card */}
            <div className="col-md-6 text-dark">
              <div className="card-body">
                {/* Include the necessary details for the employer */}
                {/* Display First Name and Last Name in a row */}
                <div className="row mt-5">
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Tour Start:</b>

                      <span className="text-color">
                        {" "}
                        {formatDateFromEpoch(tour.startDate)}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Tour End:</b>
                      <span className="text-color">
                        {" "}
                        {formatDateFromEpoch(tour.endDate)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Total Tour Day:</b>

                      <span className="text-color">
                        {" "}
                        {tour.totalDaysOfTour}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Added Date:</b>
                      <span className="text-color">
                        {" "}
                        {formatDateFromEpoch(tour.addedDate)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Transport:</b>

                      <span className="text-color"> {tour.transport.name}</span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Vehicle Registration No:</b>
                      <span className="text-color">
                        {" "}
                        {tour.vehicleRegistrationNo}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-12">
                    <p className="mb-2">
                      <b>Transport Description:</b>

                      <span className="text-color">
                        {" "}
                        {tour.transportDescription}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-0">
            {/* Left side - Company Details Card */}

            <div className="col-md-6 text-dark">
              <div className="card-body">
                {/* Include the necessary details for the employer */}
                {/* Display First Name and Last Name in a row */}
                <div className="text-left text-color">
                  <h4>Activities</h4>
                </div>

                {tour.activities && tour.activities.length > 0 ? (
                  tour.activities.map((activity, index) => (
                    <div className="row mt-3" key={index}>
                      <div className="col-md-6">
                        <p className="mb-2">
                          <b>Name:</b>
                          <span className="text-color"> {activity.name}</span>
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-2">
                          <b>Description:</b>
                          <span className="text-color">
                            {" "}
                            {activity.description}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-dark">No Activities added</p>
                )}
              </div>
            </div>

            <div className="col-md-6 text-dark">
              <div className="card-body">
                {/* Include the necessary details for the employer */}
                {/* Display First Name and Last Name in a row */}
                <div className="text-left text-color">
                  <h4>Meals</h4>
                </div>

                {tour.meals && tour.meals.length > 0 ? (
                  tour.meals.map((meal, index) => (
                    <div className="row mt-3" key={index}>
                      <div className="col-md-6">
                        <p className="mb-2">
                          <b>Name:</b>
                          <span className="text-color"> {meal.name}</span>
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-2">
                          <b>Description:</b>
                          <span className="text-color">
                            {" "}
                            {meal.description}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-dark">No Meals added</p>
                )}
              </div>
            </div>
          </div>

          <div className="row g-0">
            {/* Left side - Company Details Card */}
            <div className="col-md-6 text-dark">
              <div className="card-body">
                <div className="text-left text-color mb-2">
                  <h4>Lodging Detail</h4>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Lodge Name:</b>

                      <span className="text-color"> {tour.lodgingName}</span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Lodge Type:</b>
                      <span className="text-color"> {tour.lodging.type}</span>
                    </p>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-12">
                    <p className="mb-2">
                      <b>Lodge Address:</b>

                      <span className="text-color"> {tour.lodgingAddress}</span>
                    </p>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Total Tickets:</b>

                      <span className="text-color"> {tour.totalTickets}</span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Available Tickets:</b>
                      <span className="text-color">
                        {" "}
                        {tour.availableTickets}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-12">
                    <p
                      className="mb-2"
                      style={{
                        fontSize: "1.3em",
                      }}
                    >
                      <b>
                        Ticket Price:{" "}
                        <span className="text-color">
                          &#8377; {tour.ticketPrice}
                        </span>
                      </b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {(() => {
            if (tour.status === "Active") {
              return (
                <div className="d-flex justify-content-center mt-4">
                  <button
                    type="button"
                    className="btn bg-color custom-bg-text mb-3"
                    onClick={(e) => bookTourPage(e)}
                  >
                    <b> Book Tour</b>
                  </button>
                  <ToastContainer />
                </div>
              );
            }
          })()}

          {/* 
        card-footer */}

          {(() => {
            if (guide !== null && guide.id === tour.guide.id) {
              return (
                <div className="card-footer ">
                  <div className="d-flex justify-content-between mt-3">
                    <input
                      type="button"
                      className="btn custom-bg bg-color mb-3 ms-5"
                      value="Update Tour Detail"
                      onClick={updateTourDetails}
                    />

                    <input
                      type="button"
                      className="btn custom-bg bg-color mb-3"
                      value="Update Tour Images"
                      onClick={updateTourImages}
                    />

                    <input
                      type="button"
                      className="btn custom-bg bg-color mb-3"
                      value="Update Activity"
                      onClick={updateTourActivity}
                    />

                    <input
                      type="button"
                      className="btn custom-bg bg-color mb-3 me-5"
                      value="Update Meals"
                      onClick={updateTourMeal}
                    />
                  </div>
                </div>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage;
