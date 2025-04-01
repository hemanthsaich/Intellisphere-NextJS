
require('@testing-library/jest-dom');
require('jest-styled-components');


import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
