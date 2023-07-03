# Svelte Play Reader

Read plays with the Web Audio API

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

Powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte)

## Todos

- Use SSML to handle iambic pentameter

```xml
<!--ID=B7267351-473F-409D-9765-754A8EBCDE05;
Version=1|
{"VoiceNameToIdMapItems":[
	{"Id":"27e2f1c8-cfe0-4324-88e2-cd0bafeffe1b","Name":"Microsoft Server Speech Text to Speech Voice (en-US, AriaNeural)","ShortName":"en-US-AriaNeural","Locale":"en-US","VoiceType":"StandardVoice"},{"Id":"e5e4f59b-65c6-42b2-a6e3-5985d1a1ea07","Name":"Microsoft Server Speech Text to Speech Voice (en-US, JennyNeural)","ShortName":"en-US-JennyNeural","Locale":"en-US","VoiceType":"StandardVoice"},{"Id":"e0638b39-fbd2-4497-a482-e2f65759412a","Name":"Microsoft Server Speech Text to Speech Voice (en-US, GuyNeural)","ShortName":"en-US-GuyNeural","Locale":"en-US","VoiceType":"StandardVoice"},{"Id":"4b1dc409-f234-45cf-bda5-852fa95d0e5f","Name":"Microsoft Server Speech Text to Speech Voice (en-GB, SoniaNeural)","ShortName":"en-GB-SoniaNeural","Locale":"en-GB","VoiceType":"StandardVoice"},{"Id":"5f55541d-c844-4e04-a7f8-1723ffbea4a9","Name":"Microsoft Server Speech Text to Speech Voice (zh-CN, XiaoxiaoNeural)","ShortName":"zh-CN-XiaoxiaoNeural","Locale":"zh-CN","VoiceType":"StandardVoice"},{"Id":"26014551-90d7-4f55-a622-779b8263e006","Name":"Microsoft Server Speech Text to Speech Voice (zh-CN, YunyeNeural)","ShortName":"zh-CN-YunyeNeural","Locale":"zh-CN","VoiceType":"StandardVoice"},{"Id":"1011ca97-3e33-4e7c-8dda-a22dc244bafc","Name":"Microsoft Server Speech Text to Speech Voice (zh-CN, YunxiNeural)","ShortName":"zh-CN-YunxiNeural","Locale":"zh-CN","VoiceType":"StandardVoice"}]}-->
<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US"><voice name="en-US-AriaNeural"><mstts:express-as style="Cheerful">"That’s remarkable! You’re a genius!"</mstts:express-as>Mom said to her son.</voice>
<voice name="en-US-JennyNeural">Customize output by <prosody rate="-40.00%"> slowing-down the speed rate.</prosody></voice>
<voice name="en-US-GuyNeural">Add a break <break time="600ms" /> between words.</voice>
<voice name="en-GB-SoniaNeural">You can pronounce it <say-as interpret-as="spell">ASAP </say-as>or <sub alias="as soon as possible">ASAP</sub>.</voice>
<voice name="zh-CN-XiaoxiaoNeural"><s /><mstts:express-as style="chat">可以通过停顿里的高级功能“No break”，解决<phoneme alphabet="sapi" ph="fen 1 ci 2">分词</phoneme>引起的多余停顿问题。</mstts:express-as><s />
<mstts:express-as style="chat">也可以合成多角色多情感的有声<prosody contour="(49%, -40%)">书</prosody>，例如：</mstts:express-as></voice><voice name="zh-CN-YunyeNeural">黛玉冷笑道：</voice><voice name="zh-CN-XiaoxiaoNeural"><s /><mstts:express-as style="disgruntled">“我说呢，亏了绊住，不然，早就飞了来了。”</mstts:express-as><s /> </voice><voice name="zh-CN-YunyeNeural">宝玉道：</voice><voice name="zh-CN-YunxiNeural">“只许和你玩，替你解闷。不过偶然到他那里，就说这些闲话。”</voice><voice name="zh-CN-XiaoxiaoNeural"><mstts:express-as style="angry">”好没意思的话！去不去，关我什么事儿？又没叫你替我解闷儿，还许你<mstts:ttsbreak strength="none" />从此<prosody contour="(24%, +49%) (59%, -2%)">不</prosody><prosody rate="-15.00%" contour="(24%, +49%) (59%, -2%)">理</prosody><prosody contour="(24%, +49%) (59%, -2%)">我呢</prosody>！”</mstts:express-as></voice><voice name="zh-CN-YunyeNeural"><s />说着，便赌气回房去了。</voice></speak>
```

### Todo Comments



- src/lib/opensourceshakespeare-org/lexer.ts:103: @todo(nick-ng): handle "[Exit Ghost.]", in the middle of a character's lines

- src/lib/opensourceshakespeare-org/lexer.ts:103: @todo(nick-ng): handle "[Exit Ghost.]", in the middle of a character's lines

- src/lib/opensourceshakespeare-org/lexer.ts:105: @todo(nick-ng): handle "[Exit Ghost.]", in the middle of a character's lines

- src/lib/opensourceshakespeare-org/lexer.ts:105: @todo(nick-ng): handle "[Exit Ghost.]", in the middle of a character's lines




- src/lib/opensourceshakespeare-org/compiler.ts:110: @todo(nick-ng): sometimes there is an "Exit." stage direction at the end of a feet
- src/lib/opensourceshakespeare-org/compiler.ts:239: @todo(nick-ng): figure out who spoke last. they will leave the stage
- src/lib/opensourceshakespeare-org/utils.ts:39: @todo(nick-ng): what if an unknown character enters with a known character?

- src/lib/opensourceshakespeare-org/compiler.ts:110: @todo(nick-ng): sometimes there is an "Exit." stage direction at the end of a feet
- src/lib/opensourceshakespeare-org/compiler.ts:239: @todo(nick-ng): figure out who spoke last. they will leave the stage
- src/lib/opensourceshakespeare-org/utils.ts:39: @todo(nick-ng): what if an unknown character enters with a known character?

- src/lib/opensourceshakespeare-org/compiler.ts:110: @todo(nick-ng): sometimes there is an "Exit." stage direction at the end of a feet
- src/lib/opensourceshakespeare-org/compiler.ts:239: @todo(nick-ng): figure out who spoke last. they will leave the stage
- src/lib/opensourceshakespeare-org/utils.ts:39: @todo(nick-ng): what if an unknown character enters with a known character?

- src/lib/opensourceshakespeare-org/compiler.ts:110: @todo(nick-ng): sometimes there is an "Exit." stage direction at the end of a feet
- src/lib/opensourceshakespeare-org/compiler.ts:239: @todo(nick-ng): figure out who spoke last. they will leave the stage
- src/lib/opensourceshakespeare-org/utils.ts:39: @todo(nick-ng): what if an unknown character enters with a known character?

- src/lib/opensourceshakespeare-org/compiler.ts:110: @todo(nick-ng): sometimes there is an "Exit." stage direction at the end of a feet
- src/lib/opensourceshakespeare-org/compiler.ts:239: @todo(nick-ng): figure out who spoke last. they will leave the stage
- src/lib/opensourceshakespeare-org/utils.ts:39: @todo(nick-ng): what if an unknown character enters with a known character?

- src/lib/opensourceshakespeare-org/compiler.ts:110: @todo(nick-ng): sometimes there is an "Exit." stage direction at the end of a feet
- src/lib/opensourceshakespeare-org/compiler.ts:239: @todo(nick-ng): figure out who spoke last. they will leave the stage
- src/lib/opensourceshakespeare-org/utils.ts:39: @todo(nick-ng): what if an unknown character enters with a known character?

- src/lib/opensourceshakespeare-org/compiler.ts:110: @todo(nick-ng): sometimes there is an "Exit." stage direction at the end of a feet
- src/lib/opensourceshakespeare-org/compiler.ts:239: @todo(nick-ng): figure out who spoke last. they will leave the stage
- src/lib/opensourceshakespeare-org/utils.ts:39: @todo(nick-ng): what if an unknown character enters with a known character?

- src/lib/opensourceshakespeare-org/compiler.ts:110: @todo(nick-ng): sometimes there is an "Exit." stage direction at the end of a feet
- src/lib/opensourceshakespeare-org/compiler.ts:239: @todo(nick-ng): figure out who spoke last. they will leave the stage
- src/lib/opensourceshakespeare-org/utils.ts:39: @todo(nick-ng): what if an unknown character enters with a known character?

- src/lib/opensourceshakespeare-org/compiler.ts:117: @todo(nick-ng): sometimes there is an "Exit." stage direction at the end of a feet
- src/lib/opensourceshakespeare-org/compiler.ts:247: @todo(nick-ng): figure out who spoke last. they will leave the stage
- src/lib/opensourceshakespeare-org/utils.ts:39: @todo(nick-ng): what if an unknown character enters with a known character in the same stage direction?

- src/lib/opensourceshakespeare-org/compiler.ts:119: @todo(nick-ng): sometimes there is an "Exit." stage direction at the end of a feet
- src/lib/opensourceshakespeare-org/utils.ts:41: @todo(nick-ng): what if an unknown character enters with a known character in the same stage direction?

- src/lib/opensourceshakespeare-org/compiler.ts:110: @todo(nick-ng): sometimes there is an "Exit." stage direction at the end of a feet
- src/lib/opensourceshakespeare-org/utils.ts:41: @todo(nick-ng): what if an unknown character enters with a known character in the same stage direction?

- src/lib/opensourceshakespeare-org/compiler.ts:110: @todo(nick-ng): sometimes there is an "Exit." stage direction at the end of a feet
- src/lib/opensourceshakespeare-org/utils.ts:41: @todo(nick-ng): what if an unknown character enters with a known character in the same stage direction?

- src/lib/opensourceshakespeare-org/compiler.ts:110: @todo(nick-ng): sometimes there is an "Exit." stage direction at the end of a feet
- src/lib/opensourceshakespeare-org/utils.ts:41: @todo(nick-ng): what if an unknown character enters with a known character in the same stage direction?

- src/lib/opensourceshakespeare-org/compiler.ts:110: @todo(nick-ng): sometimes there is an "Exit." stage direction at the end of a feet
- src/lib/opensourceshakespeare-org/utils.ts:41: @todo(nick-ng): what if an unknown character enters with a known character in the same stage direction?

- src/lib/opensourceshakespeare-org/compiler.ts:110: @todo(nick-ng): sometimes there is an "Exit." stage direction at the end of a feet
- src/lib/opensourceshakespeare-org/utils.ts:41: @todo(nick-ng): what if an unknown character enters with a known character in the same stage direction?

- src/lib/opensourceshakespeare-org/compiler.ts:110: @todo(nick-ng): sometimes there is an "Exit." stage direction at the end of a feet
- src/lib/opensourceshakespeare-org/utils.ts:41: @todo(nick-ng): what if an unknown character enters with a known character in the same stage direction?
