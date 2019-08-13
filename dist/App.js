"use strict";

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _graphqlHooks = require("graphql-hooks");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _FormControlLabel = _interopRequireDefault(require("@material-ui/core/FormControlLabel"));

var _Switch = _interopRequireDefault(require("@material-ui/core/Switch"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _core = require("@material-ui/core");

var _MuiThemeProvider = _interopRequireDefault(require("@material-ui/core/styles/MuiThemeProvider"));

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const client = new _graphqlHooks.GraphQLClient({
  url: '/graphql'
});
const LIST_QUERY = 'query List($offset: Int) { list(offset: $offset){ bg_event_id, event_name, venue_name, event_date } }';
const MAP_QUERY = 'mutation { }';

function Event({
  bg_event_id,
  event_name,
  venue_name,
  event_date
}) {
  return _react.default.createElement(_core.ListItem, {
    button: true,
    key: bg_event_id
  }, _react.default.createElement(_core.ListItemText, {
    primary: event_name,
    secondary: `${venue_name} || ${new Date(parseInt(event_date))}`
  }));
}

function StubhubEvent({}) {
  return _react.default.createElement("li", null, "Hi");
}

function Stubhub() {
  const [values, setValues] = (0, _react.useState)({
    event: '',
    venue: ''
  });
  const [checks, setChecks] = (0, _react.useState)({
    updateSearch: true
  });

  const handleCheck = name => event => {
    setChecks({ ...checks,
      [name]: event.target.checked
    });
  };

  const handleChange = name => event => {
    setValues({ ...values,
      [name]: event.target.value
    });
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_FormControlLabel.default, {
    control: _react.default.createElement(_Switch.default, {
      checked: checks.updateSearch,
      onChange: handleCheck('updateSearch'),
      value: "updateSearch"
    }),
    label: "Update search when clicking events"
  }), _react.default.createElement(_TextField.default, {
    label: "Event Name",
    value: values.event,
    onChange: handleChange('event'),
    margin: "normal"
  }), _react.default.createElement(_TextField.default, {
    label: "Venue",
    value: values.venue,
    onChange: handleChange('venue'),
    margin: "normal"
  }));
}

function Uptick() {
  const PER_PAGE = 100;
  const [offset, setOffset] = (0, _react.useState)(0);
  const [values, setValues] = (0, _react.useState)({
    event_name: '',
    venue_name: ''
  });
  const {
    loading,
    error,
    data
  } = (0, _graphqlHooks.useQuery)(LIST_QUERY, {
    variables: {
      offset
    }
  });
  const {
    useMapQuery
  } = (0, _graphqlHooks.useManualQuery)(MAP_QUERY);

  const handleChange = name => event => {
    setValues({ ...values,
      [name]: event.target.value
    });
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_TextField.default, {
    style: {
      flexFlow: '0 1 auto'
    },
    label: "Event Name",
    value: values.event_name,
    onChange: handleChange('event_name'),
    margin: "normal"
  }), _react.default.createElement(_TextField.default, {
    style: {
      flexFlow: '0 1 auto'
    },
    label: "Venue",
    value: values.venue_name,
    onChange: handleChange('venue_name'),
    margin: "normal"
  }), _react.default.createElement("div", {
    style: {
      flexFlow: '1 0 auto',
      overflow: 'auto'
    }
  }, loading && 'Loading...', error && 'Something went wrong', data && data.list.map(event => _react.default.createElement(Event, event))), _react.default.createElement("div", {
    style: {
      flexFlow: '0 1 140px'
    }
  }, _react.default.createElement(_Button.default, {
    variant: "contained",
    color: "primary",
    onClick: () => setOffset(offset - PER_PAGE),
    disabled: offset === 0
  }, "Previous page"), _react.default.createElement(_Button.default, {
    variant: "contained",
    color: "primary",
    onClick: () => setOffset(offset + PER_PAGE)
  }, "Next page")));
}

function App() {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_core.CssBaseline, null), _react.default.createElement(_core.AppBar, {
    position: "relative",
    color: "primary"
  }, _react.default.createElement(_core.Toolbar, null, _react.default.createElement("img", {
    alt: "mapsalot",
    src: "Spamalot.jpg"
  }))), _react.default.createElement(_Grid.default, {
    container: true,
    style: {
      height: 'calc(100% - 114px)'
    }
  }, _react.default.createElement(_Grid.default, {
    item: true,
    style: {
      height: '100%',
      width: '50%'
    }
  }, _react.default.createElement(_Paper.default, {
    className: "uptick",
    style: {
      height: '100%',
      flexFlow: 'column',
      display: 'flex'
    }
  }, _react.default.createElement(Uptick, null))), _react.default.createElement(_Grid.default, {
    item: true,
    style: {
      height: '100%',
      width: '50%'
    }
  }, _react.default.createElement(_Paper.default, {
    className: "stubhub"
  }, _react.default.createElement(Stubhub, null)))));
}

const theme = (0, _styles.createMuiTheme)({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#026dfb' // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main

    },
    secondary: {
      main: '#fe0103'
    } // error: will use the default color

  }
});

_reactDom.default.render(_react.default.createElement(_graphqlHooks.ClientContext.Provider, {
  value: client
}, _react.default.createElement(_MuiThemeProvider.default, {
  theme: theme
}, _react.default.createElement(App, null))), document.getElementById('app'));