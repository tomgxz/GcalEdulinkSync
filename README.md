# Google calendar Edulink Sync
A "simple" program to download ICS timetable data from edulink and automatically add it to google calendar

## TODO
- [ ] Add response code based error handling for [ICS download](./src/getICS.ts)
- [ ] Auto colours based on subject
- [x] Build to exe
- [ ] Add teacher name to subject
- [x] Prevent overwriting already existing lessons
- [ ] Mark out shared frees / 10ths when given a 2nd calendar
    - [x] Shared 10ths
    - [ ] Shared frees
- [ ] Add to docker container that auto adds so can be put on portainer server
    - [ ] Webpack
    - [ ] Docker file build
- [x] Backdate calendar event checking to first date in ICS file
- [ ] Auto calcuate API rate limit wait time to avoid aditional delay
