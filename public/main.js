
const update = document.querySelector('#update-button');
const remove = document.querySelector('#delete-button');
const log = document.querySelector('#console-log');
const refresh = document.querySelector('#refresh-button');

update.addEventListener('click', _ => {
  fetch('/stops', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      old: document.getElementById("oldStops").value,
      new: document.getElementById("newStops").value
    })
  })
})

remove.addEventListener('click', _ => {
  fetch('/stops', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      stop: document.getElementById("deleteStop").value
    })
  })
})

log.addEventListener('click', async _ => {
  const stopNames = await fetchStopNames();

  for (let i = 0; i < stopNames.stops.length; i++) {
    console.log(stopNames.stops[i].stop)
    stopNames.stops[i]["info"] = await fetchHSL(stopNames.stops[i].stop);
  }
  console.log(stopNames)
})

// DirectionID = 1 To Helsinki Center, 0 Away from Helsinki center
const fetchHSL = async (stopName) => {
  const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `{ 
          stops(name: "` + stopName + `") {
            gtfsId
            patterns { directionId } 
            stoptimesWithoutPatterns {
              scheduledArrival
              realtimeArrival
              arrivalDelay
              realtime
              realtimeState
              serviceDay
              headsign
            }
          }
        }
    `}),
  })
  const final = await response.json()
  return final;
}

const fetchStopNames = async () => {
  const response = await fetch('/stopsJSON', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const final = await response.json()
    return final;
}

const handleData = (dataOwn, dataHSL) => {

  for (let i = 0; i < data.data.stops.length; i++) {
    HSLStops['id'] = data.data.stops[i].gtfsId
    console.log(HSLStops)
    console.log(data.data.stops[i].gtfsId)
    for (let z = 0; z < data.data.stops[i].stoptimesWithoutPatterns.length; z++) {
      console.log(data.data.stops[i].stoptimesWithoutPatterns[z]);
      
    }
  }
}

