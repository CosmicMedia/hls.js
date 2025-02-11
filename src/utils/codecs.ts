// from http://mp4ra.org/codecs.html
const sampleEntryCodesISO = {
  audio: {
    fLaC: true, // MP4-RA listed codec entry for FLAC
    flac: true, // legacy browser codec name for FLAC
    FLAC: true, // some manifests may list "FLAC" with Apple's tools
    a3ds: true,
    'ac-3': true,
    'ac-4': true,
    alac: true,
    alaw: true,
    dra1: true,
    'dts+': true,
    'dts-': true,
    dtsc: true,
    dtse: true,
    dtsh: true,
    'ec-3': true,
    enca: true,
    g719: true,
    g726: true,
    m4ae: true,
    mha1: true,
    mha2: true,
    mhm1: true,
    mhm2: true,
    mlpa: true,
    mp4a: true,
    'raw ': true,
    Opus: true,
    opus: true, // browsers expect this to be lowercase despite MP4RA says 'Opus'
    samr: true,
    sawb: true,
    sawp: true,
    sevc: true,
    sqcp: true,
    ssmv: true,
    twos: true,
    ulaw: true,
  },
  video: {
    avc1: true,
    avc2: true,
    avc3: true,
    avc4: true,
    avcp: true,
    av01: true,
    drac: true,
    dva1: true,
    dvav: true,
    dvh1: true,
    dvhe: true,
    encv: true,
    hev1: true,
    hvc1: true,
    mjp2: true,
    mp4v: true,
    mvc1: true,
    mvc2: true,
    mvc3: true,
    mvc4: true,
    resv: true,
    rv60: true,
    s263: true,
    svc1: true,
    svc2: true,
    'vc-1': true,
    vp08: true,
    vp09: true,
  },
  text: {
    stpp: true,
    wvtt: true,
  },
};

export type CodecType = 'audio' | 'video';

const codecsToCheck = ['opus', 'Opus', 'FLAC', 'flac', 'fLaC'];

export function toCompatibleCodec(codecString) {
  if (codecsToCheck.includes(codecString)) {
    return codecString.toLowerCase();
  }

  return codecString;
}

export function isCodecType(codec: string, type: CodecType): boolean {
  const typeCodes = sampleEntryCodesISO[type];
  return (
    !!typeCodes && typeCodes[toCompatibleCodec(codec.slice(0, 4))] === true
  );
}

export function isCodecSupportedInMp4(codec: string, type: CodecType): boolean {
  return MediaSource.isTypeSupported(
    `${type || 'video'}/mp4;codecs="${toCompatibleCodec(codec)}"`
  );
}
