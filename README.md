# koishi-plugin-yuque

A Koishi.js plugin for Yuque Message Pushing

## Installation

### By npm

`npm install koishi-plugin-yuque `

### By yarn

`yarn add koishi-plugin-yuque`

## Usage

### Configuration

```yaml
yuque:
  # The Port that the Plugin Listen
  port: (The Port Number)
  # The channels that the plugin push messages to
  channels: 
  	- (The Channel ID)
  	- (The Channel ID)
```

### Commands

- `yuquepush.is`:Lookup for if it is this plugin's Pushing Channel.
- `yuquepush.add`: Add this channel to this plugin's Pushing Channel.
- `yuquepush.remove`: Remove this channel from this plugin's Pushing Channel.

## Contribution

- Fork this Repo.
- Make a new branch.
- Write your codes.
- Make a Pull Request to the `develop` branch.
