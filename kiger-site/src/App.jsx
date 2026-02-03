import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';

// --- CONFIGURAÇÃO E DADOS ---
const CONTACT_NUMBER = "559491441635";

const ICON_PATHS = {
  Play: "M8 5v14l11-7z",
  Info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  Sun: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  Moon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
  Instagram: "M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z",
  WhatsApp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
  LinkedIn: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
};

const CLIENTS = [
  { id: 7, name: "MAB", logo: "/mab.png" }, { id: 1, name: "UNASP", logo: "/unasp.png" },
  { id: 2, name: "Novo Tempo", logo: "/novotempo.png" }, { id: 3, name: "Prisma", logo: "/prisma.png" },
];

const CATEGORIES = [
  { id: 'all', name: 'Todos' }, { id: 'Casamento', name: 'Casamento' },
  { id: 'Cinema', name: 'Cinema' }, { id: 'Documentário', name: 'Documentário' },
  { id: 'Clipe', name: 'Clipe' }, { id: 'Bastidores', name: 'Bastidores' }
];

const SOCIAL_LINKS = [
  { href: `https://wa.me/${CONTACT_NUMBER}`, label: "WhatsApp", color: "#25D366", path: ICON_PATHS.WhatsApp },
  { href: "https://instagram.com/kiger.br", label: "Instagram", color: "#d62976", path: ICON_PATHS.Instagram },
  { href: "https://www.linkedin.com/in/gabson-sp-405422328/", label: "LinkedIn", color: "#0077b5", path: ICON_PATHS.LinkedIn }
];

const GALLERY_PHOTOS = [
  "https://live.staticflickr.com/65535/54916796397_d1879f5324_w.jpg", "https://live.staticflickr.com/65535/54917876418_063860b510_w.jpg",
  "https://live.staticflickr.com/65535/54917876468_8b06e10cec_w.jpg", "https://live.staticflickr.com/65535/54917959940_f6259cf05f_w.jpg",
  "https://live.staticflickr.com/65535/54917959730_733870d024_w.jpg", "https://live.staticflickr.com/65535/54917655736_ae98dc21ec_w.jpg",
  "https://live.staticflickr.com/65535/54917655671_49ce7d2ba3_w.jpg", "https://live.staticflickr.com/65535/54917909094_600ceb356f_w.jpg",
  "https://live.staticflickr.com/65535/54916794892_140e9281bf_w.jpg", "https://live.staticflickr.com/65535/54917959050_87b0d3ca57_w.jpg",
  "https://live.staticflickr.com/65535/54917958855_67a55349b2_w.jpg", "https://live.staticflickr.com/65535/54916794542_536680eac2_w.jpg",
  "https://live.staticflickr.com/65535/54917874913_5d2a848f79_w.jpg", "https://live.staticflickr.com/65535/54916794672_d8d72ecf09_w.jpg",
  "https://live.staticflickr.com/65535/54917907654_94a61c06d0_w.jpg", "https://live.staticflickr.com/65535/54917957975_b517de8624_w.jpg",
  "https://live.staticflickr.com/65535/54916793987_9a65cf1623.jpg", "https://live.staticflickr.com/65535/54917873843_2eb9ac0d3b_n.jpg",
  "https://live.staticflickr.com/65535/54916793517_ed2da260a5_n.jpg", "https://live.staticflickr.com/65535/54917873763_e38dc9039a_w.jpg",
  "https://live.staticflickr.com/65535/54917873478_a3abd29507_c.jpg", "https://live.staticflickr.com/65535/54917957295_ca448bb721.jpg",
  "https://live.staticflickr.com/65535/54917906454_e1aaa1f0ac_w.jpg", "https://live.staticflickr.com/65535/54916793062_da4fdbdb75.jpg",
  "https://live.staticflickr.com/65535/54917872243_5c9c2f33d0_w.jpg", "https://live.staticflickr.com/65535/54917905499_b741ee4491_n.jpg",
  "https://live.staticflickr.com/65535/54917872803_6d35b7c334_n.jpg", "https://live.staticflickr.com/65535/54917956130_ecedb284e1_w.jpg",
  "https://live.staticflickr.com/65535/54916791402_c6acc61004_n.jpg", "https://live.staticflickr.com/65535/54916791522_6bbc38a487_n.jpg",
  "https://live.staticflickr.com/65535/54916791342_c26791b2a5_w.jpg", "https://live.staticflickr.com/65535/54917904849_aa10cd4509.jpg",
  "https://live.staticflickr.com/65535/54916790572_0c2f5a2a28_w.jpg", "https://live.staticflickr.com/65535/54917904329_f69275b18b_w.jpg",
  "https://live.staticflickr.com/65535/54917954270_2f657c32fc_w.jpg", "https://live.staticflickr.com/65535/54917650546_59dfb6fedd_w.jpg",
  "https://live.staticflickr.com/65535/54917650031_491ee8dba7_w.jpg", "https://live.staticflickr.com/65535/54917869983_6f270f6162_w.jpg",
  "https://live.staticflickr.com/65535/54917869968_0359ee62f1_w.jpg", "https://live.staticflickr.com/65535/54917953760_cd6ed31af3_w.jpg",
  "https://live.staticflickr.com/65535/54916788632_9c18ceda23_w.jpg", "https://live.staticflickr.com/65535/54917902359_9050d3ba4d_w.jpg",
  "https://live.staticflickr.com/65535/54917869073_8102bbe147_n.jpg", "https://live.staticflickr.com/65535/54916788567_17ab39814e_n.jpg",
  "https://live.staticflickr.com/65535/54916787887_c76f5df0fc_w.jpg", "https://live.staticflickr.com/65535/54917901644_1060fa6cc5_w.jpg",
  "https://live.staticflickr.com/65535/54917868453_2af60eab32_w.jpg", "https://live.staticflickr.com/65535/54917901509_58be2f5ccc_w.jpg",
  "https://live.staticflickr.com/65535/54916787502_dde01c8051_w.jpg", "https://live.staticflickr.com/65535/54917951905_4170ce6c2f_w.jpg",
  "https://live.staticflickr.com/65535/54917901199_37939e5035_w.jpg", "https://live.staticflickr.com/65535/54917901219_52b12b1d80_w.jpg",
  "https://live.staticflickr.com/65535/54917867853_ebf7c1d829_w.jpg", "https://live.staticflickr.com/65535/54917951530_142c86ce8a_w.jpg",
  "https://live.staticflickr.com/65535/54916787232_b5fe207468_w.jpg", "https://live.staticflickr.com/65535/54917900634_c7fce2981c_w.jpg",
  "https://live.staticflickr.com/65535/54917951230_d93fb06321_w.jpg", "https://live.staticflickr.com/65535/54916786892_27577e352f_w.jpg",
  "https://live.staticflickr.com/65535/54917950755_9a2fe7c19c_w.jpg", "https://live.staticflickr.com/65535/54916786932_0b00d90034_w.jpg",
  "https://live.staticflickr.com/65535/54917950705_06e4a4b3ea_w.jpg", "https://live.staticflickr.com/65535/54917900069_5236f59ece.jpg",
  "https://live.staticflickr.com/65535/54917646761_3a429c270d_w.jpg", "https://live.staticflickr.com/65535/54916786377_179b576cb3_w.jpg",
  "https://live.staticflickr.com/65535/54917646531_636652aa23_w.jpg", "https://live.staticflickr.com/65535/54917646411_d12d1eb6fd_w.jpg",
  "https://live.staticflickr.com/65535/54917899469_2e67dfeecb_w.jpg", "https://live.staticflickr.com/65535/54916785867_307a47be21_w.jpg",
  "https://live.staticflickr.com/65535/54916785827_3956393b42_w.jpg", "https://live.staticflickr.com/65535/54917898864_9c2647f2b0_w.jpg",
  "https://live.staticflickr.com/65535/54916784917_b5a63bc634_w.jpg", "https://live.staticflickr.com/65535/54917948955_14c6151ca8_w.jpg",
  "https://live.staticflickr.com/65535/54917645296_2433de7a22_w.jpg", "https://live.staticflickr.com/65535/54917898329_f8ecd5d8e7_w.jpg",
  "https://live.staticflickr.com/65535/54917644931_7f1617e348.jpg", "https://live.staticflickr.com/65535/54917897954_9ebf4bc7d3_w.jpg",
  "https://live.staticflickr.com/65535/54916784572_93a40bf2a3_w.jpg", "https://live.staticflickr.com/65535/54917898089_f1e94c1e3a_w.jpg",
  "https://live.staticflickr.com/65535/54917947940_a19eebbd6f_w.jpg", "https://live.staticflickr.com/65535/54917864448_a45f0debf0_w.jpg",
  "https://live.staticflickr.com/65535/54916783942_ccb160e292_w.jpg", "https://live.staticflickr.com/65535/54917897379_34f5672571_w.jpg",
  "https://live.staticflickr.com/65535/54917863988_0cb2100275_w.jpg", "https://live.staticflickr.com/65535/54917643676_57568e4571_w.jpg",
  "https://live.staticflickr.com/65535/54917863468_3c0b8d3aac_w.jpg", "https://live.staticflickr.com/65535/54916783162_766528372c_w.jpg",
  "https://live.staticflickr.com/65535/54917643206_389117145a_w.jpg", "https://live.staticflickr.com/65535/54917946440_e41f74da35_w.jpg",
  "https://live.staticflickr.com/65535/54917643011_ede018afe0_w.jpg", "https://live.staticflickr.com/65535/54917946190_5cb8507c9e_w.jpg",
  "https://live.staticflickr.com/65535/54917895579_0a9bb46609_w.jpg", "https://live.staticflickr.com/65535/54916782052_5452524c55_w.jpg",
  "https://live.staticflickr.com/65535/54916782277_677a69f353_w.jpg", "https://live.staticflickr.com/65535/54917945765_171dc0b5d9_w.jpg",
  "https://live.staticflickr.com/65535/54916781292_86abf750b4.jpg", "https://live.staticflickr.com/65535/54916781387_0ea42f1e64_w.jpg",
  "https://live.staticflickr.com/65535/54917641111_1c9edaceab_w.jpg", "https://live.staticflickr.com/65535/54917944665_5ba65caa68_w.jpg",
  "https://live.staticflickr.com/65535/54916781252_f688320e18_w.jpg", "https://live.staticflickr.com/65535/54916781147_d209ec1f67_w.jpg",
  "https://live.staticflickr.com/65535/54916175449_ffbc8cd5df_w.jpg", "https://live.staticflickr.com/65535/54915065847_5f30852dc5_w.jpg",
  "https://live.staticflickr.com/65535/54915923706_9aebb9a535_w.jpg", "https://live.staticflickr.com/65535/54916136528_dac8f4acf7_w.jpg",
  "https://live.staticflickr.com/65535/54915923666_913ea7a9bd_w.jpg", "https://live.staticflickr.com/65535/54916222555_e5bb31478e_w.jpg",
  "https://live.staticflickr.com/65535/54916141373_5425db457b_w.jpg", "https://live.staticflickr.com/65535/54916136473_170daf7a8b_w.jpg",
  "https://live.staticflickr.com/65535/54915060687_4af50e422a_n.jpg", "https://live.staticflickr.com/65535/54916170264_eb8101bc67_n.jpg",
  "https://live.staticflickr.com/65535/54916175399_1d210ac18f_w.jpg", "https://live.staticflickr.com/65535/54916170184_c55b09ec5a_w.jpg",
  "https://live.staticflickr.com/65535/54916141408_8bfb0685cb_w.jpg", "https://live.staticflickr.com/65535/54916141403_c433401d27_w.jpg",
  "https://live.staticflickr.com/65535/54916136433_ea5c0b1cce_w.jpg", "https://live.staticflickr.com/65535/54916138313_81918ac9e6_w.jpg",
  "https://live.staticflickr.com/65535/54915062617_841da53c80_w.jpg", "https://live.staticflickr.com/65535/54916138273_f9def8d7b6_w.jpg",
  "https://live.staticflickr.com/65535/54916172164_4564db4482_w.jpg", "https://live.staticflickr.com/65535/54916138138_5abe30cb9b_w.jpg",
  "https://live.staticflickr.com/65535/54916172129_78f271ea54_w.jpg", "https://live.staticflickr.com/65535/54915062507_b43aacbb44_w.jpg",
  "https://live.staticflickr.com/65535/54915925136_5d1976fa6b_w.jpg", "https://live.staticflickr.com/65535/54916138073_ca53caef9d_w.jpg",
  "https://live.staticflickr.com/65535/54916224220_eddaba61b3_w.jpg", "https://live.staticflickr.com/65535/54916138018_04d5493370_w.jpg",
  "https://live.staticflickr.com/65535/54915928721_8eae2109eb_w.jpg", "https://live.staticflickr.com/65535/54916137933_97aca94a6d_w.jpg",
  "https://live.staticflickr.com/65535/54915062372_be9d77d703_w.jpg", "https://live.staticflickr.com/65535/54916171914_a31b08923c_w.jpg",
  "https://live.staticflickr.com/65535/54916224145_60ce11bdbb.jpg", "https://live.staticflickr.com/65535/54916137868_51f087af6e_w.jpg",
  "https://live.staticflickr.com/65535/54915924996_7005bde80e_w.jpg", "https://live.staticflickr.com/65535/54915062272_34dc9201b8_w.jpg",
  "https://live.staticflickr.com/65535/54916171824_6081832cdf_w.jpg", "https://live.staticflickr.com/65535/54916171769_9b49513947_w.jpg",
  "https://live.staticflickr.com/65535/54916171749_c0e6e53a2f_w.jpg", "https://live.staticflickr.com/65535/54915062222_d9ea36d242_w.jpg",
  "https://live.staticflickr.com/65535/54915066452_4938dbb167_w.jpg", "https://live.staticflickr.com/65535/54916137768_72220dba5b_w.jpg",
  "https://live.staticflickr.com/65535/54916137723_f4240f94c8_w.jpg", "https://live.staticflickr.com/65535/54915924861_15c5e077ab_w.jpg",
  "https://live.staticflickr.com/65535/54916171644_277e8e8516_w.jpg", "https://live.staticflickr.com/65535/54915924796_4408da4fd3_w.jpg",
  "https://live.staticflickr.com/65535/54915924746_99cf97a6fe_w.jpg", "https://live.staticflickr.com/65535/54916171584_2baac763ef_w.jpg",
  "https://live.staticflickr.com/65535/54916137628_8ffa219708_w.jpg", "https://live.staticflickr.com/65535/54915928761_7f1a6bfa4a_w.jpg",
  "https://live.staticflickr.com/65535/54915928746_0a0eba9c79_w.jpg", "https://live.staticflickr.com/65535/54915924706_a8fbfffd28_w.jpg",
  "https://live.staticflickr.com/65535/54916171494_b78f095171_w.jpg", "https://live.staticflickr.com/65535/54916171469_cbe31c98b2_w.jpg",
  "https://live.staticflickr.com/65535/54916175984_469c92a674_w.jpg", "https://live.staticflickr.com/65535/54916223700_338e7ddb20_w.jpg",
  "https://live.staticflickr.com/65535/54915924646_459a71bd3c_w.jpg", "https://live.staticflickr.com/65535/54915924596_930067b9b2_c.jpg",
  "https://live.staticflickr.com/65535/54915061977_0efab4c85c.jpg", "https://live.staticflickr.com/65535/54916171349_449b1ab553_w.jpg",
  "https://live.staticflickr.com/65535/54916228240_93f8188f82_w.jpg", "https://live.staticflickr.com/65535/54915061937_f387a87540_w.jpg",
  "https://live.staticflickr.com/65535/54916137393_30ba6c2f48_w.jpg", "https://live.staticflickr.com/65535/54916171274_46bb2dccfa_w.jpg",
  "https://live.staticflickr.com/65535/54916228250_794f7d045b_w.jpg", "https://live.staticflickr.com/65535/54916171209_531ff1b06d_w.jpg",
  "https://live.staticflickr.com/65535/54916228195_d60b16affb_n.jpg", "https://live.staticflickr.com/65535/54916137328_b90bf99910_n.jpg",
  "https://live.staticflickr.com/65535/54916171189_62b0368bd0_w.jpg", "https://live.staticflickr.com/65535/54916228170_c49d957edc.jpg",
  "https://live.staticflickr.com/65535/54915924446_38ac44b704_w.jpg", "https://live.staticflickr.com/65535/54916171164_133359e2a0_w.jpg",
  "https://live.staticflickr.com/65535/54916137268_2897b1b7fe_w.jpg", "https://live.staticflickr.com/65535/54916137243_cb58be1325_w.jpg",
  "https://live.staticflickr.com/65535/54916137208_06f10659f1_w.jpg", "https://live.staticflickr.com/65535/54915928621_8cf4e001eb_w.jpg",
  "https://live.staticflickr.com/65535/54915924346_131f2e6b10_w.jpg", "https://live.staticflickr.com/65535/54915924326_3c115fff2c_w.jpg",
  "https://live.staticflickr.com/65535/54916141758_203a84d78a_w.jpg", "https://live.staticflickr.com/65535/54915924276_c60ca21af7_w.jpg",
  "https://live.staticflickr.com/65535/54915928611_0a5e3e649d_w.jpg", "https://live.staticflickr.com/65535/54916228075_f28a421d85_w.jpg",
  "https://live.staticflickr.com/65535/54915061582_060a730901_w.jpg", "https://live.staticflickr.com/65535/54915924176_7f41ac454f_w.jpg",
  "https://live.staticflickr.com/65535/54916223240_86374ca023_w.jpg", "https://live.staticflickr.com/65535/54916137098_3bd800d515_w.jpg",
  "https://live.staticflickr.com/65535/54916170969_8dd36a8fe2.jpg", "https://live.staticflickr.com/65535/54916137003_42f188709c_w.jpg",
  "https://live.staticflickr.com/65535/54915061372_118936db11_w.jpg", "https://live.staticflickr.com/65535/54916170874_575fa79a66_w.jpg",
  "https://live.staticflickr.com/65535/54916228090_7982a18cac_w.jpg", "https://live.staticflickr.com/65535/54916170849_e36b6a5cd7_w.jpg",
  "https://live.staticflickr.com/65535/54916228030_738c01415d_w.jpg", "https://live.staticflickr.com/65535/54916136933_c7a8fc0e67_w.jpg",
  "https://live.staticflickr.com/65535/54915061292_ff0d0da7d3_w.jpg", "https://live.staticflickr.com/65535/54915061277_5fc3dffd98_w.jpg",
  "https://live.staticflickr.com/65535/54915066222_ba347a40db_w.jpg", "https://live.staticflickr.com/65535/54915061222_03bc6430d5_w.jpg",
  "https://live.staticflickr.com/65535/54916222975_a1bb1e3246_w.jpg", "https://live.staticflickr.com/65535/54916136868_63ab6a2956_w.jpg",
  "https://live.staticflickr.com/65535/54916136863_495323e49e_w.jpg", "https://live.staticflickr.com/65535/54915066007_b132d3752b_w.jpg",
  "https://live.staticflickr.com/65535/54915061167_6bd8b4c725_w.jpg", "https://live.staticflickr.com/65535/54916227935_55bd704965.jpg",
  "https://live.staticflickr.com/65535/54915923891_68112fee67_w.jpg", "https://live.staticflickr.com/65535/54915061122_2e025bc612_w.jpg",
  "https://live.staticflickr.com/65535/54916141548_31c9e492b9_w.jpg", "https://live.staticflickr.com/65535/54915928366_cbc1e7979c_w.jpg",
  "https://live.staticflickr.com/65535/54916170554_d539823160_w.jpg", "https://live.staticflickr.com/65535/54916222815_4b13296c27_w.jpg",
  "https://live.staticflickr.com/65535/54916170474_d4dcb707ee_w.jpg", "https://live.staticflickr.com/65535/54916222760_0109f22d84_w.jpg",
  "https://live.staticflickr.com/65535/54916141498_8fae3cca73_w.jpg", "https://live.staticflickr.com/65535/54916170429_103f4b0f34_w.jpg",
  "https://live.staticflickr.com/65535/54915065937_75785c3d6d_w.jpg", "https://live.staticflickr.com/65535/54915060927_b521e11320_w.jpg"
];

// --- SUB-COMPONENTES (MEMO) ---
const CinematicFade = memo(({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>
));

const SocialLink = memo(({ href, label, color, path, isDarkMode }) => (
  <motion.a href={href} target="_blank" className="group flex flex-col items-center gap-3 relative cursor-none" whileHover={{ y: -5 }}>
    <div className={`w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-500 ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'} group-hover:border-transparent group-hover:shadow-[0_0_30px_-10px_var(--glow-color)]`} style={{ "--glow-color": color }}>
      <svg viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 transition-all duration-500 group-hover:scale-110 ${isDarkMode ? 'text-zinc-400 group-hover:text-white' : 'text-zinc-600 group-hover:text-black'}`}><path d={path} /></svg>
    </div>
    <div className="flex flex-col items-center"><span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isDarkMode ? 'text-zinc-500 group-hover:text-white' : 'text-zinc-500 group-hover:text-black'}`}>{label}</span></div>
  </motion.a>
));

const InputField = memo(({ placeholder, isDarkMode, textarea = false, ...props }) => {
  const cls = `w-full bg-white/5 border border-white/10 py-4 px-6 rounded-2xl outline-none text-sm tracking-widest transition-all duration-300 resize-none cursor-none backdrop-blur-md shadow-sm focus:border-white/30 focus:bg-white/10 focus:shadow-lg ${isDarkMode ? 'text-white placeholder-zinc-500' : 'text-black border-black/10 bg-black/5 placeholder-zinc-500 focus:border-black/30'}`;
  return textarea ? <textarea rows="4" placeholder={placeholder} className={cls} {...props} /> : <input type="text" placeholder={placeholder} className={cls} {...props} />;
});

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  // DATABASE VIDEOS
  const portfolioItems = useMemo(() => [
    { id: 1, title: "QUAL É O SEU PROPÓSITO?", category: "Documentário", quality: "4K", url: "https://www.youtube.com/embed/bU2cVO3vUjw", thumb: "https://i.ytimg.com/vi_webp/bU2cVO3vUjw/maxresdefault.webp" },
    { id: 2, title: "Karoline & Winiston", category: "Casamento", quality: "4K", url: "https://www.youtube.com/embed/njXorYxbRfU", thumb: "https://i.ytimg.com/vi_webp/njXorYxbRfU/maxresdefault.webp" },
    { id: 5, title: "O ORÁCULO", category: "Reality Show", quality: "4K", url: "https://www.youtube.com/embed/efa_PSKMHLk", thumb: "https://i.ytimg.com/vi_webp/efa_PSKMHLk/maxresdefault.webp" },
    { id: 3, title: "BÁRBARA", category: "Cinema", quality: "4K", url: "https://www.youtube.com/embed/p6SIYQ2c2Bw", thumb: "https://i.ytimg.com/vi_webp/p6SIYQ2c2Bw/maxresdefault.webp" },
    { id: 4, title: "CICATRIZES", category: "Documentário", quality: "4K", url: "https://www.youtube.com/embed/NwesZCYbSx0", thumb: "https://i.ytimg.com/vi_webp/NwesZCYbSx0/maxresdefault.webp" },
    { id: 9, title: "DELIBERADAMENTE", category: "Clipe", quality: "4K", url: "https://www.youtube.com/embed/xee9PSqsymY", thumb: "https://i.ytimg.com/vi_webp/xee9PSqsymY/maxresdefault.webp" },
    { id: 10, title: "SE ELE NÃO FOR O PRIMEIRO", category: "Clipe", quality: "4K", url: "https://www.youtube.com/embed/ubIyjG5ezLg", thumb: "https://i.ytimg.com/vi_webp/ubIyjG5ezLg/maxresdefault.webp" },
    { id: 22, title: "CHEGOU A HORA", category: "Clipe", quality: "4K", url: "https://www.youtube.com/embed/-jN-1HZuBlQ", thumb: "https://i.ytimg.com/vi_webp/-jN-1HZuBlQ/maxresdefault.webp" },
    { id: 18, title: "HOSPEDANDO ANJOS SEM SABER", category: "Clipe", quality: "HD", url: "https://www.youtube.com/embed/htIKc_vVDt0", thumb: "https://i.ytimg.com/vi_webp/htIKc_vVDt0/maxresdefault.webp" },
    { id: 27, title: "OUÇO O SOM", category: "Clipe", quality: "4K", url: "https://www.youtube.com/embed/Ocdq3_uzO4o", thumb: "https://i.ytimg.com/vi_webp/Ocdq3_uzO4o/maxresdefault.webp" },
    { id: 19, title: "O MELHOR DE MIM", category: "Clipe", quality: "4K", url: "https://www.youtube.com/embed/D43qNYNIIOA", thumb: "https://i.ytimg.com/vi_webp/D43qNYNIIOA/maxresdefault.webp" },
    { id: 25, title: "LEMBRA", category: "Clipe", quality: "4K", url: "https://www.youtube.com/embed/DAglqbQTK4c", thumb: "https://i.ytimg.com/vi_webp/DAglqbQTK4c/maxresdefault.webp" },
    { id: 24, title: "O PESO DAS PALAVRAS", category: "Cinema", quality: "4K", url: "https://www.youtube.com/embed/h5vbvGte3oM", thumb: "https://i.ytimg.com/vi_webp/h5vbvGte3oM/maxresdefault.webp" },
    { id: 16, title: "NÃO ME ENVERGONHO DO EVANGELHIO", category: "Clipe", quality: "HD", url: "https://www.youtube.com/embed/ijf0p0naTcg", thumb: "https://i.ytimg.com/vi_webp/ijf0p0naTcg/maxresdefault.webp" },
    { id: 12, title: "DEUS SABE, DEUS OUVE, DEUS VÊ", category: "Clipe", quality: "HD", url: "https://www.youtube.com/embed/mDa9Jx8_etU", thumb: "https://i.ytimg.com/vi_webp/mDa9Jx8_etU/maxresdefault.webp" },
    { id: 28, title: "SOMENTE A TI", category: "Clipe", quality: "4K", url: "https://www.youtube.com/embed/3QvjBGy1tMo", thumb: "https://i.ytimg.com/vi_webp/3QvjBGy1tMo/maxresdefault.webp" },
    { id: 26, title: "ESTRELA DO SENHOR", category: "Clipe", quality: "HD", url: "https://www.youtube.com/embed/ekMw5K4c8BA", thumb: "https://i.ytimg.com/vi_webp/ekMw5K4c8BA/maxresdefault.webp" },
    { id: 21, title: "ENTREGO A TI", category: "Clipe", quality: "4K", url: "https://www.youtube.com/embed/Z7M1OdEck_8", thumb: "https://i.ytimg.com/vi_webp/Z7M1OdEck_8/maxresdefault.webp" },
    { id: 23, title: "EU, VOCÊ E CRISTO", category: "Cinema", quality: "4K", url: "https://www.youtube.com/embed/tDmjcjyw3cc", thumb: "https://i.ytimg.com/vi_webp/tDmjcjyw3cc/maxresdefault.webp" },
    { id: 11, title: "NOITES TRAIÇOEIRAS", category: "Clipe", quality: "HD", url: "https://www.youtube.com/embed/-BrslQXsbgQ", thumb: "https://i.ytimg.com/vi_webp/-BrslQXsbgQ/maxresdefault.webp" },
    { id: 17, title: "CONHECE DEUS MEU VIVER", category: "Clipe", quality: "HD", url: "https://www.youtube.com/embed/UjLz0SMUHcE", thumb: "https://i.ytimg.com/vi_webp/UjLz0SMUHcE/maxresdefault.webp" },
    { id: 15, title: "CORDEIRO NO ALTAR", category: "Clipe", quality: "HD", url: "https://www.youtube.com/embed/wih6YUYYDJs", thumb: "https://i.ytimg.com/vi_webp/wih6YUYYDJs/maxresdefault.webp" },
    { id: 20, title: "E SE", category: "Clipe", quality: "4K", url: "https://www.youtube.com/embed/wZKhJTfWJjE", thumb: "https://i.ytimg.com/vi_webp/wZKhJTfWJjE/maxresdefault.webp" },
    { id: 8, title: "O ORÁCULO | MAKING OF", category: "Bastidores", quality: "HD", url: "https://www.youtube.com/embed/CZMyydSDaq0", thumb: "https://i.ytimg.com/vi_webp/CZMyydSDaq0/maxresdefault.webp" },
    { id: 6, title: "CICATRIZES | MAKING OF", category: "Bastidores", quality: "HD", url: "https://www.youtube.com/embed/lJT58HZHD7g", thumb: "https://i.ytimg.com/vi_webp/lJT58HZHD7g/maxresdefault.webp" },
    { id: 7, title: "O ORÁCULO | TEASER", category: "Teaser", quality: "4K", url: "https://www.youtube.com/embed/T3tudtTkGuQ", thumb: "https://i.ytimg.com/vi_webp/T3tudtTkGuQ/maxresdefault.webp" },
  ], []);

  // SHUFFLE & INIT LOGIC
  const [shuffledGallery] = useState(() => {
    let array = [...GALLERY_PHOTOS, ...GALLERY_PHOTOS];
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  });

  const [heroItems] = useState(() => {
    let heroArray = [...portfolioItems];
    let currentIndex = heroArray.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [heroArray[currentIndex], heroArray[randomIndex]] = [heroArray[randomIndex], heroArray[currentIndex]];
    }
    return heroArray;
  });

  // TIMER HERO
  useEffect(() => {
    if (heroItems.length === 0) return;
    const interval = setInterval(() => setCurrentHeroIndex(p => (p + 1) % heroItems.length), 14000);
    return () => clearInterval(interval);
  }, [heroItems]);

  const filteredVideos = useMemo(() => selectedCategory === 'all' ? portfolioItems : portfolioItems.filter(v => v.category === selectedCategory), [selectedCategory, portfolioItems]);

  // EVENT LISTENERS
  useEffect(() => {
    const mouseMove = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => { window.removeEventListener("mousemove", mouseMove); window.removeEventListener("scroll", handleScroll); };
  }, [mouseX, mouseY]);

  // HANDLERS
  const handleChange = useCallback((e) => setForm(f => ({ ...f, [e.target.name]: e.target.value })), []);
  const sendToWhatsapp = (e) => {
    e.preventDefault();
    const text = `*NOVO CONTATO SITE KIGER*%0A-----------------------%0A*Nome:* ${form.name}%0A*Email:* ${form.email}%0A*Assunto:* ${form.subject}%0A*Mensagem:* ${form.message}`;
    window.open(`https://wa.me/${CONTACT_NUMBER}?text=${text}`, '_blank');
  };

  const setPtr = useCallback(() => setCursorVariant("pointer"), []);
  const setDef = useCallback(() => setCursorVariant("default"), []);

  return (
    <div className={`min-h-screen font-['Outfit',_sans-serif] selection:bg-pink-500 selection:text-white overflow-x-hidden transition-colors duration-700 ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-white text-zinc-900'}`}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700;900&display=swap'); body, a, button, iframe, input, textarea, .cursor-pointer { cursor: none !important; } .modal-open { cursor: auto !important; } .no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

      {/* CURSOR */}
      {!selectedVideo && (
        <motion.div className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center mix-blend-difference bg-white" style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }} animate={{ height: cursorVariant === "pointer" ? 80 : 20, width: cursorVariant === "pointer" ? 80 : 20, boxShadow: cursorVariant === "pointer" ? "0 0 60px 15px rgba(255, 255, 255, 0.8)" : "0 0 20px 5px rgba(255, 255, 255, 0.4)" }} transition={{ type: "tween", ease: "backOut", duration: 0.2 }}>
          {cursorVariant === "pointer" && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-black"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg></motion.div>}
        </motion.div>
      )}

      {/* NAV CORRIGIDO */}
      <nav className={`fixed top-0 w-full z-50 p-6 flex justify-between items-center transition-all duration-700 backdrop-blur-md ${scrolled ? (isDarkMode ? 'bg-black/40 shadow-xl' : 'bg-white/40 shadow-xl') : 'bg-transparent'}`}>
        <img src="/kiger.png" alt="KIGER" className={`h-8 md:h-9 w-auto cursor-none transition-all duration-500 object-contain ${isDarkMode ? 'mix-blend-screen' : 'invert mix-blend-multiply'}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} onMouseEnter={setPtr} onMouseLeave={setDef} decoding="async" />
        <div className="flex items-center gap-6">
          <div className={`hidden md:flex gap-2 px-2 py-2 rounded-full border backdrop-blur-xl transition-all duration-500 shadow-lg ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
            {['Portfolio', 'Sobre', 'Contato'].map(item => (
              <a
                key={item}
                href={`#${item === 'Portfolio' ? 'work' : item === 'Sobre' ? 'about' : 'contato'}`}
                className={`px-6 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all duration-300 hover:scale-105 ${isDarkMode ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/5'}`}
                onMouseEnter={setPtr}
                onMouseLeave={setDef}
              >
                {item}
              </a>
            ))}
          </div>
          <button onClick={() => setIsDarkMode(!isDarkMode)} onMouseEnter={setPtr} onMouseLeave={setDef} className={`relative w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all duration-500 cursor-none shadow-lg hover:scale-105 ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-black/5 border-black/10 text-black hover:bg-black/5'}`}>
            <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 absolute inset-0 m-auto" variants={{ dark: { rotate: 90, scale: 0, opacity: 0 }, light: { rotate: 0, scale: 1, opacity: 1 } }} initial={isDarkMode ? "dark" : "light"} animate={isDarkMode ? "dark" : "light"} transition={{ type: "spring", stiffness: 200, damping: 15 }}><path d={ICON_PATHS.Sun} /></motion.svg>
            <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5 absolute inset-0 m-auto" variants={{ dark: { rotate: 0, scale: 1, opacity: 1 }, light: { rotate: -90, scale: 0, opacity: 0 } }} initial={isDarkMode ? "dark" : "light"} animate={isDarkMode ? "dark" : "light"} transition={{ type: "spring", stiffness: 200, damping: 15 }}><path d={ICON_PATHS.Moon} /></motion.svg>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          {heroItems.length > 0 && (
            <motion.div key={currentHeroIndex} className="absolute inset-0 w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
              <motion.img src={heroItems[currentHeroIndex].thumb} className="w-full h-full object-cover opacity-70" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 14, ease: "linear" }} decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 z-10 max-w-5xl h-full pb-20 md:pb-0">
          <AnimatePresence mode="wait">
            {heroItems.length > 0 && (
              <motion.div key={currentHeroIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex flex-col gap-6 items-start">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase drop-shadow-2xl leading-tight max-w-lg">{heroItems[currentHeroIndex].title}</h1>
                <div className="flex items-center gap-4 text-sm font-medium text-white/90 tracking-widest uppercase"><span>2026</span><span className="text-zinc-500">|</span><span>{heroItems[currentHeroIndex].category}</span><span className="text-zinc-500">|</span><span className="border border-white/20 px-2 py-0.5 rounded text-[10px]">{heroItems[currentHeroIndex].quality}</span></div>
                <p className="text-white/60 max-w-lg text-sm md:text-base font-light leading-relaxed">Uma produção audiovisual com a assinatura KIGER. Mergulhe em narrativas visuais que transformam momentos em cinema.</p>
                <div className="flex items-center gap-4 mt-4">
                  <button onClick={() => setSelectedVideo(heroItems[currentHeroIndex])} className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded-md font-bold hover:bg-white/90 transition-colors uppercase tracking-widest text-xs shadow-xl" onMouseEnter={setPtr} onMouseLeave={setDef}><svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d={ICON_PATHS.Play} /></svg>Assistir</button>
                  <button onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-8 py-3 rounded-md font-bold backdrop-blur-xl hover:bg-white/20 hover:scale-105 transition-all duration-300 uppercase tracking-widest text-xs shadow-lg" onMouseEnter={setPtr} onMouseLeave={setDef}><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICON_PATHS.Info} /></svg>Mais Info</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CLIENTES */}
      <section className="py-24 overflow-hidden relative z-10 group select-none bg-transparent">
        <div className="absolute inset-0 pointer-events-none z-20" style={{ background: `linear-gradient(90deg, ${isDarkMode ? '#050505' : '#ffffff'} 0%, transparent 20%, transparent 80%, ${isDarkMode ? '#050505' : '#ffffff'} 100%)` }}></div>
        <div className="flex w-full">
          {[1, 2].map((_, idx) => (
            <motion.div key={idx} initial={{ x: 0 }} animate={{ x: "-100%" }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} style={{ willChange: "transform" }} className="flex gap-32 pr-32 flex-shrink-0 items-center group-hover:[animation-play-state:paused]">
              {CLIENTS.map((client) => (<img key={`${idx}-${client.id}`} src={client.logo} alt={client.name} decoding="async" loading="lazy" className={`h-16 md:h-24 w-auto object-contain opacity-50 group-hover:opacity-100 transition-all duration-500 cursor-none ${isDarkMode ? 'brightness-0 invert hover:brightness-100 hover:invert-0' : 'brightness-0 hover:filter-none'}`} />))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="work" className="py-20 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} onMouseEnter={setPtr} onMouseLeave={setDef} className={`px-8 py-3 rounded-full text-[9px] uppercase font-bold tracking-widest transition-all duration-300 cursor-none backdrop-blur-xl border shadow-lg hover:scale-105 ${selectedCategory === cat.id ? (isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black') : (isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-black/5 border-black/10 text-black hover:bg-black/10')}`}>{cat.name}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((item, i) => (
            <CinematicFade key={item.id} delay={i % 3 * 0.1}>
              <div className={`group relative aspect-video overflow-hidden rounded-[40px] cursor-none shadow-2xl transition-all duration-700 border backdrop-blur-sm ${isDarkMode ? 'bg-zinc-900/50 border-white/10 shadow-white/5' : 'bg-zinc-200/50 border-black/10 shadow-black/5'}`} onMouseEnter={setPtr} onMouseLeave={setDef} onClick={() => setSelectedVideo(item)}>
                <img src={item.thumb} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-60 grayscale group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end"><span className="text-[8px] font-bold text-zinc-400 tracking-[0.3em] uppercase">{item.category}</span><h3 className="text-lg font-bold tracking-tight text-white">{item.title}</h3></div>
              </div>
            </CinematicFade>
          ))}
        </div>
      </section>

      {/* GALERIA LENS */}
      <section className="py-32 px-6 overflow-hidden relative group">
        <CinematicFade>
          <div className="max-w-[1400px] mx-auto mb-12 flex items-end justify-between cursor-none" onClick={() => setIsGalleryOpen(true)} onMouseEnter={setPtr} onMouseLeave={setDef}>
            <div><span className={`inline-block px-3 py-1 border rounded-full text-[9px] uppercase tracking-[0.2em] mb-4 ${isDarkMode ? 'border-white/20 text-zinc-400' : 'border-black/20 text-zinc-600'}`}>Fotografia</span><h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Lens<span className="text-zinc-500">.</span></h2><span className="text-[9px] text-zinc-500 tracking-widest mt-2 block">[ CLIQUE PARA VER A GALERIA COMPLETA ]</span></div>
          </div>
        </CinematicFade>
        <div className="flex w-full overflow-hidden" onClick={() => setIsGalleryOpen(true)} onMouseEnter={setPtr} onMouseLeave={setDef}>
          <motion.div className="flex gap-4" animate={{ x: ["0%", "-100%"] }} style={{ willChange: "transform" }} transition={{ duration: 4000, repeat: Infinity, ease: "linear" }}>
            {shuffledGallery.map((src, index) => (<div key={index} className="relative w-[300px] md:w-[400px] aspect-[4/5] flex-shrink-0 rounded-2xl overflow-hidden cursor-none"><img src={src} loading="lazy" decoding="async" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 hover:scale-110" alt={`Gallery ${index}`} /></div>))}
          </motion.div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="about" className={`py-40 px-6 backdrop-blur-3xl transition-colors duration-700 ${isDarkMode ? 'bg-zinc-950/20' : 'bg-zinc-100/50'}`}>
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <CinematicFade>
            <div className={`relative aspect-square rounded-[60px] overflow-hidden border group transition-colors duration-700 cursor-none ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
              <img src="/gabson.jpg" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Founder" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
              <div className="absolute bottom-8 right-8">
                <motion.a href="https://instagram.com/gabsonnn" target="_blank" whileHover={{ scale: 1.1 }} className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-xl border shadow-lg transition-all cursor-none ${isDarkMode ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-black/10 border-black/20 text-black hover:bg-black/20'}`} onMouseEnter={setPtr} onMouseLeave={setDef}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d={ICON_PATHS.Instagram} /></svg>
                </motion.a>
              </div>
            </div>
          </CinematicFade>
          <div className="space-y-8">
            <CinematicFade delay={0.2}>
              <h3 className="text-6xl font-black tracking-tighter uppercase italic">Gabson Silva<span className="text-zinc-500">.</span></h3>
              <p className="text-zinc-500 text-lg leading-relaxed font-light">Diretor e editor focado em narrativas visuais que fogem do comum. A KIGER é o reflexo de uma busca incessante pela estética perfeita e pelo impacto emocional.</p>
            </CinematicFade>
          </div>
        </div>
      </section>

      {/* CONTATO - RODA-PE CORRIGIDO */}
      <section id="contato" className={`relative py-32 px-6 overflow-hidden transition-all duration-700 ${isDarkMode ? 'bg-[#050505] shadow-[0_-10px_40px_-10px_rgba(255,255,255,0.05)]' : 'bg-[#ffffff] shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)]'}`}>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] blur-[150px] rounded-full pointer-events-none opacity-50 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}></div>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-24 mb-24">
            <div className="space-y-12">
              <div className="space-y-6"><span className={`inline-block px-3 py-1 border rounded-full text-[9px] uppercase tracking-[0.2em] ${isDarkMode ? 'border-white/20 text-zinc-400' : 'border-black/20 text-zinc-600'}`}>Contato</span><h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9]">VAMOS CRIAR<br /><span className="text-zinc-500">ALGO ÚNICO?</span></h2></div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-md">Tem um projeto em mente? Preencha o formulário ao lado ou nos chame nas redes sociais. Estamos prontos para elevar o nível da sua produção.</p>
              <div className="flex gap-8">
                {SOCIAL_LINKS.map((social, i) => (<div key={i} onMouseEnter={setPtr} onMouseLeave={setDef}><SocialLink isDarkMode={isDarkMode} {...social} /></div>))}
              </div>
            </div>
            <form className="space-y-8" onSubmit={sendToWhatsapp}>
              <div className="grid grid-cols-2 gap-8"><div onMouseEnter={setPtr} onMouseLeave={setDef}><InputField name="name" placeholder="NOME" isDarkMode={isDarkMode} value={form.name} onChange={handleChange} /></div><div onMouseEnter={setPtr} onMouseLeave={setDef}><InputField name="email" placeholder="E-MAIL" type="email" isDarkMode={isDarkMode} value={form.email} onChange={handleChange} /></div></div>
              <div onMouseEnter={setPtr} onMouseLeave={setDef}><InputField name="subject" placeholder="ASSUNTO" isDarkMode={isDarkMode} value={form.subject} onChange={handleChange} /></div>
              <div onMouseEnter={setPtr} onMouseLeave={setDef}><InputField name="message" placeholder="SUA MENSAGEM" textarea isDarkMode={isDarkMode} value={form.message} onChange={handleChange} /></div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onMouseEnter={setPtr} onMouseLeave={setDef} className={`w-full py-4 uppercase font-bold tracking-[0.3em] text-[10px] border backdrop-blur-xl shadow-lg transition-all duration-300 cursor-none rounded-xl ${isDarkMode ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-black/10 border-black/20 text-black hover:bg-black/20'}`}>Enviar Mensagem</motion.button>
            </form>
          </div>
          <div className="text-center mb-20"><a href="mailto:contato@kiger.com" onMouseEnter={setPtr} onMouseLeave={setDef} className="group relative inline-block text-3xl md:text-6xl font-black tracking-tighter transition-colors hover:text-zinc-500 cursor-none break-all">CONTATO<span className="text-zinc-500 group-hover:text-zinc-400 transition-colors">@</span>KIGER.COM<span className={`absolute bottom-0 left-0 w-full h-[2px] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out ${isDarkMode ? 'bg-white' : 'bg-black'}`}></span></a></div>
          <div className="flex flex-col md:flex-row justify-between items-end"><div className="flex flex-col gap-2"><span className={isDarkMode ? 'text-white' : 'text-zinc-900'}>São Paulo, BR</span><span className="text-zinc-500 text-[10px] tracking-widest">DISPONÍVEL GLOBALMENTE</span></div><div className="text-right mt-12 md:mt-0"><span className="text-zinc-500 font-bold block">© 2026 KIGER</span><span className="text-zinc-600 text-[8px] uppercase tracking-widest">Todos os direitos reservados</span></div></div>
        </div>
      </section>

      {/* MODALS */}
      <AnimatePresence>{selectedVideo && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 md:p-12 cursor-auto modal-open" onClick={() => setSelectedVideo(null)}><motion.div initial={{ scale: 0.9, filter: 'blur(20px)' }} animate={{ scale: 1, filter: 'blur(0px)' }} className="w-full max-w-6xl aspect-video rounded-[40px] overflow-hidden shadow-2xl bg-black" onClick={e => e.stopPropagation()}><iframe src={`${selectedVideo.url}?autoplay=1&rel=0&showinfo=0`} className="w-full h-full" allowFullScreen loading="lazy" /></motion.div><button className="absolute top-8 right-8 text-[10px] font-black tracking-widest uppercase text-white hover:text-red-500 transition-colors" onClick={() => setSelectedVideo(null)}>[ Fechar ]</button></motion.div>)}</AnimatePresence>

      {/* GALERIA MODAL */}
      <AnimatePresence>{isGalleryOpen && (<motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className={`fixed inset-0 z-[200] overflow-y-auto no-scrollbar ${isDarkMode ? 'bg-black' : 'bg-white'}`}><div className="min-h-screen p-6 md:p-12"><div className="flex justify-between items-center mb-12 sticky top-0 z-50 py-4 backdrop-blur-md"><h2 className={`text-2xl font-black tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>LENS<span className="text-zinc-500">.</span></h2><button onClick={() => setIsGalleryOpen(false)} className={`text-[10px] font-bold tracking-widest uppercase border px-6 py-2 rounded-full transition-all backdrop-blur-xl ${isDarkMode ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-black/10 border-black/20 text-black hover:bg-black/20'}`} onMouseEnter={setPtr} onMouseLeave={setDef}>Fechar Galeria</button></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{shuffledGallery.map((src, index) => (<motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index % 3 * 0.1 }} className="relative group aspect-[4/5] rounded-xl overflow-hidden cursor-none" onMouseEnter={setPtr} onMouseLeave={setDef}><img src={src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Gallery ${index}`} loading="lazy" decoding="async" /><div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500 pointer-events-none"></div></motion.div>))}</div><div className="mt-20 text-center"><p className="text-zinc-500 text-[10px] tracking-widest uppercase">Fim da Galeria</p></div></div></motion.div>)}</AnimatePresence>
    </div>
  );
}