/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App/Sidebar/components.js":
/*!***************************************!*\
  !*** ./src/App/Sidebar/components.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CustomNavLink\": () => (/* binding */ CustomNavLink),\n/* harmony export */   \"Logo\": () => (/* binding */ Logo),\n/* harmony export */   \"Nav\": () => (/* binding */ Nav),\n/* harmony export */   \"NavGroup\": () => (/* binding */ NavGroup),\n/* harmony export */   \"SideBar\": () => (/* binding */ SideBar)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ \"./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n/* harmony import */ var _constants_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants/style */ \"./src/constants/style.js\");\n\n\nvar _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;\n\n\n\n\n\nvar NavGroup = styled_components__WEBPACK_IMPORTED_MODULE_3__[\"default\"].div(_templateObject || (_templateObject = (0,_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\"\\n  display: flex;\\n  flex-wrap: wrap;\\n  flex-direction: column;\\n  width: 220px;\\n\"])));\nvar SideBar = styled_components__WEBPACK_IMPORTED_MODULE_3__[\"default\"].div(_templateObject2 || (_templateObject2 = (0,_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\"\\n  z-index: 100;\\n  height: 100vh;\\n\"])));\nvar Nav = styled_components__WEBPACK_IMPORTED_MODULE_3__[\"default\"].nav(_templateObject3 || (_templateObject3 = (0,_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\"\\n  grid-area: nav;\\n  background-color: \", \";\\n  border-radius: 10px;\\n  margin-right: 10px;\\n  height: 100vh;\\n\\n\"])), _constants_style__WEBPACK_IMPORTED_MODULE_2__.mediumBlue);\nvar Logo = styled_components__WEBPACK_IMPORTED_MODULE_3__[\"default\"].img(_templateObject4 || (_templateObject4 = (0,_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\"\\n  width: 220px;\\n\"])));\nvar CustomNavLink = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.NavLink)(_templateObject5 || (_templateObject5 = (0,_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\"\\n  text-decoration: none;\\n  font-size: 1.2rem;\\n  font-weight: 500;\\n  color: \", \";\\n  padding: 10px 0;\\n  display: grid;\\n  transition: all 0.3s ease;\\n  display: flex;\\n  justify-content: center;\\n\\n  grid-template:\\n    auto\\n    / [col-start] 20px [icon] 20px [spacer-col] 12px [label] 1fr [col-end] 20px;\\n  grid-area: auto / 1 / auto / 4;\\n\\n  &.active {\\n    background-color: \", \";\\n    border-right: 3px solid \", \";\\n    color: \", \";\\n    font-weight: 600;\\n  }\\n\\n  &:not(.active):hover {\\n    background-color: #F8F8F8;\\n    color: blue;\\n  }\\n\"])), _constants_style__WEBPACK_IMPORTED_MODULE_2__.red, _constants_style__WEBPACK_IMPORTED_MODULE_2__.lightBlue, _constants_style__WEBPACK_IMPORTED_MODULE_2__.blue, _constants_style__WEBPACK_IMPORTED_MODULE_2__.red);\n\n//# sourceURL=webpack://rofl/./src/App/Sidebar/components.js?");

/***/ }),

/***/ "./src/Router.js":
/*!***********************!*\
  !*** ./src/Router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/dist/react-toastify.esm.js\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var _containers_Landing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./containers/Landing */ \"./src/containers/Landing/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/esm/react-router.js\");\n/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Loading */ \"./src/components/Loading.js\");\n\n\nfunction ownKeys(object, enumerableOnly) {\n  var keys = Object.keys(object);\n\n  if (Object.getOwnPropertySymbols) {\n    var symbols = Object.getOwnPropertySymbols(object);\n    enumerableOnly && (symbols = symbols.filter(function (sym) {\n      return Object.getOwnPropertyDescriptor(object, sym).enumerable;\n    })), keys.push.apply(keys, symbols);\n  }\n\n  return keys;\n}\n\nfunction _objectSpread(target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = null != arguments[i] ? arguments[i] : {};\n    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {\n      (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(target, key, source[key]);\n    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {\n      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));\n    });\n  }\n\n  return target;\n}\n\n\n\n\n // import App from './App'\n\n // import CreateNewLeague from './containers/CreateNewLeague'\n\n\n\nvar App = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {\n  return Promise.all(/*! import() */[__webpack_require__.e(\"vendors-node_modules_react-currency-input-field_dist_index_esm_js-node_modules_babel_runtime_-af2ab1\"), __webpack_require__.e(\"vendors-node_modules_react-beautiful-dnd_dist_react-beautiful-dnd_esm_js-node_modules_fontsou-f651c8\"), __webpack_require__.e(\"src_App_index_js-node_modules_fontsource_open-sans_index_css\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./App */ \"./src/App/index.js\"));\n});\nvar CreateNewLeague = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {\n  return Promise.all(/*! import() */[__webpack_require__.e(\"vendors-node_modules_react-currency-input-field_dist_index_esm_js-node_modules_babel_runtime_-af2ab1\"), __webpack_require__.e(\"src_containers_CreateNewLeague_index_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./containers/CreateNewLeague */ \"./src/containers/CreateNewLeague/index.js\"));\n}); // configuration for toaster messages\n// https://www.npmjs.com/package/react-toastify\n\nreact_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.configure({\n  autoClose: 3000,\n  hideProgressBar: true\n});\n\nfunction Router() {\n  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(function (state) {\n    return _objectSpread({}, state.authReducer);\n  }),\n      userToken = _useSelector.userToken;\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.BrowserRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.Switch, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {\n    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_components_Loading__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.Route, {\n    exact: true,\n    path: \"/login\",\n    render: function render(props) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_containers_Landing__WEBPACK_IMPORTED_MODULE_5__[\"default\"], props);\n    }\n  }), userToken ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.Switch, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.Route, {\n    exact: true,\n    path: \"/create-new-league\",\n    component: CreateNewLeague\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.Route, {\n    path: \"/\",\n    component: App\n  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.Redirect, {\n    to: \"/login\"\n  })))));\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router);\n\n//# sourceURL=webpack://rofl/./src/Router.js?");

/***/ }),

/***/ "./src/components/Loading.js":
/*!***********************************!*\
  !*** ./src/components/Loading.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\n\nfunction Loading() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    style: {\n      marginTop: '50px'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"p\", null, \"Loading......\"));\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loading);\n\n//# sourceURL=webpack://rofl/./src/components/Loading.js?");

/***/ }),

/***/ "./src/constants/style.js":
/*!********************************!*\
  !*** ./src/constants/style.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"blue\": () => (/* binding */ blue),\n/* harmony export */   \"lightBlue\": () => (/* binding */ lightBlue),\n/* harmony export */   \"mediumBlue\": () => (/* binding */ mediumBlue),\n/* harmony export */   \"mobileBreakPoint\": () => (/* binding */ mobileBreakPoint),\n/* harmony export */   \"red\": () => (/* binding */ red)\n/* harmony export */ });\n// export const red  = '#DA2929'\nvar red = ' #F88B60';\nvar blue = '#013369';\nvar mediumBlue = '#C0CCD9';\nvar lightBlue = '#DFE5EC';\nvar mobileBreakPoint = '768px';\n\n//# sourceURL=webpack://rofl/./src/constants/style.js?");

/***/ }),

/***/ "./src/containers/Landing/index.js":
/*!*****************************************!*\
  !*** ./src/containers/Landing/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ \"./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _useLogIn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useLogIn */ \"./src/containers/Landing/useLogIn.js\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n/* harmony import */ var _App_Sidebar_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../App/Sidebar/components */ \"./src/App/Sidebar/components.js\");\n/* harmony import */ var _constants_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../constants/style */ \"./src/constants/style.js\");\n\n\nvar _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;\n\n\n\n\n\n\nvar Container = styled_components__WEBPACK_IMPORTED_MODULE_5__[\"default\"].div(_templateObject || (_templateObject = (0,_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\"\\n  display: flex;\\n  flex-direction: column;\\n  width: 500px;\\n  margin-left: 20px;\\n\"])));\nvar InputLabel = styled_components__WEBPACK_IMPORTED_MODULE_5__[\"default\"].label(_templateObject2 || (_templateObject2 = (0,_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\"\"])));\nvar Headline = styled_components__WEBPACK_IMPORTED_MODULE_5__[\"default\"].h1(_templateObject3 || (_templateObject3 = (0,_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\"\\n  font-family: \\\"helvetica neue\\\", Helvetica, arial, sans-serif; \\n  font-size: 20px;\\n\"])));\nvar LogInButton = styled_components__WEBPACK_IMPORTED_MODULE_5__[\"default\"].button(_templateObject4 || (_templateObject4 = (0,_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\"\\n  width: 100%;\\n  height: 40px;\\n  cursor: pointer;\\n  background:#ccc; \\n  font-family: \\\"helvetica neue\\\", Helvetica, arial, sans-serif; \\n  font-weight: 800;\\n  font-size: 18px;\\n\\n\"])));\nvar Input = styled_components__WEBPACK_IMPORTED_MODULE_5__[\"default\"].input(_templateObject5 || (_templateObject5 = (0,_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\"\\nfont-family: \\\"helvetica neue\\\", Helvetica, arial, sans-serif; \\n\\n  height: 50px;\\n  width: 100%;\\n  border: 0;\\n  border-radius: 4px;\\n  font-size: 0.9em;\\n  background-color: #ECF1F4;\\n  text-indent: 20px;\\n  margin-bottom: 10px;\\n\"])));\nvar EntryModes = styled_components__WEBPACK_IMPORTED_MODULE_5__[\"default\"].div(_templateObject6 || (_templateObject6 = (0,_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\"\\n  display: flex;\\n  flex-direction: row;\\n  \\n\"])));\nvar SelectEntryMode = styled_components__WEBPACK_IMPORTED_MODULE_5__[\"default\"].p(_templateObject7 || (_templateObject7 = (0,_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\"\\n  margin-right: 50px;\\n  font-size: 18px;\\n  font-weight: \", \";\\n  text-decoration: \", \";\\n  cursor: pointer;\\n  color: \", \";\\n  &:hover {\\n    font-weight: 700;\\n    text-decoration: underline;\\n    cursor: pointer;\\n  }\\n\\n\"])), function (props) {\n  return props.selected ? \"700\" : \"400\";\n}, function (props) {\n  return props.selected ? \"underline\" : \"none\";\n}, _constants_style__WEBPACK_IMPORTED_MODULE_4__.blue);\n\nfunction Landing(props) {\n  var _useLogIn = (0,_useLogIn__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(),\n      handleLogIn = _useLogIn.handleLogIn,\n      handleChange = _useLogIn.handleChange,\n      values = _useLogIn.values,\n      registerValues = _useLogIn.registerValues,\n      handleRegisterChange = _useLogIn.handleRegisterChange,\n      handleRegister = _useLogIn.handleRegister,\n      isLoading = _useLogIn.isLoading,\n      entryModeLogIn = _useLogIn.entryModeLogIn,\n      setEntryModeLogIn = _useLogIn.setEntryModeLogIn;\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Container, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Headline, null, \"Welcome to RoFL - Regiment of Fantasy Leagues\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_App_Sidebar_components__WEBPACK_IMPORTED_MODULE_3__.Logo, {\n    style: {\n      marginLeft: '140px'\n    },\n    src: 'https://rofl-public-assets.s3.us-east-2.amazonaws.com/RoflLogo.png',\n    alt: \"roflLogo\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(EntryModes, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(SelectEntryMode, {\n    selected: entryModeLogIn,\n    onClick: function onClick() {\n      return setEntryModeLogIn(!entryModeLogIn);\n    }\n  }, \"Log In\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(SelectEntryMode, {\n    selected: !entryModeLogIn,\n    onClick: function onClick() {\n      return setEntryModeLogIn(!entryModeLogIn);\n    }\n  }, \"Create Account\")), entryModeLogIn ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Input, {\n    name: \"email\",\n    placeholder: \"Email\",\n    type: \"text\",\n    value: values.email,\n    onChange: handleChange\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Input, {\n    name: \"password\",\n    placeholder: \"Password\",\n    type: \"password\",\n    value: values.password,\n    onChange: handleChange\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(LogInButton, {\n    type: \"button\",\n    disabled: isLoading,\n    onClick: handleLogIn\n  }, isLoading ? 'Loading...' : 'Log In')) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Input, {\n    name: \"email\",\n    placeholder: \"Email\",\n    type: \"text\",\n    value: registerValues.email,\n    onChange: handleRegisterChange\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Input, {\n    name: \"password\",\n    placeholder: \"Password\",\n    type: \"password\",\n    value: registerValues.password,\n    onChange: handleRegisterChange\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Input, {\n    name: \"confirmPassword\",\n    placeholder: \"Confirm Password\",\n    type: \"password\",\n    value: registerValues.confirmPassword,\n    onChange: handleRegisterChange\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(LogInButton, {\n    type: \"button\",\n    disabled: isLoading,\n    onClick: handleRegister\n  }, isLoading ? 'Loading...' : 'Register')));\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Landing);\n\n//# sourceURL=webpack://rofl/./src/containers/Landing/index.js?");

/***/ }),

/***/ "./src/containers/Landing/useLogIn.js":
/*!********************************************!*\
  !*** ./src/containers/Landing/useLogIn.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/esm/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _hooks_useApi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/useApi */ \"./src/hooks/useApi.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/esm/react-router.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/dist/react-toastify.esm.js\");\n\n\n\n\nfunction ownKeys(object, enumerableOnly) {\n  var keys = Object.keys(object);\n\n  if (Object.getOwnPropertySymbols) {\n    var symbols = Object.getOwnPropertySymbols(object);\n    enumerableOnly && (symbols = symbols.filter(function (sym) {\n      return Object.getOwnPropertyDescriptor(object, sym).enumerable;\n    })), keys.push.apply(keys, symbols);\n  }\n\n  return keys;\n}\n\nfunction _objectSpread(target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = null != arguments[i] ? arguments[i] : {};\n    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {\n      (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(target, key, source[key]);\n    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {\n      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));\n    });\n  }\n\n  return target;\n}\n\n\n\n\n\n\n\n\nfunction useLogIn() {\n  var _useApi = (0,_hooks_useApi__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(),\n      makeRequest = _useApi.makeRequest,\n      isLoading = _useApi.isLoading;\n\n  var history = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useHistory)();\n  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useDispatch)();\n\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)({\n    email: \"\",\n    password: \"\"\n  }),\n      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_useState, 2),\n      values = _useState2[0],\n      setValues = _useState2[1];\n\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)({\n    email: \"\",\n    password: \"\",\n    confirmPassword: \"\"\n  }),\n      _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_useState3, 2),\n      registerValues = _useState4[0],\n      setRegisterValues = _useState4[1];\n\n  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(true),\n      _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_useState5, 2),\n      entryModeLogIn = _useState6[0],\n      setEntryModeLogIn = _useState6[1];\n\n  var handleLogIn = /*#__PURE__*/function () {\n    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {\n      var res, userInfo;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              if (!(values.email.length < 6)) {\n                _context.next = 3;\n                break;\n              }\n\n              react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.error('Please input a valid email');\n              return _context.abrupt(\"return\");\n\n            case 3:\n              if (!(values.password.length < 8)) {\n                _context.next = 6;\n                break;\n              }\n\n              react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.error('Please create a password with at least 8 characters');\n              return _context.abrupt(\"return\");\n\n            case 6:\n              _context.prev = 6;\n              _context.next = 9;\n              return makeRequest({\n                method: \"post\",\n                route: \"/users/login\",\n                data: {\n                  email: values.email,\n                  password: values.password\n                }\n              });\n\n            case 9:\n              res = _context.sent;\n\n              if (!(res.statusCode === 200)) {\n                _context.next = 16;\n                break;\n              }\n\n              userInfo = res.body;\n              dispatch({\n                type: \"LOGIN\",\n                payload: {\n                  name: userInfo.name,\n                  email: userInfo.email,\n                  organizations: userInfo.organizations,\n                  userToken: userInfo.userToken\n                }\n              });\n              history.push(\"/\");\n              _context.next = 22;\n              break;\n\n            case 16:\n              if (!res.message) {\n                _context.next = 20;\n                break;\n              }\n\n              throw res.message;\n\n            case 20:\n              console.error(res);\n              throw \"Malformed response\";\n\n            case 22:\n              _context.next = 27;\n              break;\n\n            case 24:\n              _context.prev = 24;\n              _context.t0 = _context[\"catch\"](6);\n              console.error(_context.t0);\n\n            case 27:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, null, [[6, 24]]);\n    }));\n\n    return function handleLogIn() {\n      return _ref.apply(this, arguments);\n    };\n  }();\n\n  var handleRegister = /*#__PURE__*/function () {\n    var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {\n      var res;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              if (registerValues.email.length < 6) {\n                react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.error('Please input a valid email');\n              }\n\n              if (registerValues.password.length < 8) {\n                react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.error('Please create a password with at least 8 characters');\n              }\n\n              if (registerValues.password !== registerValues.confirmPassword) {\n                react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.error('Passwords do not match');\n              }\n\n              _context2.prev = 3;\n              _context2.next = 6;\n              return makeRequest({\n                method: \"post\",\n                route: \"/users\",\n                data: {\n                  email: registerValues.email,\n                  password: registerValues.password\n                }\n              });\n\n            case 6:\n              res = _context2.sent;\n\n              if (!(res.statusCode === 200)) {\n                _context2.next = 13;\n                break;\n              }\n\n              console.log('here is res');\n              console.log(res);\n              react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.success(\"Your password has been created, you may now log in\"); // const userInfo = JSON.parse(res.body);\n              // dispatch({\n              //   type: \"LOGIN\",\n              //   payload: {\n              //     name: userInfo.name,\n              //     email: userInfo.email,\n              //     organizations: userInfo.organizations,\n              //     userToken: userInfo.userToken\n              //   }\n              // });\n              // history.push(\"/\");\n\n              _context2.next = 20;\n              break;\n\n            case 13:\n              if (!res.message) {\n                _context2.next = 18;\n                break;\n              }\n\n              react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.error(res.message);\n              throw res.message;\n\n            case 18:\n              console.error(res);\n              throw \"Malformed response\";\n\n            case 20:\n              _context2.next = 25;\n              break;\n\n            case 22:\n              _context2.prev = 22;\n              _context2.t0 = _context2[\"catch\"](3);\n              console.error(_context2.t0);\n\n            case 25:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2, null, [[3, 22]]);\n    }));\n\n    return function handleRegister() {\n      return _ref2.apply(this, arguments);\n    };\n  }();\n\n  var handleChange = function handleChange(e, type) {\n    setValues(_objectSpread(_objectSpread({}, values), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, e.target.name, e.target.value)));\n  };\n\n  var handleRegisterChange = function handleRegisterChange(e, type) {\n    setRegisterValues(_objectSpread(_objectSpread({}, registerValues), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, e.target.name, e.target.value)));\n  };\n\n  return {\n    handleLogIn: handleLogIn,\n    handleChange: handleChange,\n    values: values,\n    registerValues: registerValues,\n    handleRegisterChange: handleRegisterChange,\n    handleRegister: handleRegister,\n    isLoading: isLoading,\n    entryModeLogIn: entryModeLogIn,\n    setEntryModeLogIn: setEntryModeLogIn\n  };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useLogIn);\n\n//# sourceURL=webpack://rofl/./src/containers/Landing/useLogIn.js?");

/***/ }),

/***/ "./src/hooks/useApi.js":
/*!*****************************!*\
  !*** ./src/hooks/useApi.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ useApi)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/esm/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/dist/react-toastify.esm.js\");\n\n\n\n\n\nfunction ownKeys(object, enumerableOnly) {\n  var keys = Object.keys(object);\n\n  if (Object.getOwnPropertySymbols) {\n    var symbols = Object.getOwnPropertySymbols(object);\n    enumerableOnly && (symbols = symbols.filter(function (sym) {\n      return Object.getOwnPropertyDescriptor(object, sym).enumerable;\n    })), keys.push.apply(keys, symbols);\n  }\n\n  return keys;\n}\n\nfunction _objectSpread(target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = null != arguments[i] ? arguments[i] : {};\n    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {\n      (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(target, key, source[key]);\n    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {\n      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));\n    });\n  }\n\n  return target;\n}\n\n\n\n\n // this is a hook that exports a function that can eventually \n// be configured to call any api with any data or any headers\n// while giving a real time update on loading status\n\nfunction useApi() {\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),\n      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_useState, 2),\n      isLoading = _useState2[0],\n      setIsLoading = _useState2[1];\n\n  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)(function (state) {\n    return _objectSpread({}, state.authReducer);\n  }),\n      userToken = _useSelector.userToken;\n\n  var roflApi = axios__WEBPACK_IMPORTED_MODULE_6___default().create({\n    baseURL: \"http://localhost:4000/dev\"\n  });\n\n  if (userToken) {\n    roflApi.defaults.headers.common['userToken'] = userToken;\n  }\n\n  var makeRequest = /*#__PURE__*/function () {\n    var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(_ref) {\n      var method, route, _ref$data, data, _ref$continueLoading, continueLoading, _ref$suppressIsLoadin, suppressIsLoading, _ref$abort, abort;\n\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              method = _ref.method, route = _ref.route, _ref$data = _ref.data, data = _ref$data === void 0 ? null : _ref$data, _ref$continueLoading = _ref.continueLoading, continueLoading = _ref$continueLoading === void 0 ? false : _ref$continueLoading, _ref$suppressIsLoadin = _ref.suppressIsLoading, suppressIsLoading = _ref$suppressIsLoadin === void 0 ? false : _ref$suppressIsLoadin, _ref$abort = _ref.abort, abort = _ref$abort === void 0 ? null : _ref$abort;\n              if (!suppressIsLoading) setIsLoading(true);\n              _context.prev = 2;\n              return _context.abrupt(\"return\", roflApi[method](route, data, {\n                signal: abort\n              }).then(function (res) {\n                var _res$data;\n\n                if ((_res$data = res.data) !== null && _res$data !== void 0 && _res$data.statusCode) {\n                  return res.data;\n                } else {\n                  return {\n                    statusCode: res.status,\n                    body: res.data\n                  };\n                }\n              })[\"catch\"](function (e) {\n                var _e$response, _e$response$data, _e$response2;\n                /**\n                 * @TODO add logout on 401\n                 */\n\n\n                var errorMessage = (_e$response = e.response) !== null && _e$response !== void 0 && (_e$response$data = _e$response.data) !== null && _e$response$data !== void 0 && _e$response$data.message ? e.response.data.message : (_e$response2 = e.response) !== null && _e$response2 !== void 0 && _e$response2.data ? e.response.data : 'Your request could not be completed';\n                react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.error(errorMessage);\n                throw e;\n              })[\"finally\"](function () {\n                if (!continueLoading) {\n                  setIsLoading(false);\n                }\n              }));\n\n            case 6:\n              _context.prev = 6;\n              _context.t0 = _context[\"catch\"](2);\n              console.log('here is error');\n              console.log(_context.t0);\n              return _context.abrupt(\"return\", _context.t0);\n\n            case 11:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, null, [[2, 6]]);\n    }));\n\n    return function makeRequest(_x) {\n      return _ref2.apply(this, arguments);\n    };\n  }();\n\n  var stopLoading = function stopLoading() {\n    setIsLoading(false);\n  };\n\n  return {\n    makeRequest: makeRequest,\n    isLoading: isLoading,\n    stopLoading: stopLoading\n  };\n}\n\n//# sourceURL=webpack://rofl/./src/hooks/useApi.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

eval("/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.css */ \"./src/index.css\");\n/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Router */ \"./src/Router.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./store */ \"./src/store/index.js\");\n\n\n\n\n\n // import * as serviceWorker from './serviceWorker';\n\nreact_dom__WEBPACK_IMPORTED_MODULE_1__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_redux__WEBPACK_IMPORTED_MODULE_4__.Provider, {\n  store: _store__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Router__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null)), document.getElementById('app')); // If you want your app to work offline and load faster, you can change\n// unregister() to register() below. Note this comes with some pitfalls.\n// Learn more about service workers: https://bit.ly/CRA-PWA\n// serviceWorker.unregister();\n\n//# sourceURL=webpack://rofl/./src/index.js?");

/***/ }),

/***/ "./src/reducers/authReducer.js":
/*!*************************************!*\
  !*** ./src/reducers/authReducer.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n\n\nfunction ownKeys(object, enumerableOnly) {\n  var keys = Object.keys(object);\n\n  if (Object.getOwnPropertySymbols) {\n    var symbols = Object.getOwnPropertySymbols(object);\n    enumerableOnly && (symbols = symbols.filter(function (sym) {\n      return Object.getOwnPropertyDescriptor(object, sym).enumerable;\n    })), keys.push.apply(keys, symbols);\n  }\n\n  return keys;\n}\n\nfunction _objectSpread(target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = null != arguments[i] ? arguments[i] : {};\n    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {\n      (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(target, key, source[key]);\n    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {\n      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));\n    });\n  }\n\n  return target;\n}\n\nvar INITIAL_STATE = {\n  userToken: null,\n  name: null,\n  email: null,\n  currentOrganization: null,\n  organizations: null\n};\n\nfunction authReducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case \"LOGIN\":\n      console.log('here is action payload');\n      console.log(action.payload);\n      var currentOrg = action.payload.organizations.find(function (org) {\n        return org.current === 1;\n      });\n      var currentOrganizationLogin = currentOrg ? currentOrg : action.payload.organizations[0];\n      return _objectSpread(_objectSpread({}, state), {}, {\n        name: action.payload.name,\n        email: action.payload.email,\n        organizations: action.payload.organizations,\n        userToken: action.payload.userToken,\n        currentOrganization: currentOrganizationLogin\n      });\n\n    case \"SET_NEW_ORGS\":\n      var currentOrganizationSet = action.payload.organizations.find(function (org) {\n        return org.current === 1;\n      });\n      return _objectSpread(_objectSpread({}, state), {}, {\n        organizations: action.payload.organizations,\n        currentOrganization: currentOrganizationSet\n      });\n\n    default:\n      return state;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authReducer);\n\n//# sourceURL=webpack://rofl/./src/reducers/authReducer.js?");

/***/ }),

/***/ "./src/reducers/index.js":
/*!*******************************!*\
  !*** ./src/reducers/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var _authReducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authReducer */ \"./src/reducers/authReducer.js\");\n/* harmony import */ var _sportReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sportReducer */ \"./src/reducers/sportReducer.js\");\n/* harmony import */ var _modalReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modalReducer */ \"./src/reducers/modalReducer.js\");\n/* harmony import */ var _utils_localStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/localStorage */ \"./src/utils/localStorage.js\");\n\n\n\n\n\nvar combinedReducer = (0,redux__WEBPACK_IMPORTED_MODULE_4__.combineReducers)({\n  authReducer: _authReducer__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  sportReducer: _sportReducer__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  modalReducer: _modalReducer__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n});\n\nvar rootReducer = function rootReducer(state, action) {\n  (0,_utils_localStorage__WEBPACK_IMPORTED_MODULE_3__.removeState)();\n\n  if (action.type === 'LOGOUT') {\n    state = undefined;\n  }\n\n  return combinedReducer(state, action);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rootReducer);\n\n//# sourceURL=webpack://rofl/./src/reducers/index.js?");

/***/ }),

/***/ "./src/reducers/modalReducer.js":
/*!**************************************!*\
  !*** ./src/reducers/modalReducer.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n\n\nfunction ownKeys(object, enumerableOnly) {\n  var keys = Object.keys(object);\n\n  if (Object.getOwnPropertySymbols) {\n    var symbols = Object.getOwnPropertySymbols(object);\n    enumerableOnly && (symbols = symbols.filter(function (sym) {\n      return Object.getOwnPropertyDescriptor(object, sym).enumerable;\n    })), keys.push.apply(keys, symbols);\n  }\n\n  return keys;\n}\n\nfunction _objectSpread(target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = null != arguments[i] ? arguments[i] : {};\n    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {\n      (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(target, key, source[key]);\n    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {\n      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));\n    });\n  }\n\n  return target;\n}\n\nvar INITIAL_STATE = {\n  modalContent: null,\n  props: null\n};\n\nfunction modalReducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case \"SHOW_MODAL\":\n      return _objectSpread(_objectSpread({}, state), {}, {\n        modalContent: action.payload.modalContent,\n        props: action.payload.props\n      });\n\n    case \"CLOSE_MODAL\":\n      return _objectSpread(_objectSpread({}, state), {}, {\n        modalContent: null,\n        props: null\n      });\n\n    default:\n      return state;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalReducer);\n\n//# sourceURL=webpack://rofl/./src/reducers/modalReducer.js?");

/***/ }),

/***/ "./src/reducers/sportReducer.js":
/*!**************************************!*\
  !*** ./src/reducers/sportReducer.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n\n\nfunction ownKeys(object, enumerableOnly) {\n  var keys = Object.keys(object);\n\n  if (Object.getOwnPropertySymbols) {\n    var symbols = Object.getOwnPropertySymbols(object);\n    enumerableOnly && (symbols = symbols.filter(function (sym) {\n      return Object.getOwnPropertyDescriptor(object, sym).enumerable;\n    })), keys.push.apply(keys, symbols);\n  }\n\n  return keys;\n}\n\nfunction _objectSpread(target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = null != arguments[i] ? arguments[i] : {};\n    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {\n      (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(target, key, source[key]);\n    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {\n      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));\n    });\n  }\n\n  return target;\n}\n\nvar INITIAL_STATE = {\n  activeYears: null,\n  currentDate: null,\n  playoffMonths: null,\n  sportTeams: null,\n  orgMembers: null,\n  deadlines: null,\n  roflYear: 2022\n};\n\nfunction sportReducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case \"SET_ROFL_YEAR\":\n      return {\n        roflYear: action.payload.roflYear\n      };\n\n    case \"SET_ACTIVE_YEARS_AND_MONTHS\":\n      return _objectSpread(_objectSpread({}, state), {}, {\n        activeYears: action.payload.activeYears,\n        currentDate: action.payload.currentDate,\n        // this data doesnt really change so api call is not necessary\n        startingMonths: {\n          2022: {\n            1: 1,\n            2: 6,\n            3: 7,\n            4: 7\n          }\n        },\n        playoffMonths: {\n          2022: {\n            1: 7,\n            2: 10,\n            3: 14,\n            4: 14\n          }\n        },\n        leagueTable: {\n          1: \"MLB\",\n          2: \"NFL\",\n          3: \"NHL\",\n          4: \"NBA\"\n        }\n      });\n\n    case \"HYDRATE_SPORT_TEAMS\":\n      return _objectSpread(_objectSpread({}, state), {}, {\n        sportTeams: action.payload.sportTeams\n      });\n\n    case \"HYDRATE_ORG_MEMBERS\":\n      return _objectSpread(_objectSpread({}, state), {}, {\n        orgMembers: action.payload.orgMembers\n      });\n\n    case \"HYDRATE_DEADLINES\":\n      var newState = _objectSpread({}, state);\n\n      if (!newState.deadlines) {\n        newState.deadlines = {};\n      }\n\n      newState.deadlines[action.payload.roflYear] = action.payload.deadlines;\n      return newState;\n\n    default:\n      return state;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sportReducer);\n\n//# sourceURL=webpack://rofl/./src/reducers/sportReducer.js?");

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reducers */ \"./src/reducers/index.js\");\n/* harmony import */ var _utils_localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/localStorage */ \"./src/utils/localStorage.js\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-thunk */ \"./node_modules/redux-thunk/es/index.js\");\n\n\n\n\nvar persistedState = (0,_utils_localStorage__WEBPACK_IMPORTED_MODULE_1__.loadState)();\nvar middleware = [redux_thunk__WEBPACK_IMPORTED_MODULE_2__[\"default\"] // routerMiddleware(browserHistory),\n// clientMiddleware(apiClient),\n// actionCallback,\n];\nvar composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux__WEBPACK_IMPORTED_MODULE_3__.compose;\nvar store = (0,redux__WEBPACK_IMPORTED_MODULE_3__.createStore)(_reducers__WEBPACK_IMPORTED_MODULE_0__[\"default\"], persistedState, composeEnhancers(redux__WEBPACK_IMPORTED_MODULE_3__.applyMiddleware.apply(void 0, middleware))); // everything here will be persisted in local storage\n\nstore.subscribe(function () {\n  (0,_utils_localStorage__WEBPACK_IMPORTED_MODULE_1__.saveState)({\n    authReducer: store.getState().authReducer\n  });\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);\n\n//# sourceURL=webpack://rofl/./src/store/index.js?");

/***/ }),

/***/ "./src/utils/localStorage.js":
/*!***********************************!*\
  !*** ./src/utils/localStorage.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadState\": () => (/* binding */ loadState),\n/* harmony export */   \"removeState\": () => (/* binding */ removeState),\n/* harmony export */   \"saveState\": () => (/* binding */ saveState)\n/* harmony export */ });\nvar loadState = function loadState() {\n  // sometimes browser settings won't let you access local storage\n  try {\n    var serializedState = localStorage.getItem('user');\n\n    if (serializedState === null) {\n      return undefined;\n    }\n\n    return JSON.parse(serializedState);\n  } catch (err) {\n    return undefined;\n  }\n};\nvar saveState = function saveState(state) {\n  try {\n    var serializedState = JSON.stringify(state);\n    localStorage.setItem('user', serializedState);\n  } catch (err) {\n    console.error(err);\n  }\n};\nvar removeState = function removeState() {\n  try {\n    localStorage.removeItem('user');\n  } catch (err) {\n    console.error(err);\n  }\n};\n\n//# sourceURL=webpack://rofl/./src/utils/localStorage.js?");

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ (() => {

eval("// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://rofl/./src/index.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".css";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "rofl:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		var createStylesheet = (chunkId, fullhref, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + realHref + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 			document.head.appendChild(linkTag);
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// object to store loaded CSS chunks
/******/ 		var installedCssChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.miniCss = (chunkId, promises) => {
/******/ 			var cssChunks = {"src_App_index_js-node_modules_fontsource_open-sans_index_css":1};
/******/ 			if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 			else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 				promises.push(installedCssChunks[chunkId] = loadStylesheet(chunkId).then(() => {
/******/ 					installedCssChunks[chunkId] = 0;
/******/ 				}, (e) => {
/******/ 					delete installedCssChunks[chunkId];
/******/ 					throw e;
/******/ 				}));
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no hmr
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkrofl"] = self["webpackChunkrofl"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_babel_runtime_regenerator_index_js-node_modules_axios_index_js-node_modu-b8d916"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;