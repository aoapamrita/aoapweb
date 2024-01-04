import React from 'react';
import dayjs from 'dayjs';

const ExamTimeComponent = ({ examTime, duration, operation }) => {
  // Split the time string into hours and minutes
  const [hours, minutes] = examTime.split(':');

  // Create a new date object with a default date
  const defaultDate = '2022-01-01'; // Using a common date for all times
  const fullTimeString = `${defaultDate} ${hours}:${minutes}`;

  // Parse the original exam time
  const parsedExamTime = dayjs(fullTimeString);

  // Perform the specified operation on the parsed time
  let newTime;
  if (operation === 'add') {
    newTime = parsedExamTime.add(duration.hours, 'hours').add(duration.minutes, 'minutes');
  } else if (operation === 'subtract') {
    newTime = parsedExamTime.subtract(duration.hours, 'hours').subtract(duration.minutes, 'minutes');
  } else {
    // Default to addition if operation is not specified or invalid
    newTime = parsedExamTime.add(duration.hours, 'hours').add(duration.minutes, 'minutes');
  }

  // Format the times in AM/PM format
  const formattedExamTime = parsedExamTime.format('h:mm A');
  const formattedNewTime = newTime.format('h:mm A');

  return (
    <span>
      {operation === 'add' ? `${formattedExamTime} To ` :''}
      {formattedNewTime}
    </span>
  );
};

export default ExamTimeComponent;
