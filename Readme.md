# Q-digital firebase-wrapper

## Install

### First step
Setup your project by docs firebase/messaging, notifee

### Second step
Add in {project}/index.js

```tsx
import { AppRegistry } from 'react-native';
import App from './src/app.tsx';
import { name as appName } from './app.json';
import { headless } from 'firebase-wrapper'; // this

headless() // and this

AppRegistry.registerComponent(appName, () => App);
```

### Third step
Setup wrapper in App component {project}/src/app.tsx

```tsx
...
import { Firebase } from 'firebase-wrapper'
...

...
return (
  <SomeYourCode>
      <Firebase
        ignoreRegisterByPlatform={['ios']}
        channelId='your-channel-id'
        smallIcon='your_icon_name'
        onToken={(token) => {
          console.log('onToken', token)
        }}
        onMessage={(remoteMessage) => {
          console.log('onMessage', remoteMessage)
        }}
        onPress={(notification) => {
          console.log('onPress', notification)
        }}
      />
  </SomeYourCode>
)
```