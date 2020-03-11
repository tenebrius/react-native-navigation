const { Navigation } = require('react-native-navigation');
const Colors = require('./Colors');
const { Dimensions } = require('react-native');
const height = Math.round(Dimensions.get('window').height);
const width = Math.round(Dimensions.get('window').width);
console.log('guyca', `height: ${height} width: ${width}`);
const {
  useSlowOpenScreenAnimations,
  useSlideAnimation
} = require('../flags');
const SHOW_DURATION = 310 * 2.5;

const setDefaultOptions = () => Navigation.setDefaultOptions({
  layout: {
    componentBackgroundColor: Colors.background,
    orientation: ['portrait'],
    direction: 'locale'
  },
  bottomTabs: {
    titleDisplayMode: 'alwaysShow'
  },
  bottomTab: {
    selectedIconColor: Colors.primary,
    selectedTextColor: Colors.primary
  },
  animations: {
    ...useSlideAnimation ?
        slideAnimations :
        useSlowOpenScreenAnimations ?
          slowOpenScreenAnimations :
          {}
  },
  modalPresentationStyle: 'fullScreen'
});

const slideAnimations = {
  push: {
    waitForRender: true,
    content: {
      translationX: {
        from: width,
        to: 0,
        duration: useSlowOpenScreenAnimations ? SHOW_DURATION : 300
      },
      alpha: {
        from: 0.7,
        to: 1,
        duration: useSlowOpenScreenAnimations ? SHOW_DURATION : 300
      }
    }
  },
  pop: {
    content: {
      translationX: {
        from: 0,
        to: width,
        duration: useSlowOpenScreenAnimations ? SHOW_DURATION : 300
      },
      alpha: {
        from: 1,
        to: 0.3,
        duration: useSlowOpenScreenAnimations ? SHOW_DURATION : 300
      }
    }
  }
}

const slowOpenScreenAnimations = {
  showModal: {
    waitForRender: true,
    translationY: {
      from: height,
      to: 0,
      duration: SHOW_DURATION,
      interpolation: 'decelerate'
    },
    alpha: {
      from: 0.65,
      to: 1,
      duration: SHOW_DURATION * 0.5,
      interpolation: 'accelerate'
    }
  },
  dismissModal: {
    translationY: {
      from: 0,
      to: height,
      duration: SHOW_DURATION * 0.8,
    },
    
  },
  push: {
    waitForRender: true,
    content: {
      alpha: {
        from: 0.6,
        to: 1,
        duration: SHOW_DURATION,
      },
      translationY: {
        from: height * 0.3,
        to: 0,
        duration: SHOW_DURATION,
      }
    }
  },
  pop: {
    content: {
      alpha: {
        from: 1,
        to: 0,
        duration: SHOW_DURATION,
      },
      translationY: {
        from: 0,
        to: height * 0.7,
        duration: SHOW_DURATION,
      }
    }
  }
}

module.exports = {
  setDefaultOptions
}
