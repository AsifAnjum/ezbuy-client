const randomDate = new Date();

// Function to get random time increments for hours and minutes
const getRandomTimeIncrement = () => {
  return {
    hours: Math.floor(Math.random() * 24), // Random hours between 0 and 23
    minutes: Math.floor(Math.random() * 60), // Random minutes between 0 and 59
    seconds: Math.floor(Math.random() * 60), // Random seconds between 0 and 59
  };
};

// Apply the random increment to randomDate
const increment = getRandomTimeIncrement();

randomDate.setHours(randomDate.getHours() + increment.hours);
randomDate.setMinutes(randomDate.getMinutes() + increment.minutes);
randomDate.setSeconds(randomDate.getSeconds() + increment.seconds);

export default randomDate;
