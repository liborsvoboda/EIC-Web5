// BASED ON THE WORK OF: https://github.com/OnVelocity/ov-react-selectdaterange

import React from "react"

/*

---------------------------------------------------------------------------
HOW TO USE IT:
---------------------------------------------------------------------------

const calendarDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const calendarMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

return (
        <Calendar
              date={new Date()}
              weekStartsOnMonday
              days={calendarDays}
              months={calendarMonths}
              />
        )
*/

const Calendar = ({ date, weekStartsOnMonday, days, months }) => {
  const [selectedDate, setSelectedDate] = React.useState(date)

  const previousMonth = () => {
    setSelectedDate(getOffsetMonth(selectedDate, -1))
  }

  const nextMonth = () => {
    setSelectedDate(getOffsetMonth(selectedDate, 1))
  }

  React.useEffect(() => {
    setSelectedDate(date)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={styles.container} id="myCalendar">
      <div style={styles.header}>
        <div style={styles.prev} onClick={previousMonth}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="#3A76B1"
              d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
            />
          </svg>
        </div>
        <div style={styles.monthName}>
          {months[selectedDate && selectedDate.getMonth()]}{" "}
          {selectedDate.getFullYear()}
        </div>
        <div style={styles.next} onClick={nextMonth}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="#3A76B1"
              d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
            />
          </svg>
        </div>
      </div>
      <div style={styles.week}>
        <div style={styles.dayname}>{weekStartsOnMonday ? days[0] : days[6]}</div>
        <div style={styles.dayname}>{weekStartsOnMonday ? days[1] : days[0]}</div>
        <div style={styles.dayname}>{weekStartsOnMonday ? days[2] : days[1]}</div>
        <div style={styles.dayname}>{weekStartsOnMonday ? days[3] : days[2]}</div>
        <div style={styles.dayname}>{weekStartsOnMonday ? days[4] : days[3]}</div>
        <div style={styles.dayname}>{weekStartsOnMonday ? days[5] : days[4]}</div>
        <div style={styles.dayname}>{weekStartsOnMonday ? days[6] : days[5]}</div>
      </div>
      <CalendarMonth
        startDate={selectedDate}
        selectedDate={selectedDate}
        weekStartsOnMonday={weekStartsOnMonday}
      />
    </div>
  )
}

const CalendarMonth = ({ startDate, selectedDate, weekStartsOnMonday }) => {
  const monthStart = getStartOfMonthDate(startDate)
  const weekStart = getStartOfWeekDate(monthStart, weekStartsOnMonday)
  const weeks = []
  for (let i = 0; i < 6; i++) {
    const offset = i * 7
    const dateFirstDayWeek = getOffsetDate(weekStart, offset)
    const dateLastDayWeek = getOffsetDate(weekStart, offset + 6)
    if (
      dateFirstDayWeek.getMonth() === selectedDate.getMonth() ||
      dateLastDayWeek.getMonth() === selectedDate.getMonth()
    ) {
      weeks.push(
        <CalendarWeek
          key={i}
          startOfWeekDate={dateFirstDayWeek}
          startDate={startDate}
          selectedDate={selectedDate}
        />
      )
    }
  }
  return <>{weeks}</>
}

const CalendarWeek = ({ startOfWeekDate, startDate, selectedDate }) => {
  const week = []
  for (let i = 0; i < 7; i++) {
    const date = getOffsetDate(startOfWeekDate, i)
    week.push(
      <CalendarDay
        key={i}
        date={date}
        startDate={startDate}
        selectedDate={selectedDate}
      />
    )
  }
  return (
    <div key={startOfWeekDate.toString()} style={styles.week}>
      {week}
    </div>
  )
}

const CalendarDay = ({ date, startDate }) => {
  const day = date.getDate()
  const isToday = isDateToday(date)
  const inMonth = isDateInStartDateMonth(date, startDate)
  return (
    <div
      key={day}
      style={{
        borderRadius: isToday && inMonth ? "30px" : undefined,
        ...styles.day,
        ...(isToday ? styles.today : undefined),
        ...(inMonth ? undefined : styles.notInMonth),
      }}
    >
      {day}
    </div>
  )
}

const getOffsetMonth = (date, offsetMonth) => {
  return new Date(date.getFullYear(), date.getMonth() + offsetMonth, 1)
}

const getOffsetDate = (date, offsetDate) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + offsetDate)
}

const isDateInStartDateMonth = (date, startDate) => {
  return (
    startDate.getMonth() === date.getMonth() &&
    startDate.getFullYear() === date.getFullYear()
  )
}

const isDateToday = (date) => {
  const today = new Date(Date.now())
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  )
}

const getStartOfWeekDate = (date, weekStartsOnMonday) => {
  const offset = date.getDay()
  return getOffsetDate(date, -offset + (weekStartsOnMonday ? 1 : 0))
}

const getStartOfMonthDate = (date) => {
  const offset = -1 - date.getDate()
  return getOffsetDate(date, offset)
}

const styles = {
  container: {
    backgroundColor: "#FFFFFF",
    borderLeft: "1px solid #b5b5b5",
    borderTop: "1px solid #b5b5b5",
    borderTopLeftRadius: "5px",
    overflow: "hidden",
  },
  header: {
    height: "64px",
    backgroundColor: "#FFFFFF",
    cursor: "default",
  },
  monthName: {
    display: "inline-block",
    width: "399px",
    fontSize: "20px",
    fontWeight: "bold",
    height: "64px",
    lineHeight: "64px",
    textAlign: "center",
  },
  prev: {
    fontSize: "30px",
    width: "40px",
    textAlign: "center",
    color: "#3A76B1",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "5px",
    textDecoration: "none",
    cursor: "pointer",
    display: "inline-block",
    height: "64px",
    lineHeight: "64px",
    position: "absolute",
    left: "0",
    top: "0",
  },
  next: {
    fontSize: "30px",
    width: "40px",
    textAlign: "center",
    color: "#3A76B1",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "5px",
    textDecoration: "none",
    cursor: "pointer",
    display: "inline-block",
    height: "64px",
    lineHeight: "64px",
    position: "absolute",
    right: "0",
    top: "0",
  },
  week: {
    display: "flex",
  },
  dayname: {
    width: "56px",
    height: "56px",
    lineHeight: "4",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "bold",
    textTransform: "uppercase",
    backgroundColor: "#E7E9ED",
    color: "#000000",
    margin: "0",
    border: "1px solid transparent",
    cursor: "default",
  },
  day: {
    width: "56px",
    height: "56px",
    lineHeight: "4",
    textAlign: "center",
    fontSize: "14px",
    backgroundColor: "#FFFFFF",
    color: "#000000",
    margin: "0",
    border: "1px solid transparent",
    cursor: "default",
  },
  today: {
    backgroundColor: "#3A76B1",
    color: "#FFFFFF",
  },
  notInMonth: {
    backgroundColor: "#F9F9FB",
    color: "#F9F9FB",
  },
}

export default Calendar
