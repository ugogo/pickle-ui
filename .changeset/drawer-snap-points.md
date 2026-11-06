---
'@pickle-ui/react-native': minor
---

`Drawer` takes `snapPoints`, as Base UI's: the sheet rests at those heights and `Drawer.Panel` fills the space they leave. The content now takes the sheet's width on iOS, so its text wraps, and starts 12pt lower on iOS, clear of the grabber; on Android it starts right under Material's grabber row. On the web, the sheet now follows a downward drag, no longer pads the content and places its grabber where iOS draws it.
