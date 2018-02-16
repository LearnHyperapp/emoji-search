import { app, h } from 'hyperapp';
import emojiList from './emojiList.json';

import './style.css';

/**
 * Filter emoji
 * @param  {string} searchText query text
 * @param  {int}    maxResults maximum number of emojis to show
 * @return {array}             list of emojis
 */

const filterEmoji = (searchText, maxResults) => {
  return emojiList.filter(emoji => {
    if (emoji.title.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }

    if (emoji.keywords.includes(searchText)) {
      return true;
    }

    return false;
  }).slice(0, maxResults);
};

/**
 * Components
 */

// Display a single emoji item

const EmojiItem = ({emoji}) => (
  <li>{emoji.symbol} {emoji.title}</li>
);

// Display a list of emojis

const EmojiList = ({emojis}) => {
  const list = emojis.map(emoji => <EmojiItem emoji={emoji}/>);

  return (
    <ul>
      {list.length ? list : <li>No matches</li>}
    </ul>
  );
};

/**
 * State, Actions and View
 */

const state = {
  filteredEmoji: filterEmoji('', 20)
};

const actions = {
  search: text => ({filteredEmoji: filterEmoji(text, 20)})
};

const view = (state, actions) => (
  <div
    className="container"
  >
    <h1>Emoji Search</h1>

    <input
      type="search"
      placeholder="Search..."
      oninput={e => actions.search(e.target.value)}
    />

    <EmojiList
      emojis={state.filteredEmoji}
    />
  </div>
);

window.main = app(state, actions, view, document.getElementById('app'));
