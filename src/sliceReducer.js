// slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    data: null,
    loading: false,
    error: null,
    INDICATORS : ['Moving Average','Relative Strength Index','MACD','Bollinger Bands','Doji','Hammer','Shooting star','Engulfing Pattern','Harami','Morning star','Evening Star'],
    USER_INDICATORS : ['Moving Average'],
    US_STOCKS : ['A', 'AA', 'AACG', 'AACI', 'AACIW', 'AACT', 'AADI', 'AAGR', 'AAGRW', 'AAL', 'AAMC', 'AAME', 'AAN', 'AAOI', 'AAON', 'AAP', 'AAPL', 'AAT', 'AB', 'ABAT', 'ABBV', 'ABCB', 'ABCL', 'ABEO', 'ABEV', 'ABG', 'ABIO', 'ABL', 'ABLLL', 'ABLLW', 'ABLV', 'ABM', 'ABNB', 'ABOS', 'ABR', 'ABSI', 'ABT', 'ABTS', 'ABUS', 'ABVC', 'ABVX', 'AC', 'ACA', 'ACABW', 'ACAC', 'ACACU', 'ACAD', 'ACB', 'ACBA', 'ACBAU', 'ACCD', 'ACCO', 'ACDC', 'ACEL', 'ACET', 'ACGL', 'ACGLN', 'ACGLO', 'ACHC', 'ACHL', 'ACHR', 'ACHV', 'ACI', 'ACIC', 'ACIU', 'ACIW', 'ACLS', 'ACLX', 'ACM', 'ACMR', 'ACN', 'ACNB', 'ACNT', 'ACON', 'ACONW', 'ACP', 'ACR', 'ACRE', 'ACRS', 'ACRV', 'ACST', 'ACT', 'ACTG', 'ACU', 'ACV', 'ACVA', 'ACXP', 'ADAG', 'ADAP', 'ADBE', 'ADC', 'ADCT', 'ADD', 'ADEA', 'ADI', 'ADIL', 'ADM', 'ADMA', 'ADN', 'ADNT', 'ADNWW', 'ADP', 'ADPT', 'ADRT', 'ADSE', 'ADSEW', 'ADSK', 'ADT', 'ADTH', 'ADTHW', 'ADTN', 'ADTX', 'ADUS', 'ADV', 'ADVM', 'ADVWW', 'ADX', 'ADXN', 'AE', 'AEAE', 'AEAEW', 'AEE', 'AEF', 'AEFC', 'AEG', 'AEHL', 'AEHR', 'AEI', 'AEIS', 'AEL', 'AEM', 'AEMD', 'AENT', 'AENTW', 'AEO', 'AEON', 'AEP', 'AER', 'AERT', 'AERTW', 'AES', 'AESI', 'AEVA', 'AEYE', 'AEZS', 'AFAR', 'AFARW', 'AFB', 'AFBI', 'AFCG', 'AFG', 'AFGB', 'AFGC', 'AFGD', 'AFGE', 'AFIB', 'AFJK', 'AFJKU', 'AFL', 'AFMD', 'AFRI', 'AFRIW', 'AFRM', 'AFT', 'AFYA', 'AG', 'AGAE', 'AGBA', 'AGBAW', 'AGCO', 'AGD', 'AGEN', 'AGFY', 'AGI', 'AGIO', 'AGL', 'AGM', 'AGMH', 'AGNC', 'AGNCL', 'AGNCM', 'AGNCN', 'AGNCO', 'AGNCP', 'AGO', 'AGR', 'AGRI', 'AGRIW', 'AGRO', 'AGS', 'AGTI', 'AGX', 'AGYS', 'AHCO', 'AHG', 'AHH', 'AHL', 'AHR', 'AHT', 'AI', 'AIB', 'AIF', 'AIG', 'AIH', 'AIHS', 'AILE', 'AILEW', 'AIM', 'AIMAU', 'AIMBU', 'AIMD', 'AIN', 'AINC', 'AIO', 'AIP', 'AIR', 'AIRC', 'AIRE', 'AIRG', 'AIRI', 'AIRJ', 'AIRJW', 'AIRS', 'AIRT', 'AIRTP', 'AISP', 'AISPW', 'AIT', 'AITR', 'AITRR', 'AITRU', 'AIU', 'AIV', 'AIXI', 'AIZ', 'AIZN', 'AJG', 'AJX', 'AKA', 'AKAM', 'AKAN', 'AKBA', 'AKLI', 'AKO', 'AKR', 'AKRO', 'AKTS', 'AKTX', 'AKYA', 'AL', 'ALAB', 'ALAR', 'ALB', 'ALBT', 'ALC', 'ALCC', 'ALCE', 'ALCO', 'ALCY', 'ALCYW', 'ALDX', 'ALE', 'ALEC', 'ALEX', 'ALG', 'ALGM', 'ALGN', 'ALGS', 'ALGT', 'ALHC', 'ALIM', 'ALIT', 'ALK', 'ALKS', 'ALKT', 'ALL', 'ALLE', 'ALLG', 'ALLK', 'ALLO', 'ALLR', 'ALLT', 'ALLY', 'ALNT', 'ALNY', 'ALOT', 'ALPN', 'ALPP', 'ALRM', 'ALRN', 'ALRS', 'ALSA', 'ALSAR', 'ALSAU', 'ALSN', 'ALT', 'ALTG', 'ALTI', 'ALTM', 'ALTO', 'ALTR', 'ALUR', 'ALV', 'ALVO', 'ALVOW', 'ALVR', 'ALX', 'ALXO', 'ALZN', 'AM', 'AMAL', 'AMAT', 'AMBA', 'AMBC', 'AMBI', 'AMBO', 'AMBP', 'AMC', 'AMCR', 'AMCX', 'AMD', 'AME', 'AMED', 'AMG', 'AMGN', 'AMH', 'AMIX', 'AMK', 'AMKR', 'AMLI', 'AMLX', 'AMN', 'AMP', 'AMPG', 'AMPH', 'AMPL', 'AMPS', 'AMPX', 'AMPY', 'AMR', 'AMRC', 'AMRK', 'AMRN', 'AMRX', 'AMS', 'AMSC', 'AMSF', 'AMST', 'AMSWA', 'AMT', 'AMTB', 'AMTD', 'AMTX', 'AMWD', 'AMWL', 'AMX', 'AMZN', 'AN', 'ANAB', 'ANDE', 'ANEB', 'ANET', 'ANF', 'ANGH', 'ANGHW', 'ANGI', 'ANGO', 'ANIK', 'ANIP', 'ANIX', 'ANL', 'ANNX', 'ANRO', 'ANSC', 'ANSCU', 'ANSCW', 'ANSS', 'ANTE', 'ANTX', 'ANVS', 'ANY', 'AOD', 'AOGO', 'AOGOW', 'AOMR', 'AON', 'AONC', 'AONCW', 'AORT', 'AOS', 'AOSL', 'AOUT', 'AP', 'APA', 'APAM', 'APCA', 'APCX', 'APCXW', 'APD', 'APDN', 'APEI', 'APG', 'APGE', 'APH', 'API', 'APLD', 'APLE', 'APLM', 'APLS', 'APLT', 'APM', 'APO', 'APOG', 'APOS', 'APP', 'APPF', 'APPN', 'APPS', 'APRE', 'APT', 'APTO', 'APTV', 'APVO', 'APWC', 'APXI', 'APXIW', 'APYX', 'AQB', 'AQMS', 'AQN', 'AQNB', 'AQNU', 'AQST', 'AQU', 'AR', 'ARAY', 'ARBB', 'ARBE', 'ARBEW', 'ARBK', 'ARBKL', 'ARC', 'ARCB', 'ARCC', 'ARCH', 'ARCO', 'ARCT', 'ARDC', 'ARDX', 'ARE', 'AREB', 'AREBW', 'AREC', 'AREN', 'ARES', 'ARGD', 'ARGO', 'ARGX', 'ARHS', 'ARI', 'ARIS', 'ARKO', 'ARKOW', 'ARKR', 'ARL', 'ARLO', 'ARLP', 'ARM', 'ARMK', 'ARMN', 'ARMP', 'AROC', 'AROW', 'ARQ', 'ARQQ', 'ARQQW', 'ARQT', 'ARR', 'ARRY', 'ARTL', 'ARTLW', 'ARTNA', 'ARTW', 'ARVN', 'ARW', 'ARWR', 'ARYD', 'AS', 'ASA', 'ASAI', 'ASAN', 'ASB', 'ASBA', 'ASC', 'ASCB', 'ASCBR', 'ASCBW', 'ASG', 'ASGI', 'ASGN', 'ASH', 'ASIX', 'ASLE', 'ASLN', 'ASM', 'ASMB', 'ASML', 'ASND', 'ASNS', 'ASO', 'ASPI', 'ASPN', 'ASPS', 'ASR', 'ASRT', 'ASRV', 'ASST', 'ASTC', 'ASTE', 'ASTH', 'ASTI', 'ASTL', 'ASTLW', 'ASTR', 'ASTS', 'ASTSW', 'ASUR', 'ASX', 'ASXC', 'ASYS', 'ATAI', 'ATAT', 'ATCH', 'ATCO', 'ATCOL', 'ATEC', 'ATEK', 'ATEN', 'ATER', 'ATEX', 'ATGE', 'ATGL', 'ATH', 'ATHA', 'ATHE', 'ATHM', 'ATHS', 'ATI', 'ATIF', 'ATIP', 'ATKR', 'ATLC', 'ATLCL', 'ATLCP', 'ATLCZ', 'ATLO', 'ATLX', 'ATMCW', 'ATMU', 'ATMV', 'ATMVR', 'ATNF', 'ATNFW', 'ATNI', 'ATNM', 'ATO', 'ATOM', 'ATOS', 'ATPC', 'ATR', 'ATRA', 'ATRC', 'ATRI', 'ATRO', 'ATS', 'ATSG', 'ATUS', 'ATXG', 'ATXI', 'ATXS', 'AU', 'AUB', 'AUBN', 'AUDC', 'AUGX', 'AUID', 'AULT', 'AUMN', 'AUNA', 'AUPH', 'AUR', 'AURA', 'AUROW', 'AUST', 'AUTL', 'AUUD', 'AUUDW', 'AUVI', 'AUVIP', 'AVA', 'AVAH', 'AVAL', 'AVAV', 'AVB', 'AVBP', 'AVD', 'AVDL', 'AVDX', 'AVGO', 'AVGR', 'AVIR', 'AVK', 'AVNS', 'AVNT', 'AVNW', 'AVO', 'AVPT', 'AVPTW', 'AVRO', 'AVT', 'AVTE', 'AVTR', 'AVTX', 'AVXL', 'AVY', 'AWF', 'AWH', 'AWI', 'AWIN', 'AWINW', 'AWK', 'AWP', 'AWR', 'AWRE', 'AWX', 'AX', 'AXDX', 'AXGN', 'AXIL', 'AXL', 'AXNX', 'AXON', 'AXP', 'AXR', 'AXS', 'AXSM', 'AXTA', 'AXTI', 'AY', 'AYI', 'AYRO', 'AYTU', 'AZ', 'AZEK', 'AZN', 'AZO', 'AZPN', 'AZTA', 'AZTR', 'AZUL', 'AZZ', 'B', 'BA', 'BABA', 'BAC', 'BACA', 'BACK', 'BAER', 'BAERW', 'BAFN', 'BAH', 'BAK', 'BALL', 'BALY', 'BAM', 'BANC', 'BAND', 'BANF', 'BANFP', 'BANL', 'BANR', 'BANX', 'BAOS', 'BAP', 'BARK', 'BASE', 'BATL', 'BATRA', 'BATRK', 'BAX', 'BAYA', 'BAYAR', 'BB', 'BBAI', 'BBAR', 'BBCP', 'BBD', 'BBDC', 'BBDO', 'BBGI', 'BBIO', 'BBLG', 'BBLGW', 'BBN', 'BBSI', 'BBU', 'BBUC', 'BBVA', 'BBW', 'BBWI', 'BBY', 'BC', 'BCAB', 'BCAL', 'BCAN', 'BCAT', 'BCBP', 'BCC', 'BCDA', 'BCE', 'BCG', 'BCGWW', 'BCH', 'BCLI', 'BCML', 'BCO', 'BCOV', 'BCOW', 'BCPC', 'BCRX', 'BCS', 'BCSA', 'BCSAU', 'BCSAW', 'BCSF', 'BCTX', 'BCTXW', 'BCV', 'BCX', 'BCYC', 'BDC', 'BDJ', 'BDL', 'BDN', 'BDRX', 'BDSX', 'BDTX', 'BDX', 'BE', 'BEAM', 'BEAT', 'BEATW', 'BECN', 'BEDU', 'BEEM', 'BEEP', 'BEKE', 'BELFA', 'BELFB', 'BEN', 'BENF', 'BENFW', 'BEP', 'BEPC', 'BEPH', 'BEPI', 'BEPJ', 'BERY', 'BEST', 'BETR', 'BETRW', 'BF', 'BFAC', 'BFAM', 'BFC', 'BFH', 'BFI', 'BFIIW', 'BFIN', 'BFK', 'BFLY', 'BFRG', 'BFRGW', 'BFRI', 'BFRIW', 'BFS', 'BFST', 'BFZ', 'BG', 'BGB', 'BGC', 'BGFV', 'BGH', 'BGI', 'BGLC', 'BGNE', 'BGR', 'BGS', 'BGSF', 'BGT', 'BGX', 'BGXX', 'BGY', 'BH', 'BHAC', 'BHAT', 'BHB', 'BHC', 'BHE', 'BHF', 'BHFAL', 'BHFAM', 'BHFAN', 'BHFAO', 'BHFAP', 'BHIL', 'BHK', 'BHLB', 'BHM', 'BHP', 'BHR', 'BHRB', 'BHV', 'BHVN', 'BIAF', 'BIAFW', 'BIDU', 'BIG', 'BIGC', 'BIGZ', 'BIIB', 'BILI', 'BILL', 'BIMI', 'BIO', 'BIOL', 'BIOR', 'BIOX', 'BIP', 'BIPC', 'BIPH', 'BIPI', 'BIRD', 'BIRK', 'BIT', 'BITE', 'BITF', 'BIVI', 'BJ', 'BJDX', 'BJRI', 'BK', 'BKD', 'BKDT', 'BKE', 'BKH', 'BKHAU', 'BKKT', 'BKN', 'BKNG', 'BKR', 'BKSY', 'BKT', 'BKTI', 'BKU', 'BKYI', 'BL', 'BLAC', 'BLACR', 'BLBD', 'BLBX', 'BLCO', 'BLD', 'BLDE', 'BLDEW', 'BLDP', 'BLDR', 'BLE', 'BLEU', 'BLEUW', 'BLFS', 'BLFY', 'BLIN', 'BLK', 'BLKB', 'BLMN', 'BLND', 'BLNK', 'BLRX', 'BLTE', 'BLUA', 'BLUE', 'BLW', 'BLX', 'BLZE', 'BMA', 'BMBL', 'BME', 'BMEA', 'BMEZ', 'BMI', 'BML', 'BMN', 'BMO', 'BMR', 'BMRA', 'BMRC', 'BMRN', 'BMTX', 'BMY', 'BN', 'BNAI', 'BNAIW', 'BNED', 'BNGO', 'BNH', 'BNIX', 'BNIXR', 'BNJ', 'BNL', 'BNOX', 'BNR', 'BNRE', 'BNRG', 'BNS', 'BNTC', 'BNTX', 'BNY', 'BNZI', 'BNZIW', 'BOC', 'BOCN', 'BODI', 'BOE', 'BOF', 'BOH', 'BOKF', 'BOLD', 'BOLT', 'BON', 'BOOM', 'BOOT', 'BORR', 'BOSC', 'BOTJ', 'BOWL', 'BOWN', 'BOWNU', 'BOX', 'BOXL', 'BP', 'BPMC', 'BPOP', 'BPOPM', 'BPRN', 'BPT', 'BPTH', 'BPYPM', 'BPYPN', 'BPYPO', 'BPYPP', 'BQ', 'BR', 'BRAC', 'BRACR', 'BRAG', 'BRBR', 'BRBS', 'BRC', 'BRCC', 'BRDG', 'BREA', 'BREZ', 'BREZR', 'BREZW', 'BRFH', 'BRFS', 'BRID', 'BRK', 'BRKH', 'BRKHU', 'BRKHW', 'BRKL', 'BRKR', 'BRLS', 'BRLSW', 'BRLT', 'BRN', 'BRNS', 'BRO', 'BROG', 'BROGW', 'BROS', 'BRP', 'BRSH', 'BRSHW', 'BRSP', 'BRT', 'BRTX', 'BRW', 'BRX', 'BRY', 'BRZE', 'BSAC', 'BSBK', 'BSBR', 'BSET', 'BSFC', 'BSGM', 'BSIG', 'BSL', 'BSM', 'BSRR', 'BST', 'BSTZ', 'BSVN', 'BSX', 'BSY', 'BTA', 'BTAI', 'BTBD', 'BTBDW', 'BTBT', 'BTCM', 'BTCS', 'BTCT', 'BTCTW', 'BTCY', 'BTDR', 'BTE', 'BTG', 'BTI', 'BTM', 'BTMD', 'BTMWW', 'BTO', 'BTOG', 'BTSG', 'BTSGU', 'BTT', 'BTTR', 'BTU', 'BTZ', 'BUD', 'BUI', 'BUJA', 'BUJAR', 'BUR', 'BURL', 'BURU', 'BUSE', 'BV', 'BVFL', 'BVN', 'BVS', 'BW', 'BWA', 'BWAQ', 'BWAQW', 'BWAY', 'BWB', 'BWBBP', 'BWEN', 'BWFG', 'BWG', 'BWLP', 'BWMN', 'BWMX', 'BWNB', 'BWSN', 'BWXT', 'BX', 'BXC', 'BXMT', 'BXMX', 'BXP', 'BXSL', 'BY', 'BYD', 'BYFC', 'BYM', 'BYND', 'BYNO', 'BYNOU', 'BYON', 'BYRN', 'BYSI', 'BYU', 'BZ', 'BZFD', 'BZFDW', 'BZH', 'BZUN', 'C', 'CAAP', 'CAAS', 'CABA', 'CABO', 'CAC', 'CACC', 'CACI', 'CACO', 'CADE', 'CADL', 'CAE', 'CAF', 'CAG', 'CAH', 'CAKE', 'CAL', 'CALB', 'CALC', 'CALM', 'CALT', 'CALX', 'CAMP', 'CAMT', 'CAN', 'CANF', 'CANG', 'CAPL', 'CAPR', 'CAPT', 'CAPTW', 'CAR', 'CARA', 'CARE', 'CARG', 'CARM', 'CARR', 'CARS', 'CART', 'CARV', 'CASH', 'CASI', 'CASS', 'CASY', 'CAT', 'CATC', 'CATO', 'CATX', 'CATY', 'CAUD', 'CAVA', 'CB', 'CBAN', 'CBAT', 'CBFV', 'CBH', 'CBL', 'CBNK', 'CBRE', 'CBRG', 'CBRL', 'CBSH', 'CBT', 'CBU', 'CBUS', 'CBZ', 'CC', 'CCAP', 'CCB', 'CCBG', 'CCCC', 'CCCS', 'CCD', 'CCEL', 'CCEP', 'CCG', 'CCGWW', 'CCI', 'CCIA', 'CCIF', 'CCIXU', 'CCJ', 'CCK', 'CCL', 'CCLD', 'CCLDO', 'CCLDP', 'CCM', 'CCNE', 'CCNEP', 'CCO', 'CCOI', 'CCRD', 'CCRN', 'CCS', 'CCSI', 'CCTG', 'CCTS', 'CCTSU', 'CCTSW', 'CCU', 'CCZ', 'CDAQ', 'CDE', 'CDIO', 'CDIOW', 'CDLR', 'CDLX', 'CDMO', 'CDNA', 'CDNS', 'CDP', 'CDR', 'CDRE', 'CDRO', 'CDROW', 'CDT', 'CDTG', 'CDTTW', 'CDTX', 'CDW', 'CDXC', 'CDXS', 'CDZI', 'CDZIP', 'CE', 'CEAD', 'CECO', 'CEE', 'CEG', 'CEI', 'CEIX', 'CELC', 'CELH', 'CELU', 'CELZ', 'CEM', 'CENN', 'CENT', 'CENTA', 'CENX', 'CEPU', 'CERE', 'CERO', 'CEROW', 'CERS', 'CERT', 'CET', 'CETU', 'CETUR', 'CETUW', 'CETX', 'CETY', 'CEV', 'CEVA', 'CF', 'CFB', 'CFBK', 'CFFI', 'CFFN', 'CFFS', 'CFG', 'CFLT', 'CFR', 'CFSB', 'CG', 'CGA', 'CGABL', 'CGAU', 'CGBD', 'CGBDL', 'CGC', 'CGEM', 'CGEN', 'CGNT', 'CGNX', 'CGO', 'CGON', 'CGTX', 'CHAA', 'CHCI', 'CHCO', 'CHCT', 'CHD', 'CHDN', 'CHE', 'CHEF', 'CHEK', 'CHGG', 'CHH', 'CHI', 'CHK', 'CHKEL', 'CHKEW', 'CHKEZ', 'CHKP', 'CHMG', 'CHMI', 'CHN', 'CHNR', 'CHPT', 'CHR', 'CHRD', 'CHRO', 'CHRS', 'CHRW', 'CHSCL', 'CHSCM', 'CHSCN', 'CHSCO', 'CHSCP', 'CHSN', 'CHT', 'CHTR', 'CHUY', 'CHW', 'CHWY', 'CHX', 'CHY', 'CI', 'CIA', 'CIB', 'CIEN', 'CIF', 'CIFR', 'CIFRW', 'CIG', 'CIGI', 'CII', 'CIK', 'CIM', 'CINF', 'CING', 'CINGW', 'CINT', 'CIO', 'CION', 'CISO', 'CISS', 'CITE', 'CIVB', 'CIVI', 'CIX', 'CJET', 'CJJD', 'CKPT', 'CKX', 'CL', 'CLAR', 'CLB', 'CLBK', 'CLBR', 'CLBT', 'CLBTW', 'CLCO', 'CLDI', 'CLDT', 'CLDX', 'CLEU', 'CLF', 'CLFD', 'CLGN', 'CLH', 'CLIR', 'CLLS', 'CLM', 'CLMB', 'CLMT', 'CLNE', 'CLNN', 'CLNNW', 'CLOE', 'CLOEU', 'CLOV', 'CLPR', 'CLPS', 'CLPT', 'CLRB', 'CLRC', 'CLRO', 'CLS', 'CLSD', 'CLSK', 'CLST', 'CLVR', 'CLVRW', 'CLVT', 'CLW', 'CLWT', 'CLX', 'CM', 'CMA', 'CMAX', 'CMBM', 'CMC', 'CMCA', 'CMCAU', 'CMCL', 'CMCM', 'CMCO', 'CMCSA', 'CMCT', 'CME', 'CMG', 'CMI', 'CMLS', 'CMMB', 'CMND', 'CMP', 'CMPO', 'CMPOW', 'CMPR', 'CMPS', 'CMPX', 'CMRE', 'CMRX', 'CMS', 'CMSA', 'CMSC', 'CMSD', 'CMT', 'CMTG', 'CMTL', 'CMU', 'CNA', 'CNC', 'CNDA', 'CNDT', 'CNET', 'CNEY', 'CNF', 'CNFR', 'CNFRZ', 'CNGL', 'CNGLU', 'CNHI', 'CNI', 'CNK', 'CNM', 'CNMD', 'CNNE', 'CNO', 'CNOB', 'CNOBP', 'CNP', 'CNQ', 'CNS', 'CNSL', 'CNSP', 'CNTA', 'CNTB', 'CNTG', 'CNTX', 'CNTY', 'CNVS', 'CNX', 'CNXC', 'CNXN', 'COCH', 'COCHW', 'COCO', 'COCP', 'CODA', 'CODI', 'CODX', 'COE', 'COEP', 'COEPW', 'COF', 'COFS', 'COGT', 'COHN', 'COHR', 'COHU', 'COIN', 'COKE', 'COLB', 'COLD', 'COLL', 'COLM', 'COMM', 'COMP', 'CONN', 'CONX', 'CONXU', 'CONXW', 'COO', 'COOK', 'COOL', 'COOLU', 'COOLW', 'COOP', 'COOT', 'COOTW', 'COP', 'COR', 'CORT', 'CORZ', 'CORZW', 'CORZZ', 'COSM', 'COST', 'COTY', 'COUR', 'COYA', 'CP', 'CPA', 'CPAC', 'CPAY', 'CPB', 'CPBI', 'CPF', 'CPG', 'CPHC', 'CPHI', 'CPIX', 'CPK', 'CPLP', 'CPNG', 'CPOP', 'CPRI', 'CPRT', 'CPRX', 'CPS', 'CPSH', 'CPSS', 'CPT', 'CPTN', 'CPTNW', 'CPZ', 'CQP', 'CR', 'CRAI', 'CRBG', 'CRBP', 'CRBU', 'CRC', 'CRCT', 'CRD', 'CRDF', 'CRDL', 'CRDO', 'CREG', 'CRESW', 'CRESY', 'CREV', 'CREVW', 'CREX', 'CRF', 'CRGO', 'CRGOW', 'CRGX', 'CRGY', 'CRH', 'CRI', 'CRIS', 'CRK', 'CRKN', 'CRL', 'CRM', 'CRMD', 'CRML', 'CRMLW', 'CRMT', 'CRNC', 'CRNT', 'CRNX', 'CRON', 'CROX', 'CRS', 'CRSP', 'CRSR', 'CRT', 'CRTO', 'CRUS', 'CRVL', 'CRVO', 'CRVS', 'CRWD', 'CRWS', 'CSAN', 'CSBR', 'CSCO', 'CSGP', 'CSGS', 'CSIQ', 'CSL', 'CSLM', 'CSLMR', 'CSLR', 'CSLRW', 'CSPI', 'CSQ', 'CSR', 'CSSE', 'CSSEL', 'CSSEN', 'CSSEP', 'CSTE', 'CSTL', 'CSTM', 'CSV', 'CSWC', 'CSWCZ', 'CSWI', 'CSX', 'CTA', 'CTAS', 'CTBB', 'CTBI', 'CTCX', 'CTCXW', 'CTDD', 'CTGO', 'CTHR', 'CTKB', 'CTLP', 'CTLT', 'CTM', 'CTMX', 'CTNM', 'CTNT', 'CTO', 'CTOS', 'CTR', 'CTRA', 'CTRE', 'CTRI', 'CTRM', 'CTRN', 'CTS', 'CTSH', 'CTSO', 'CTV', 'CTVA', 'CTXR', 'CUBA', 'CUBB', 'CUBE', 'CUBI', 'CUE', 'CUK', 'CULL', 'CULP', 'CURI', 'CURIW', 'CURV', 'CUTR', 'CUZ', 'CVAC', 'CVBF', 'CVCO', 'CVE', 'CVEO', 'CVGI', 'CVGW', 'CVI', 'CVII', 'CVIIU', 'CVIIW', 'CVKD', 'CVLG', 'CVLT', 'CVLY', 'CVM', 'CVNA', 'CVR', 'CVRX', 'CVS', 'CVU', 'CVV', 'CVX', 'CW', 'CWAN', 'CWBC', 'CWCO', 'CWD', 'CWEN', 'CWH', 'CWK', 'CWST', 'CWT', 'CX', 'CXAI', 'CXAIW', 'CXDO', 'CXE', 'CXH', 'CXM', 'CXT', 'CXW', 'CYBN', 'CYBR', 'CYCC', 'CYCCP', 'CYCN', 'CYD', 'CYH', 'CYN', 'CYRX', 'CYTH', 'CYTHW', 'CYTK', 'CYTO', 'CZFS', 'CZNC', 'CZOO', 'CZR', 'CZWI', 'D', 'DAC', 'DADA', 'DAIO', 'DAKT', 'DAL', 'DALN', 'DAN', 'DAO', 'DAR', 'DARE', 'DASH', 'DATS', 'DATSW', 'DAVA', 'DAVE', 'DAVEW', 'DAWN', 'DAY', 'DB', 'DBD', 'DBGI', 'DBGIW', 'DBI', 'DBL', 'DBRG', 'DBVT', 'DBX', 'DC', 'DCBO', 'DCF', 'DCGO', 'DCI', 'DCO', 'DCOM', 'DCOMP', 'DCPH', 'DCTH', 'DD', 'DDC', 'DDD', 'DDI', 'DDL', 'DDOG', 'DDS', 'DDT', 'DE', 'DEA', 'DEC', 'DECA', 'DECAW', 'DECK', 'DEI', 'DELL', 'DENN', 'DEO', 'DERM', 'DESP', 'DFH', 'DFIN', 'DFLI', 'DFLIW', 'DFP', 'DFS', 'DG', 'DGHI', 'DGICA', 'DGICB', 'DGII', 'DGLY', 'DGX', 'DH', 'DHAC', 'DHAI', 'DHAIW', 'DHC', 'DHCNI', 'DHCNL', 'DHF', 'DHI', 'DHIL', 'DHR', 'DHT', 'DHX', 'DHY', 'DIAX', 'DIBS', 'DIN', 'DINO', 'DIOD', 'DIS', 'DIST', 'DISTW', 'DIT', 'DJCO', 'DJT', 'DJTWW', 'DK', 'DKL', 'DKNG', 'DKS', 'DLA', 'DLB', 'DLHC', 'DLNG', 'DLO', 'DLPN', 'DLR', 'DLTH', 'DLTR', 'DLX', 'DLY', 'DM', 'DMA', 'DMAC', 'DMB', 'DMF', 'DMLP', 'DMO', 'DMRC', 'DMTK', 'DMYY', 'DNA', 'DNB', 'DNLI', 'DNMR', 'DNN', 'DNOW', 'DNP', 'DNTH', 'DNUT', 'DO', 'DOC', 'DOCN', 'DOCS', 'DOCU', 'DOGZ', 'DOLE', 'DOMA', 'DOMH', 'DOMO', 'DOOO', 'DOOR', 'DORM', 'DOUG', 'DOV', 'DOW', 'DOX', 'DOYU', 'DPCS', 'DPG', 'DPRO', 'DPSI', 'DPZ', 'DQ', 'DRCT', 'DRD', 'DRH', 'DRI', 'DRIO', 'DRMA', 'DRMAW', 'DRQ', 'DRRX', 'DRS', 'DRTS', 'DRTSW', 'DRUG', 'DRVN', 'DSGN', 'DSGR', 'DSGX', 'DSL', 'DSM', 'DSP', 'DSS', 'DSU', 'DSWL', 'DSX', 'DT', 'DTB', 'DTC', 'DTCK', 'DTE', 'DTF', 'DTG', 'DTI', 'DTIL', 'DTM', 'DTSS', 'DTST', 'DTSTW', 'DTW', 'DUET', 'DUK', 'DUKB', 'DUO', 'DUOL', 'DUOT', 'DV', 'DVA', 'DVAX', 'DVN', 'DWSN', 'DX', 'DXC', 'DXCM', 'DXF', 'DXLG', 'DXPE', 'DXR', 'DXYN', 'DXYZ', 'DY', 'DYAI', 'DYCQ', 'DYCQR', 'DYCQU', 'DYN', 'DYNT', 'DZSI', 'E', 'EA', 'EAD', 'EAF', 'EAI', 'EARN', 'EAST', 'EAT', 'EB', 'EBAY', 'EBC', 'EBF', 'EBMT', 'EBON', 'EBR', 'EBS', 'EBTC', 'EC', 'ECAT', 'ECBK', 'ECC', 'ECCC', 'ECCF', 'ECCV', 'ECCW', 'ECCX', 'ECDA', 'ECDAW', 'ECF', 'ECL', 'ECO', 'ECOR', 'ECPG', 'ECVT', 'ECX', 'ECXWW', 'ED', 'EDAP', 'EDBL', 'EDBLW', 'EDD', 'EDF', 'EDIT', 'EDN', 'EDR', 'EDRY', 'EDSA', 'EDTK', 'EDU', 'EDUC', 'EE', 'EEA', 'EEFT', 'EEIQ', 'EEX', 'EFC', 'EFOI', 'EFR', 'EFSC', 'EFSCP', 'EFSH', 'EFT', 'EFTR', 'EFTRW', 'EFX', 'EFXT', 'EG', 'EGAN', 'EGBN', 'EGF', 'EGHT', 'EGIO', 'EGO', 'EGP', 'EGRX', 'EGY', 'EH', 'EHAB', 'EHC', 'EHI', 'EHTH', 'EIC', 'EICA', 'EICB', 'EICC', 'EIG', 'EIM', 'EIX', 'EJH', 'EKSO', 'EL', 'ELA', 'ELAB', 'ELAN', 'ELBM', 'ELC', 'ELDN', 'ELEV', 'ELF', 'ELLO', 'ELMD', 'ELME', 'ELP', 'ELPC', 'ELS', 'ELSE', 'ELTK', 'ELTX', 'ELUT', 'ELV', 'ELVA', 'ELVN', 'ELWS', 'ELYM', 'EM', 'EMBC', 'EMCG', 'EMCGR', 'EMD', 'EME', 'EMF', 'EMKR', 'EML', 'EMLD', 'EMLDW', 'EMN', 'EMO', 'EMP', 'EMR', 'EMX', 'ENB', 'ENFN', 'ENG', 'ENGN', 'ENGNW', 'ENIC', 'ENJ', 'ENLC', 'ENLT', 'ENLV', 'ENO', 'ENOV', 'ENPH', 'ENR', 'ENS', 'ENSC', 'ENSG', 'ENSV', 'ENTA', 'ENTG', 'ENTX', 'ENV', 'ENVA', 'ENVB', 'ENVX', 'ENX', 'ENZ', 'EOD', 'EOG', 'EOI', 'EOLS', 'EOS', 'EOSE', 'EOSEW', 'EOT', 'EP', 'EPAC', 'EPAM', 'EPC', 'EPD', 'EPIX', 'EPM', 'EPOW', 'EPR', 'EPRT', 'EPRX', 'EPSN', 'EQ', 'EQBK', 'EQC', 'EQH', 'EQIX', 'EQNR', 'EQR', 'EQS', 'EQT', 'EQX', 'ERAS', 'ERC', 'ERF', 'ERH', 'ERIC', 'ERIE', 'ERII', 'ERJ', 'ERNA', 'ERO', 'ES', 'ESAB', 'ESCA', 'ESE', 'ESEA', 'ESGL', 'ESGLW', 'ESGR', 'ESGRO', 'ESGRP', 'ESI', 'ESLA', 'ESLAW', 'ESLT', 'ESNT', 'ESOA', 'ESP', 'ESPR', 'ESQ', 'ESRT', 'ESS', 'ESSA', 'ESTA', 'ESTC', 'ET', 'ETAO', 'ETB', 'ETD', 'ETG', 'ETI', 'ETJ', 'ETN', 'ETNB', 'ETO', 'ETON', 'ETR', 'ETRN', 'ETSY', 'ETV', 'ETW', 'ETWO', 'ETX', 'ETY', 'EU', 'EUDA', 'EUDAW', 'EURN', 'EVA', 'EVAX', 'EVBG', 'EVBN', 'EVC', 'EVCM', 'EVE', 'EVER', 'EVEX', 'EVF', 'EVG', 'EVGN', 'EVGO', 'EVGOW', 'EVGR', 'EVGRW', 'EVH', 'EVI', 'EVLV', 'EVLVW', 'EVM', 'EVN', 'EVO', 'EVOK', 'EVR', 'EVRG', 'EVRI', 'EVT', 'EVTC', 'EVTL', 'EVTV', 'EVV', 'EW', 'EWBC', 'EWCZ', 'EWTX', 'EXAI', 'EXAS', 'EXC', 'EXEL', 'EXFY', 'EXG', 'EXK', 'EXLS', 'EXP', 'EXPD', 'EXPE', 'EXPI', 'EXPO', 'EXR', 'EXTO', 'EXTR', 'EYE', 'EYEN', 'EYPT', 'EZFL', 'EZGO', 'EZPW', 'F', 'FA', 'FAAS', 'FAASW', 'FAF', 'FAM', 'FAMI', 'FANG', 'FANH', 'FARM', 'FARO', 'FAST', 'FAT', 'FATBB', 'FATBP', 'FATE', 'FATH', 'FAX', 'FBIN', 'FBIO', 'FBIOP', 'FBIZ', 'FBK', 'FBLG', 'FBMS', 'FBNC', 'FBP', 'FBRT', 'FBRX', 'FBYD', 'FBYDW', 'FC', 'FCAP', 'FCBC', 'FCCO', 'FCEL', 'FCF', 'FCFS', 'FCN', 'FCNCA', 'FCNCO', 'FCNCP', 'FCO', 'FCPT', 'FCRX', 'FCT', 'FCUV', 'FCX', 'FDBC', 'FDMT', 'FDP', 'FDUS', 'FDX', 'FE', 'FEAM', 'FEBO', 'FEDU', 'FEI', 'FEIM', 'FELE', 'FEMY', 'FEN', 'FENC', 'FENG', 'FERG', 'FET', 'FEXD', 'FF', 'FFA', 'FFBC', 'FFC', 'FFIC', 'FFIE', 'FFIEW', 'FFIN', 'FFIV', 'FFNW', 'FFWM', 'FG', 'FGB', 'FGBI', 'FGBIP', 'FGEN', 'FGF', 'FGFPP', 'FGI', 'FGIWW', 'FGN', 'FHB', 'FHI', 'FHLT', 'FHLTU', 'FHLTW', 'FHN', 'FHTX', 'FI', 'FIACW', 'FIBK', 'FICO', 'FIF', 'FIGS', 'FIHL', 'FINS', 'FINV', 'FINW', 'FIP', 'FIS', 'FISI', 'FITB', 'FITBI', 'FITBO', 'FITBP', 'FIVE', 'FIVN', 'FIX', 'FIZZ', 'FKWL', 'FL', 'FLC', 'FLEX', 'FLFV', 'FLFVR', 'FLFVW', 'FLGC', 'FLGT', 'FLIC', 'FLJ', 'FLL', 'FLNC', 'FLNG', 'FLNT', 'FLO', 'FLR', 'FLS', 'FLUT', 'FLUX', 'FLWS', 'FLXS', 'FLYW', 'FLYX', 'FMAO', 'FMBH', 'FMC', 'FMN', 'FMNB', 'FMS', 'FMST', 'FMSTW', 'FMX', 'FMY', 'FN', 'FNA', 'FNB', 'FNCB', 'FNCH', 'FND', 'FNF', 'FNGR', 'FNKO', 'FNLC', 'FNV', 'FNVT', 'FNWB', 'FNWD', 'FOA', 'FOF', 'FOLD', 'FONR', 'FOR', 'FORA', 'FORD', 'FORL', 'FORLW', 'FORM', 'FORR', 'FORTY', 'FOSL', 'FOSLL', 'FOUR', 'FOX', 'FOXA', 'FOXF', 'FOXO', 'FPAY', 'FPF', 'FPH', 'FPI', 'FPL', 'FR', 'FRA', 'FRAF', 'FRBA', 'FRD', 'FREE', 'FREEW', 'FRES', 'FREY', 'FRGE', 'FRGT', 'FRHC', 'FRLA', 'FRME', 'FRMEP', 'FRO', 'FROG', 'FRPH', 'FRPT', 'FRSH', 'FRST', 'FRSX', 'FRT', 'FRZA', 'FSBC', 'FSBW', 'FSCO', 'FSD', 'FSEA', 'FSFG', 'FSI', 'FSK', 'FSLR', 'FSLY', 'FSM', 'FSP', 'FSS', 'FSTR', 'FSV', 'FT', 'FTAI', 'FTAIM', 'FTAIN', 'FTAIO', 'FTAIP', 'FTCI', 'FTDR', 'FTEK', 'FTEL', 'FTF', 'FTFT', 'FTHM', 'FTHY', 'FTI', 'FTII', 'FTIIU', 'FTK', 'FTLF', 'FTNT', 'FTRE', 'FTS', 'FTV', 'FUBO', 'FUFU', 'FUFUW', 'FUL', 'FULC', 'FULT', 'FULTP', 'FUN', 'FUNC', 'FUND', 'FURY', 'FUSB', 'FUSN', 'FUTU', 'FVCB', 'FVRR', 'FWBI', 'FWONA', 'FWONK', 'FWRD', 'FWRG', 'FXNC', 'FYBR', 'G', 'GAB', 'GABC', 'GAIA', 'GAIN', 'GAINL', 'GAINN', 'GAINZ', 'GALT', 'GAM', 'GAMB', 'GAMC', 'GAMCW', 'GAME', 'GAN', 'GANX', 'GAQ', 'GASS', 'GATO', 'GATX', 'GAU', 'GB', 'GBAB', 'GBBK', 'GBBKR', 'GBBKW', 'GBCI', 'GBDC', 'GBIO', 'GBLI', 'GBNY', 'GBR', 'GBTG', 'GBX', 'GCBC', 'GCI', 'GCMG', 'GCMGW', 'GCO', 'GCT', 'GCTK', 'GCTS', 'GCV', 'GD', 'GDC', 'GDDY', 'GDEN', 'GDEV', 'GDHG', 'GDL', 'GDO', 'GDOT', 'GDRX', 'GDS', 'GDST', 'GDSTR', 'GDSTW', 'GDTC', 'GDV', 'GDYN', 'GE', 'GECC', 'GECCI', 'GECCM', 'GECCO', 'GECCZ', 'GEF', 'GEG', 'GEGGL', 'GEHC', 'GEL', 'GEN', 'GENC', 'GENE', 'GENI', 'GENK', 'GEO', 'GEOS', 'GERN', 'GES', 'GETR', 'GETY', 'GEV', 'GEVO', 'GF', 'GFAI', 'GFAIW', 'GFF', 'GFI', 'GFL', 'GFR', 'GFS', 'GGAL', 'GGB', 'GGG', 'GGN', 'GGR', 'GGROW', 'GGT', 'GGZ', 'GH', 'GHC', 'GHG', 'GHI', 'GHIX', 'GHIXW', 'GHLD', 'GHM', 'GHRS', 'GHSI', 'GHY', 'GIB', 'GIC', 'GIFI', 'GIGM', 'GIII', 'GIL', 'GILD', 'GILT', 'GIPR', 'GIPRW', 'GIS', 'GJH', 'GJP', 'GJR', 'GJS', 'GJT', 'GKOS', 'GL', 'GLAC', 'GLACR', 'GLACU', 'GLAD', 'GLADZ', 'GLBE', 'GLBS', 'GLBZ', 'GLDD', 'GLDG', 'GLLI', 'GLLIU', 'GLLIW', 'GLMD', 'GLNG', 'GLO', 'GLOB', 'GLOG', 'GLOP', 'GLP', 'GLPG', 'GLPI', 'GLQ', 'GLRE', 'GLSI', 'GLST', 'GLSTR', 'GLT', 'GLTO', 'GLU', 'GLUE', 'GLV', 'GLW', 'GLYC', 'GM', 'GMAB', 'GME', 'GMED', 'GMFI', 'GMFIU', 'GMFIW', 'GMGI', 'GMM', 'GMRE', 'GMS', 'GNE', 'GNFT', 'GNK', 'GNL', 'GNLN', 'GNLX', 'GNPX', 'GNRC', 'GNS', 'GNSS', 'GNT', 'GNTA', 'GNTX', 'GNTY', 'GNW', 'GO', 'GOCO', 'GODN', 'GODNR', 'GOEV', 'GOEVW', 'GOF', 'GOGL', 'GOGO', 'GOLD', 'GOLF', 'GOOD', 'GOODN', 'GOODO', 'GOOG', 'GOOGL', 'GOOS', 'GORO', 'GORV', 'GOSS', 'GOTU', 'GOVX', 'GOVXW', 'GP', 'GPAC', 'GPAK', 'GPC', 'GPCR', 'GPI', 'GPJA', 'GPK', 'GPMT', 'GPN', 'GPOR', 'GPRE', 'GPRK', 'GPRO', 'GPS', 'GRAB', 'GRABW', 'GRBK', 'GRC', 'GRDI', 'GRDIW', 'GREE', 'GREEL', 'GRF', 'GRFS', 'GRFX', 'GRI', 'GRIN', 'GRMN', 'GRND', 'GRNQ', 'GRNT', 'GROM', 'GROMW', 'GROV', 'GROW', 'GROY', 'GRPN', 'GRRR', 'GRRRW', 'GRTS', 'GRTX', 'GRVY', 'GRWG', 'GRX', 'GRYP', 'GS', 'GSAT', 'GSBC', 'GSBD', 'GSHD', 'GSIT', 'GSIW', 'GSK', 'GSL', 'GSM', 'GSMGW', 'GSUN', 'GT', 'GTAC', 'GTACW', 'GTBP', 'GTE', 'GTEC', 'GTES', 'GTHX', 'GTI', 'GTIM', 'GTLB', 'GTLS', 'GTN', 'GTX', 'GTY', 'GUG', 'GURE', 'GUT', 'GUTS', 'GV', 'GVA', 'GVH', 'GVP', 'GWAV', 'GWH', 'GWRE', 'GWRS', 'GWW', 'GXAI', 'GXO', 'GYRE', 'GYRO', 'H', 'HA', 'HAE', 'HAFC', 'HAFN', 'HAIA', 'HAIAU', 'HAIAW', 'HAIN', 'HAL', 'HALO', 'HAO', 'HAS', 'HASI', 'HAYN', 'HAYW', 'HBAN', 'HBANL', 'HBANM', 'HBANP', 'HBB', 'HBCP', 'HBI', 'HBIO', 'HBM', 'HBNC', 'HBT', 'HCA', 'HCAT', 'HCC', 'HCI', 'HCKT', 'HCM', 'HCP', 'HCSG', 'HCTI', 'HCVI', 'HCWB', 'HCXY', 'HD', 'HDB', 'HDSN', 'HE', 'HEAR', 'HEES', 'HEI', 'HELE', 'HEPA', 'HEPS', 'HEQ', 'HES', 'HESM', 'HFBL', 'HFFG', 'HFRO', 'HFWA', 'HG', 'HGAS', 'HGASW', 'HGBL', 'HGLB', 'HGTY', 'HGV', 'HHGC', 'HHH', 'HHS', 'HI', 'HIBB', 'HIE', 'HIFS', 'HIG', 'HIHO', 'HII', 'HIMS', 'HIMX', 'HIO', 'HIPO', 'HITI', 'HIVE', 'HIW', 'HIX', 'HKD', 'HKIT', 'HL', 'HLF', 'HLI', 'HLIO', 'HLIT', 'HLLY', 'HLMN', 'HLN', 'HLNE', 'HLP', 'HLT', 'HLTH', 'HLVX', 'HLX', 'HLXB', 'HMC', 'HMN', 'HMNF', 'HMST', 'HMY', 'HNI', 'HNNA', 'HNNAZ', 'HNRA', 'HNRG', 'HNST', 'HNVR', 'HNW', 'HOFT', 'HOFV', 'HOFVW', 'HOG', 'HOLI', 'HOLO', 'HOLOW', 'HOLX', 'HOMB', 'HON', 'HONE', 'HOOD', 'HOOK', 'HOPE', 'HOTH', 'HOUR', 'HOUS', 'HOV', 'HOVNP', 'HOVR', 'HOVRW', 'HOWL', 'HP', 'HPCO', 'HPE', 'HPF', 'HPH', 'HPI', 'HPK', 'HPKEW', 'HPP', 'HPQ', 'HPS', 'HQH', 'HQI', 'HQL', 'HQY', 'HR', 'HRB', 'HRI', 'HRL', 'HRMY', 'HROW', 'HROWL', 'HROWM', 'HRT', 'HRTG', 'HRTX', 'HRYU', 'HRZN', 'HSAI', 'HSBC', 'HSCS', 'HSCSW', 'HSDT', 'HSHP', 'HSIC', 'HSII', 'HSON', 'HSPO', 'HST', 'HSTM', 'HSY', 'HTBI', 'HTBK', 'HTCR', 'HTD', 'HTFB', 'HTFC', 'HTGC', 'HTH', 'HTHT', 'HTIA', 'HTIBP', 'HTLD', 'HTLF', 'HTLFP', 'HTOO', 'HTOOW', 'HTZ', 'HTZWW', 'HUBB', 'HUBC', 'HUBCW', 'HUBCZ', 'HUBG', 'HUBS', 'HUDA', 'HUDAR', 'HUDAU', 'HUDI', 'HUGE', 'HUIZ', 'HUM', 'HUMA', 'HUMAW', 'HUN', 'HURC', 'HURN', 'HUSA', 'HUT', 'HUYA', 'HVT', 'HWBK', 'HWC', 'HWCPZ', 'HWH', 'HWKN', 'HWM', 'HXL', 'HY', 'HYB', 'HYFM', 'HYI', 'HYLN', 'HYMC', 'HYMCL', 'HYMCW', 'HYPR', 'HYT', 'HYW', 'HYZN', 'HYZNW', 'HZO', 'I', 'IAC', 'IAE', 'IAF', 'IAG', 'IART', 'IAS', 'IAUX', 'IBAC', 'IBACR', 'IBCP', 'IBEX', 'IBIO', 'IBKR', 'IBM', 'IBN', 'IBOC', 'IBP', 'IBRX', 'IBTA', 'IBTX', 'ICAD', 'ICCC', 'ICCH', 'ICCM', 'ICCT', 'ICD', 'ICE', 'ICFI', 'ICG', 'ICHR', 'ICL', 'ICLK', 'ICLR', 'ICMB', 'ICR', 'ICU', 'ICUCW', 'ICUI', 'IDA', 'IDAI', 'IDCC', 'IDE', 'IDEX', 'IDN', 'IDR', 'IDT', 'IDXX', 'IDYA', 'IE', 'IEP', 'IESC', 'IEX', 'IFBD', 'IFF', 'IFIN', 'IFN', 'IFRX', 'IFS', 'IGA', 'IGC', 'IGD', 'IGI', 'IGIC', 'IGMS', 'IGR', 'IGT', 'IGTA', 'IGTAW', 'IH', 'IHD', 'IHG', 'IHRT', 'IHS', 'IHT', 'IHTA', 'IIF', 'III', 'IIIN', 'IIIV', 'IIM', 'IINN', 'IINNW', 'IIPR', 'IKNA', 'IKT', 'ILAG', 'ILMN', 'ILPT', 'IMAB', 'IMAQ', 'IMAQR', 'IMAQW', 'IMAX', 'IMCC', 'IMCR', 'IMKTA', 'IMMP', 'IMMR', 'IMMX', 'IMNM', 'IMNN', 'IMO', 'IMOS', 'IMPP', 'IMPPP', 'IMRN', 'IMRX', 'IMTE', 'IMTX', 'IMTXW', 'IMUX', 'IMVT', 'IMXI', 'INAB', 'INAQ', 'INAQW', 'INBK', 'INBKZ', 'INBS', 'INBX', 'INCR', 'INCY', 'INDB', 'INDI', 'INDO', 'INDP', 'INDV', 'INFA', 'INFN', 'INFU', 'INFY', 'ING', 'INGN', 'INGR', 'INHD', 'INKT', 'INLX', 'INM', 'INMB', 'INMD', 'INN', 'INNV', 'INO', 'INOD', 'INSE', 'INSG', 'INSI', 'INSM', 'INSP', 'INST', 'INSW', 'INTA', 'INTC', 'INTE', 'INTG', 'INTJ', 'INTR', 'INTS', 'INTT', 'INTU', 'INTZ', 'INUV', 'INVA', 'INVE', 'INVH', 'INVO', 'INVZ', 'INVZW', 'INZY', 'IOBT', 'IONM', 'IONQ', 'IONR', 'IONS', 'IOR', 'IOSP', 'IOT', 'IOVA', 'IP', 'IPA', 'IPAR', 'IPDN', 'IPG', 'IPGP', 'IPHA', 'IPI', 'IPSC', 'IPW', 'IPWR', 'IPX', 'IPXX', 'IPXXU', 'IQ', 'IQI', 'IQV', 'IR', 'IRAA', 'IRBT', 'IRDM', 'IREN', 'IRIX', 'IRM', 'IRMD', 'IROH', 'IROHU', 'IROHW', 'IRON', 'IROQ', 'IRS', 'IRT', 'IRTC', 'IRWD', 'ISD', 'ISDR', 'ISPC', 'ISPO', 'ISPR', 'ISRG', 'ISRL', 'ISRLU', 'ISRLW', 'ISSC', 'ISTR', 'ISUN', 'IT', 'ITCI', 'ITGR', 'ITI', 'ITIC', 'ITOS', 'ITP', 'ITRG', 'ITRI', 'ITRM', 'ITRN', 'ITT', 'ITUB', 'ITW', 'IVA', 'IVAC', 'IVCA', 'IVCB', 'IVCP', 'IVCPU', 'IVDA', 'IVDAW', 'IVP', 'IVR', 'IVT', 'IVVD', 'IVZ', 'IX', 'IXAQ', 'IXAQW', 'IXHL', 'IZEA', 'IZM', 'J', 'JACK', 'JAGX', 'JAKK', 'JAMF', 'JAN', 'JANX', 'JAZZ', 'JBGS', 'JBHT', 'JBI', 'JBK', 'JBL', 'JBLU', 'JBSS', 'JBT', 'JCE', 'JCI', 'JCSE', 'JCTCF', 'JD', 'JEF', 'JELD', 'JEQ', 'JEWL', 'JFBR', 'JFBRW', 'JFIN', 'JFR', 'JFU', 'JG', 'JGH', 'JHG', 'JHI', 'JHS', 'JHX', 'JILL', 'JJSF', 'JKHY', 'JKS', 'JL', 'JLL', 'JLS', 'JMIA', 'JMM', 'JMSB', 'JNJ', 'JNPR', 'JNVR', 'JOB', 'JOBY', 'JOE', 'JOF', 'JOUT', 'JPC', 'JPI', 'JPM', 'JQC', 'JRI', 'JRS', 'JRSH', 'JRVR', 'JSM', 'JSPR', 'JSPRW', 'JTAI', 'JTAIW', 'JTAIZ', 'JUNE', 'JVA', 'JWEL', 'JWN', 'JWSM', 'JXJT', 'JXN', 'JYD', 'JYNT', 'JZ', 'JZXN', 'K', 'KA', 'KACL', 'KACLW', 'KAI', 'KALA', 'KALU', 'KALV', 'KAR', 'KARO', 'KAVL', 'KB', 'KBH', 'KBR', 'KC', 'KCGI', 'KD', 'KDP', 'KE', 'KELYA', 'KELYB', 'KEN', 'KEP', 'KEQU', 'KEX', 'KEY', 'KEYS', 'KF', 'KFFB', 'KFRC', 'KFS', 'KFY', 'KGC', 'KGEI', 'KGS', 'KHC', 'KIDS', 'KIM', 'KIND', 'KINS', 'KIO', 'KIRK', 'KITT', 'KITTW', 'KKR', 'KKRS', 'KLAC', 'KLG', 'KLIC', 'KLTR', 'KLXE', 'KMB', 'KMDA', 'KMI', 'KMPB', 'KMPR', 'KMT', 'KMX', 'KN', 'KNDI', 'KNF', 'KNOP', 'KNSA', 'KNSL', 'KNTK', 'KNW', 'KNX', 'KO', 'KOD', 'KODK', 'KOF', 'KOP', 'KOPN', 'KORE', 'KOS', 'KOSS', 'KPLT', 'KPLTW', 'KPRX', 'KPTI', 'KR', 'KRC', 'KREF', 'KRG', 'KRKR', 'KRMD', 'KRNL', 'KRNLW', 'KRNT', 'KRNY', 'KRO', 'KRON', 'KROS', 'KRP', 'KRRO', 'KRT', 'KRUS', 'KRYS', 'KSCP', 'KSM', 'KSPI', 'KSS', 'KT', 'KTB', 'KTCC', 'KTF', 'KTH', 'KTN', 'KTOS', 'KTRA', 'KTTA', 'KTTAW', 'KUKE', 'KULR', 'KURA', 'KVAC', 'KVACU', 'KVHI', 'KVUE', 'KVYO', 'KW', 'KWE', 'KWESW', 'KWR', 'KXIN', 'KYMR', 'KYN', 'KYTX', 'KZIA', 'KZR', 'L', 'LAAC', 'LAB', 'LABP', 'LAC', 'LAD', 'LADR', 'LAES', 'LAKE', 'LAMR', 'LANC', 'LAND', 'LANDM', 'LANDO', 'LANDP', 'LANV', 'LARK', 'LASE', 'LASR', 'LATG', 'LAUR', 'LAW', 'LAZ', 'LAZR', 'LBAI', 'LBPH', 'LBRDA', 'LBRDK', 'LBRDP', 'LBRT', 'LBTYA', 'LBTYB', 'LBTYK', 'LC', 'LCFY', 'LCID', 'LCII', 'LCNB', 'LCTX', 'LCUT', 'LCW', 'LDI', 'LDOS', 'LDP', 'LDTC', 'LDTCW', 'LDWY', 'LE', 'LEA', 'LECO', 'LEDS', 'LEE', 'LEG', 'LEGH', 'LEGN', 'LEGT', 'LEN', 'LENZ', 'LEO', 'LESL', 'LEU', 'LEV', 'LEVI', 'LEXX', 'LEXXW', 'LFCR', 'LFLY', 'LFLYW', 'LFMD', 'LFMDP', 'LFST', 'LFT', 'LFUS', 'LFVN', 'LFWD', 'LGCB', 'LGCL', 'LGHL', 'LGHLW', 'LGI', 'LGIH', 'LGL', 'LGMK', 'LGND', 'LGO', 'LGVN', 'LH', 'LHX', 'LI', 'LICN', 'LICY', 'LIDR', 'LIDRW', 'LIFE', 'LIFW', 'LIFWW', 'LII', 'LILA', 'LILAK', 'LILM', 'LILMW', 'LIN', 'LINC', 'LIND', 'LINK', 'LIPO', 'LIQT', 'LITB', 'LITE', 'LITM', 'LIVE', 'LIVN', 'LIXT', 'LKCO', 'LKFN', 'LKQ', 'LL', 'LLAP', 'LLY', 'LLYVA', 'LLYVK', 'LMAT', 'LMB', 'LMFA', 'LMND', 'LMNR', 'LMT', 'LNC', 'LND', 'LNG', 'LNKB', 'LNN', 'LNSR', 'LNT', 'LNTH', 'LNW', 'LNZA', 'LNZAW', 'LOAN', 'LOAR', 'LOB', 'LOBO', 'LOCL', 'LOCO', 'LODE', 'LOGI', 'LOMA', 'LOOP', 'LOPE', 'LOT', 'LOTWW', 'LOVE', 'LOW', 'LPA', 'LPCN', 'LPG', 'LPL', 'LPLA', 'LPRO', 'LPSN', 'LPTH', 'LPTV', 'LPTX', 'LPX', 'LQDA', 'LQDT', 'LQR', 'LRCX', 'LRE', 'LRFC', 'LRHC', 'LRMR', 'LRN', 'LSAK', 'LSBK', 'LSCC', 'LSDI', 'LSEA', 'LSEAW', 'LSF', 'LSPD', 'LSTA', 'LSTR', 'LSXMA', 'LSXMB', 'LSXMK', 'LTBR', 'LTC', 'LTH', 'LTRN', 'LTRX', 'LTRY', 'LTRYW', 'LU', 'LUCD', 'LUCY', 'LULU', 'LUMN', 'LUMO', 'LUNA', 'LUNG', 'LUNR', 'LUNRW', 'LUV', 'LUXH', 'LUXHP', 'LVLU', 'LVO', 'LVRO', 'LVROW', 'LVS', 'LVTX', 'LVWR', 'LW', 'LWAY', 'LWLG', 'LX', 'LXEH', 'LXEO', 'LXFR', 'LXP', 'LXRX', 'LXU', 'LYB', 'LYEL', 'LYFT', 'LYG', 'LYRA', 'LYT', 'LYTS', 'LYV', 'LZ', 'LZB', 'LZM', 'M', 'MA', 'MAA', 'MAC', 'MACA', 'MACAW', 'MACK', 'MAG', 'MAIA', 'MAIN', 'MAMA', 'MAMO', 'MAN', 'MANH', 'MANU', 'MAPS', 'MAPSW', 'MAQC', 'MAR', 'MARA', 'MARPS', 'MARX', 'MARXR', 'MAS', 'MASI', 'MASS', 'MAT', 'MATH', 'MATV', 'MATW', 'MATX', 'MAV', 'MAX', 'MAXN', 'MAYS', 'MBC', 'MBCN', 'MBI', 'MBIN', 'MBINM', 'MBINN', 'MBINO', 'MBIO', 'MBLY', 'MBNKP', 'MBOT', 'MBRX', 'MBUU', 'MBWM', 'MC', 'MCAA', 'MCAC', 'MCAG', 'MCAGR', 'MCAGU', 'MCB', 'MCBC', 'MCBS', 'MCD', 'MCFT', 'MCHP', 'MCHX', 'MCI', 'MCK', 'MCN', 'MCO', 'MCR', 'MCRB', 'MCRI', 'MCS', 'MCVT', 'MCW', 'MCY', 'MD', 'MDAI', 'MDAIW', 'MDB', 'MDBH', 'MDGL', 'MDIA', 'MDJH', 'MDLZ', 'MDRR', 'MDRRP', 'MDT', 'MDU', 'MDV', 'MDWD', 'MDXG', 'MDXH', 'ME', 'MEC', 'MED', 'MEDP', 'MEDS', 'MEG', 'MEGI', 'MEGL', 'MEI', 'MEIP', 'MELI', 'MEOH', 'MER', 'MERC', 'MESA', 'MESO', 'MET', 'META', 'METC', 'METCB', 'METCL', 'MFA', 'MFAN', 'MFAO', 'MFC', 'MFD', 'MFG', 'MFH', 'MFI', 'MFIC', 'MFICL', 'MFIN', 'MFM', 'MG', 'MGA', 'MGEE', 'MGF', 'MGIC', 'MGIH', 'MGLD', 'MGM', 'MGNI', 'MGNX', 'MGOL', 'MGPI', 'MGR', 'MGRB', 'MGRC', 'MGRD', 'MGRE', 'MGRM', 'MGRX', 'MGTX', 'MGX', 'MGY', 'MGYR', 'MHD', 'MHF', 'MHH', 'MHI', 'MHK', 'MHLA', 'MHLD', 'MHN', 'MHNC', 'MHO', 'MHUA', 'MI', 'MICS', 'MIDD', 'MIGI', 'MIN', 'MIND', 'MINDP', 'MINM', 'MIO', 'MIR', 'MIRA', 'MIRM', 'MIST', 'MITAW', 'MITK', 'MITN', 'MITQ', 'MITT', 'MIY', 'MKC', 'MKFG', 'MKL', 'MKSI', 'MKTW', 'MKTX', 'ML', 'MLAB', 'MLCO', 'MLEC', 'MLECW', 'MLGO', 'MLI', 'MLKN', 'MLM', 'MLNK', 'MLP', 'MLR', 'MLSS', 'MLTX', 'MLYS', 'MMA', 'MMAT', 'MMC', 'MMD', 'MMI', 'MMLP', 'MMM', 'MMS', 'MMSI', 'MMT', 'MMU', 'MMV', 'MMVWW', 'MMYT', 'MNDO', 'MNDR', 'MNDY', 'MNKD', 'MNMD', 'MNOV', 'MNPR', 'MNR', 'MNRO', 'MNSB', 'MNSBP', 'MNSO', 'MNST', 'MNTK', 'MNTN', 'MNTS', 'MNTSW', 'MNTX', 'MNY', 'MNYWW', 'MO', 'MOB', 'MOBX', 'MOBXW', 'MOD', 'MODD', 'MODG', 'MODN', 'MODV', 'MOFG', 'MOGO', 'MOGU', 'MOH', 'MOLN', 'MOMO', 'MOND', 'MOR', 'MORF', 'MORN', 'MOS', 'MOV', 'MOVE', 'MP', 'MPA', 'MPAA', 'MPB', 'MPC', 'MPLN', 'MPLX', 'MPTI', 'MPU', 'MPV', 'MPW', 'MPWR', 'MPX', 'MQ', 'MQT', 'MQY', 'MRAI', 'MRAM', 'MRBK', 'MRC', 'MRCC', 'MRCY', 'MRDB', 'MREO', 'MRIN', 'MRK', 'MRKR', 'MRM', 'MRNA', 'MRNO', 'MRNOW', 'MRNS', 'MRO', 'MRSN', 'MRT', 'MRTN', 'MRUS', 'MRVI', 'MRVL', 'MRX', 'MS', 'MSA', 'MSAI', 'MSAIW', 'MSB', 'MSBI', 'MSBIP', 'MSC', 'MSCI', 'MSD', 'MSDL', 'MSEX', 'MSFT', 'MSGE', 'MSGM', 'MSGS', 'MSI', 'MSM', 'MSN', 'MSS', 'MSSA', 'MSTR', 'MT', 'MTA', 'MTAL', 'MTB', 'MTC', 'MTCH', 'MTD', 'MTDR', 'MTEK', 'MTEKW', 'MTEM', 'MTEN', 'MTEX', 'MTG', 'MTH', 'MTLS', 'MTN', 'MTNB', 'MTR', 'MTRN', 'MTRX', 'MTSI', 'MTTR', 'MTUS', 'MTW', 'MTX', 'MTZ', 'MU', 'MUA', 'MUC', 'MUE', 'MUFG', 'MUI', 'MUJ', 'MULN', 'MUR', 'MURA', 'MUSA', 'MUX', 'MVBF', 'MVF', 'MVIS', 'MVO', 'MVST', 'MVSTW', 'MVT', 'MWA', 'MWG', 'MX', 'MXC', 'MXCT', 'MXE', 'MXF', 'MXL', 'MYD', 'MYE', 'MYFW', 'MYGN', 'MYI', 'MYMD', 'MYN', 'MYNA', 'MYND', 'MYNZ', 'MYO', 'MYPS', 'MYPSW', 'MYRG', 'MYSZ', 'MYTE', 'N', 'NA', 'NAAS', 'NABL', 'NAC', 'NAD', 'NAII', 'NAK', 'NAMS', 'NAMSW', 'NAN', 'NAOV', 'NAPA', 'NARI', 'NAT', 'NATH', 'NATL', 'NATR', 'NAUT', 'NAVI', 'NAZ', 'NB', 'NBB', 'NBBK', 'NBH', 'NBHC', 'NBIX', 'NBN', 'NBR', 'NBSE', 'NBST', 'NBSTW', 'NBTB', 'NBTX', 'NBXG', 'NBY', 'NC', 'NCA', 'NCDL', 'NCI', 'NCL', 'NCLH', 'NCMI', 'NCNA', 'NCNC', 'NCNCW', 'NCNO', 'NCPL', 'NCRA', 'NCSM', 'NCTY', 'NCV', 'NCZ', 'NDAQ', 'NDLS', 'NDMO', 'NDP', 'NDRA', 'NDSN', 'NE', 'NEA', 'NECB', 'NEE', 'NEGG', 'NEM', 'NEN', 'NEO', 'NEOG', 'NEON', 'NEOV', 'NEOVW', 'NEP', 'NEPH', 'NERV', 'NET', 'NETD', 'NETDW', 'NEU', 'NEUE', 'NEWP', 'NEWT', 'NEWTI', 'NEWTL', 'NEWTZ', 'NEXA', 'NEXI', 'NEXN', 'NEXT', 'NFBK', 'NFE', 'NFG', 'NFGC', 'NFJ', 'NFLX', 'NFYS', 'NG', 'NGD', 'NGG', 'NGL', 'NGNE', 'NGS', 'NGVC', 'NGVT', 'NHC', 'NHI', 'NHS', 'NHTC', 'NI', 'NIC', 'NICE', 'NICK', 'NIE', 'NIM', 'NINE', 'NIO', 'NIOBW', 'NISN', 'NITO', 'NIU', 'NIVF', 'NIVFW', 'NJR', 'NKE', 'NKGN', 'NKGNW', 'NKLA', 'NKSH', 'NKTR', 'NKTX', 'NKX', 'NL', 'NLOP', 'NLSP', 'NLSPW', 'NLY', 'NMAI', 'NMCO', 'NMFC', 'NMFCZ', 'NMG', 'NMHI', 'NMHIW', 'NMI', 'NMIH', 'NML', 'NMM', 'NMR', 'NMRA', 'NMRK', 'NMS', 'NMT', 'NMTC', 'NMZ', 'NN', 'NNAG', 'NNAGR', 'NNAGU', 'NNAVW', 'NNBR', 'NNDM', 'NNI', 'NNN', 'NNOX', 'NNVC', 'NNY', 'NOA', 'NOAH', 'NOC', 'NODK', 'NOG', 'NOK', 'NOM', 'NOMD', 'NOTE', 'NOTV', 'NOV', 'NOVA', 'NOVT', 'NOVV', 'NOVVR', 'NOVVW', 'NOW', 'NPAB', 'NPCE', 'NPCT', 'NPFD', 'NPK', 'NPO', 'NPV', 'NPWR', 'NQP', 'NR', 'NRBO', 'NRC', 'NRDS', 'NRDY', 'NREF', 'NRG', 'NRGV', 'NRIM', 'NRIX', 'NRK', 'NRO', 'NRP', 'NRSN', 'NRSNW', 'NRT', 'NRUC', 'NRXP', 'NRXPW', 'NRXS', 'NS', 'NSA', 'NSC', 'NSIT', 'NSP', 'NSPR', 'NSS', 'NSSC', 'NSTS', 'NSYS', 'NTAP', 'NTB', 'NTBL', 'NTCT', 'NTES', 'NTG', 'NTGR', 'NTIC', 'NTIP', 'NTLA', 'NTNX', 'NTR', 'NTRA', 'NTRB', 'NTRBW', 'NTRP', 'NTRS', 'NTRSO', 'NTST', 'NTWK', 'NTZ', 'NU', 'NUE', 'NUKK', 'NUKKW', 'NURO', 'NUS', 'NUTX', 'NUV', 'NUVB', 'NUVL', 'NUVO', 'NUVOW', 'NUW', 'NUWE', 'NUZE', 'NVAC', 'NVACR', 'NVACW', 'NVAX', 'NVCR', 'NVCT', 'NVDA', 'NVEC', 'NVEE', 'NVEI', 'NVFY', 'NVG', 'NVGS', 'NVMI', 'NVNI', 'NVNIW', 'NVNO', 'NVO', 'NVOS', 'NVR', 'NVRI', 'NVRO', 'NVS', 'NVST', 'NVT', 'NVTS', 'NVVE', 'NVVEW', 'NVX', 'NWBI', 'NWE', 'NWFL', 'NWG', 'NWGL', 'NWL', 'NWLI', 'NWN', 'NWPX', 'NWS', 'NWSA', 'NWTN', 'NWTNW', 'NX', 'NXC', 'NXDT', 'NXE', 'NXG', 'NXGL', 'NXGLW', 'NXJ', 'NXL', 'NXLIW', 'NXN', 'NXP', 'NXPI', 'NXPL', 'NXPLW', 'NXRT', 'NXST', 'NXT', 'NXTC', 'NXTT', 'NXU', 'NYAX', 'NYC', 'NYCB', 'NYMT', 'NYMTL', 'NYMTM', 'NYMTN', 'NYMTZ', 'NYT', 'NYXH', 'NZF', 'O', 'OABI', 'OABIW', 'OAK', 'OAKU', 'OAKUR', 'OAKUW', 'OB', 'OBDC', 'OBDE', 'OBE', 'OBIO', 'OBK', 'OBLG', 'OBT', 'OC', 'OCAX', 'OCAXW', 'OCC', 'OCCI', 'OCCIN', 'OCCIO', 'OCEA', 'OCEAW', 'OCFC', 'OCFCP', 'OCFT', 'OCG', 'OCGN', 'OCN', 'OCS', 'OCSL', 'OCTO', 'OCUL', 'OCUP', 'OCX', 'ODC', 'ODD', 'ODFL', 'ODP', 'ODV', 'ODVWZ', 'OEC', 'OESX', 'OFG', 'OFIX', 'OFLX', 'OFS', 'OFSSH', 'OGE', 'OGEN', 'OGI', 'OGN', 'OGS', 'OHI', 'OI', 'OIA', 'OII', 'OIS', 'OKE', 'OKTA', 'OKYO', 'OLB', 'OLED', 'OLK', 'OLLI', 'OLMA', 'OLN', 'OLO', 'OLP', 'OLPX', 'OM', 'OMAB', 'OMC', 'OMCL', 'OMER', 'OMEX', 'OMF', 'OMGA', 'OMH', 'OMI', 'OMIC', 'OMQS', 'ON', 'ONB', 'ONBPO', 'ONBPP', 'ONCO', 'ONCT', 'ONCY', 'ONDS', 'ONEW', 'ONFO', 'ONFOW', 'ONL', 'ONMD', 'ONON', 'ONTF', 'ONTO', 'ONVO', 'ONYX', 'ONYXU', 'OOMA', 'OP', 'OPAD', 'OPAL', 'OPBK', 'OPCH', 'OPEN', 'OPFI', 'OPGN', 'OPHC', 'OPI', 'OPINL', 'OPK', 'OPOF', 'OPP', 'OPRA', 'OPRT', 'OPRX', 'OPT', 'OPTN', 'OPTT', 'OPTX', 'OPTXW', 'OPXS', 'OPY', 'OR', 'ORA', 'ORAN', 'ORC', 'ORCL', 'ORGN', 'ORGNW', 'ORGO', 'ORGS', 'ORI', 'ORIC', 'ORLA', 'ORLY', 'ORMP', 'ORN', 'ORRF', 'OSBC', 'OSCR', 'OSG', 'OSI', 'OSIS', 'OSK', 'OSPN', 'OSS', 'OST', 'OSUR', 'OSW', 'OTEX', 'OTIS', 'OTLK', 'OTLY', 'OTRK', 'OTTR', 'OUST', 'OUT', 'OVBC', 'OVID', 'OVLY', 'OVV', 'OWL', 'OWLT', 'OXBR', 'OXLC', 'OXLCL', 'OXLCM', 'OXLCN', 'OXLCO', 'OXLCP', 'OXLCZ', 'OXM', 'OXSQ', 'OXSQG', 'OXSQZ', 'OXY', 'OZ', 'OZK', 'OZKAP', 'P', 'PAA', 'PAAS', 'PAC', 'PACB', 'PACK', 'PACS', 'PAG', 'PAGP', 'PAGS', 'PAHC', 'PAI', 'PALI', 'PALT', 'PAM', 'PANL', 'PANW', 'PAPL', 'PAR', 'PARA', 'PARAA', 'PARR', 'PASG', 'PATH', 'PATK', 'PAVM', 'PAVMZ', 'PAVS', 'PAX', 'PAXS', 'PAY', 'PAYC', 'PAYO', 'PAYOW', 'PAYS', 'PAYX', 'PB', 'PBA', 'PBBK', 'PBF', 'PBFS', 'PBH', 'PBHC', 'PBI', 'PBM', 'PBMWW', 'PBPB', 'PBR', 'PBT', 'PBYI', 'PCAR', 'PCB', 'PCF', 'PCG', 'PCH', 'PCK', 'PCM', 'PCN', 'PCOR', 'PCQ', 'PCRX', 'PCSA', 'PCT', 'PCTTU', 'PCTTW', 'PCTY', 'PCVX', 'PCYO', 'PD', 'PDCO', 'PDD', 'PDEX', 'PDFS', 'PDI', 'PDLB', 'PDM', 'PDO', 'PDS', 'PDSB', 'PDT', 'PDX', 'PDYN', 'PDYNW', 'PEB', 'PEBK', 'PEBO', 'PECO', 'PED', 'PEG', 'PEGA', 'PEGR', 'PEGRW', 'PEGY', 'PEN', 'PENN', 'PEO', 'PEP', 'PEPG', 'PERF', 'PERI', 'PESI', 'PET', 'PETQ', 'PETS', 'PETWW', 'PETZ', 'PEV', 'PFBC', 'PFC', 'PFD', 'PFE', 'PFG', 'PFGC', 'PFH', 'PFIE', 'PFIS', 'PFL', 'PFLT', 'PFMT', 'PFN', 'PFO', 'PFS', 'PFSI', 'PFTA', 'PFTAU', 'PFTAW', 'PFX', 'PFXNZ', 'PG', 'PGC', 'PGEN', 'PGNY', 'PGP', 'PGR', 'PGRE', 'PGRU', 'PGY', 'PGYWW', 'PGZ', 'PH', 'PHAR', 'PHAT', 'PHD', 'PHG', 'PHGE', 'PHI', 'PHIN', 'PHIO', 'PHK', 'PHM', 'PHR', 'PHT', 'PHUN', 'PHVS', 'PHX', 'PHYT', 'PI', 'PII', 'PIII', 'PIK', 'PIM', 'PINC', 'PINE', 'PINS', 'PIPR', 'PIRS', 'PIXY', 'PJT', 'PK', 'PKBK', 'PKE', 'PKG', 'PKOH', 'PKST', 'PKX', 'PL', 'PLAB', 'PLAG', 'PLAO', 'PLAOW', 'PLAY', 'PLBC', 'PLBY', 'PLCE', 'PLD', 'PLG', 'PLL', 'PLMI', 'PLMIW', 'PLMJ', 'PLMJU', 'PLMJW', 'PLMR', 'PLNT', 'PLOW', 'PLPC', 'PLRX', 'PLSE', 'PLTK', 'PLTN', 'PLTNR', 'PLTNU', 'PLTNW', 'PLTR', 'PLUG', 'PLUR', 'PLUS', 'PLX', 'PLXS', 'PLYA', 'PLYM', 'PM', 'PMCB', 'PMD', 'PMEC', 'PMF', 'PMGM', 'PMGMW', 'PML', 'PMM', 'PMN', 'PMNT', 'PMO', 'PMT', 'PMTS', 'PMTU', 'PMVP', 'PMX', 'PNBK', 'PNC', 'PNF', 'PNFP', 'PNFPP', 'PNI', 'PNM', 'PNNT', 'PNR', 'PNRG', 'PNST', 'PNTG', 'PNW', 'POAI', 'POCI', 'PODC', 'PODD', 'POET', 'POLA', 'POOL', 'POR', 'POST', 'POWI', 'POWL', 'POWW', 'POWWP', 'PPBI', 'PPBT', 'PPC', 'PPG', 'PPIH', 'PPL', 'PPSI', 'PPT', 'PPTA', 'PPYA', 'PR', 'PRA', 'PRAA', 'PRAX', 'PRCH', 'PRCT', 'PRDO', 'PRE', 'PRENW', 'PRFT', 'PRFX', 'PRG', 'PRGO', 'PRGS', 'PRH', 'PRI', 'PRIF', 'PRIM', 'PRK', 'PRKS', 'PRLB', 'PRLD', 'PRLH', 'PRM', 'PRME', 'PRMW', 'PRO', 'PROC', 'PROCW', 'PROF', 'PROK', 'PROP', 'PROV', 'PRPH', 'PRPL', 'PRPO', 'PRQR', 'PRS', 'PRSO', 'PRST', 'PRSTW', 'PRT', 'PRTA', 'PRTC', 'PRTG', 'PRTH', 'PRTS', 'PRU', 'PRVA', 'PRZO', 'PSA', 'PSBD', 'PSEC', 'PSF', 'PSFE', 'PSHG', 'PSMT', 'PSN', 'PSNL', 'PSNY', 'PSNYW', 'PSO', 'PSQH', 'PSTG', 'PSTL', 'PSTV', 'PSTX', 'PSX', 'PT', 'PTA', 'PTC', 'PTCT', 'PTEN', 'PTGX', 'PTIX', 'PTIXW', 'PTLO', 'PTMN', 'PTN', 'PTON', 'PTPI', 'PTSI', 'PTVE', 'PTWO', 'PTWOU', 'PTWOW', 'PTY', 'PUBM', 'PUCK', 'PUCKU', 'PUCKW', 'PUK', 'PULM', 'PUMP', 'PVBC', 'PVH', 'PVL', 'PW', 'PWFL', 'PWM', 'PWOD', 'PWP', 'PWR', 'PWSC', 'PWUP', 'PX', 'PXDT', 'PXLW', 'PXS', 'PXSAP', 'PXSAW', 'PYCR', 'PYN', 'PYPD', 'PYPL', 'PYT', 'PYXS', 'PZC', 'PZG', 'PZZA', 'Q', 'QBTS', 'QCOM', 'QCRH', 'QD', 'QDEL', 'QDRO', 'QDROW', 'QETAR', 'QFIN', 'QGEN', 'QH', 'QIPT', 'QLGN', 'QLI', 'QLYS', 'QMCO', 'QNCX', 'QNRX', 'QNST', 'QOMOR', 'QQQX', 'QRHC', 'QRTEA', 'QRTEB', 'QRTEP', 'QRVO', 'QS', 'QSG', 'QSI', 'QSIAW', 'QSR', 'QTI', 'QTRX', 'QTTB', 'QTWO', 'QUAD', 'QUBT', 'QUIK', 'QURE', 'QVCC', 'QVCD', 'R', 'RA', 'RACE', 'RAIL', 'RAMP', 'RAND', 'RANI', 'RAPT', 'RARE', 'RAVE', 'RAYA', 'RBA', 'RBB', 'RBBN', 'RBC', 'RBCAA', 'RBCP', 'RBKB', 'RBLX', 'RBOT', 'RBRK', 'RBT', 'RC', 'RCAT', 'RCB', 'RCC', 'RCEL', 'RCFA', 'RCG', 'RCI', 'RCKT', 'RCKTW', 'RCKY', 'RCL', 'RCM', 'RCMT', 'RCON', 'RCRT', 'RCRTW', 'RCS', 'RCUS', 'RDCM', 'RDDT', 'RDFN', 'RDHL', 'RDI', 'RDIB', 'RDN', 'RDNT', 'RDUS', 'RDVT', 'RDW', 'RDWR', 'RDY', 'RDZN', 'RDZNW', 'REAL', 'REAX', 'REBN', 'REE', 'REFI', 'REFR', 'REG', 'REGCO', 'REGCP', 'REGN', 'REI', 'REKR', 'RELI', 'RELL', 'RELX', 'RELY', 'RENB', 'RENE', 'RENEU', 'RENT', 'REPL', 'REPX', 'RERE', 'RES', 'RETO', 'REVB', 'REVBW', 'REVG', 'REX', 'REXR', 'REYN', 'REZI', 'RF', 'RFAC', 'RFACR', 'RFACW', 'RFI', 'RFIL', 'RFL', 'RFM', 'RFMZ', 'RGA', 'RGC', 'RGCO', 'RGEN', 'RGF', 'RGLD', 'RGLS', 'RGNX', 'RGP', 'RGR', 'RGS', 'RGT', 'RGTI', 'RGTIW', 'RH', 'RHE', 'RHI', 'RHP', 'RICK', 'RIG', 'RIGL', 'RILY', 'RILYG', 'RILYK', 'RILYL', 'RILYM', 'RILYN', 'RILYO', 'RILYP', 'RILYT', 'RILYZ', 'RIO', 'RIOT', 'RITM', 'RIV', 'RIVN', 'RJF', 'RKDA', 'RKLB', 'RKT', 'RL', 'RLAY', 'RLGT', 'RLI', 'RLJ', 'RLMD', 'RLTY', 'RLX', 'RLYB', 'RM', 'RMAX', 'RMBI', 'RMBL', 'RMBS', 'RMCF', 'RMCO', 'RMCOW', 'RMD', 'RMI', 'RMM', 'RMMZ', 'RMNI', 'RMPL', 'RMR', 'RMT', 'RMTI', 'RNA', 'RNAC', 'RNAZ', 'RNG', 'RNGR', 'RNLX', 'RNP', 'RNR', 'RNST', 'RNW', 'RNWWW', 'RNXT', 'ROAD', 'ROCK', 'ROCL', 'ROCLW', 'ROG', 'ROIC', 'ROIV', 'ROK', 'ROKU', 'ROL', 'ROMA', 'ROOT', 'ROP', 'ROST', 'RPAY', 'RPD', 'RPHM', 'RPID', 'RPM', 'RPRX', 'RPTX', 'RQI', 'RR', 'RRAC', 'RRBI', 'RRC', 'RRGB', 'RRR', 'RRX', 'RS', 'RSF', 'RSG', 'RSI', 'RSKD', 'RSLS', 'RSSS', 'RSVR', 'RSVRW', 'RTC', 'RTO', 'RTX', 'RUM', 'RUMBW', 'RUN', 'RUSHA', 'RUSHB', 'RVLV', 'RVMD', 'RVMDW', 'RVNC', 'RVP', 'RVPH', 'RVPHW', 'RVSB', 'RVSN', 'RVSNW', 'RVT', 'RVTY', 'RVYL', 'RWAY', 'RWAYL', 'RWAYZ', 'RWOD', 'RWODR', 'RWODU', 'RWODW', 'RWT', 'RWTN', 'RXO', 'RXRX', 'RXST', 'RXT', 'RY', 'RYAAY', 'RYAM', 'RYAN', 'RYDE', 'RYI', 'RYN', 'RYTM', 'RZB', 'RZC', 'RZLT', 'S', 'SA', 'SABA', 'SABR', 'SABS', 'SABSW', 'SACC', 'SACH', 'SAFE', 'SAFT', 'SAGE', 'SAH', 'SAI', 'SAIA', 'SAIC', 'SAITW', 'SAJ', 'SAM', 'SAMG', 'SAN', 'SANA', 'SAND', 'SANG', 'SANM', 'SANW', 'SAP', 'SAR', 'SASR', 'SAT', 'SATL', 'SATS', 'SATX', 'SAVA', 'SAVE', 'SAY', 'SAZ', 'SB', 'SBAC', 'SBBA', 'SBCF', 'SBET', 'SBEV', 'SBFG', 'SBFM', 'SBFMW', 'SBGI', 'SBH', 'SBI', 'SBLK', 'SBOW', 'SBR', 'SBRA', 'SBS', 'SBSI', 'SBSW', 'SBT', 'SBUX', 'SBXC', 'SCCB', 'SCCC', 'SCCD', 'SCCE', 'SCCF', 'SCCG', 'SCCO', 'SCD', 'SCE', 'SCHL', 'SCHW', 'SCI', 'SCKT', 'SCL', 'SCLX', 'SCLXW', 'SCM', 'SCNI', 'SCOR', 'SCPH', 'SCPX', 'SCRM', 'SCRMU', 'SCRMW', 'SCS', 'SCSC', 'SCVL', 'SCWO', 'SCWX', 'SCX', 'SCYX', 'SD', 'SDA', 'SDAWW', 'SDGR', 'SDHC', 'SDHY', 'SDIG', 'SDOT', 'SDPI', 'SDRL', 'SE', 'SEAL', 'SEAT', 'SEATW', 'SEB', 'SEDA', 'SEDG', 'SEE', 'SEED', 'SEEL', 'SEER', 'SEIC', 'SELF', 'SELX', 'SEM', 'SEMR', 'SENEA', 'SENEB', 'SENS', 'SEPA', 'SEPAU', 'SER', 'SERA', 'SERV', 'SES', 'SEVN', 'SEZL', 'SF', 'SFB', 'SFBC', 'SFBS', 'SFIX', 'SFL', 'SFM', 'SFNC', 'SFST', 'SFWL', 'SG', 'SGA', 'SGBX', 'SGC', 'SGD', 'SGE', 'SGH', 'SGHC', 'SGHT', 'SGLY', 'SGMA', 'SGML', 'SGMO', 'SGMT', 'SGN', 'SGRP', 'SGRY', 'SGU', 'SHAK', 'SHBI', 'SHC', 'SHCO', 'SHCR', 'SHCRW', 'SHEL', 'SHEN', 'SHFS', 'SHFSW', 'SHG', 'SHIM', 'SHIP', 'SHLS', 'SHLT', 'SHMD', 'SHMDW', 'SHO', 'SHOO', 'SHOP', 'SHOT', 'SHOTW', 'SHPH', 'SHPW', 'SHPWW', 'SHW', 'SHYF', 'SIBN', 'SID', 'SIDU', 'SIEB', 'SIF', 'SIFY', 'SIG', 'SIGA', 'SIGI', 'SIGIP', 'SII', 'SILC', 'SILK', 'SILO', 'SILV', 'SIM', 'SIMO', 'SINT', 'SIRI', 'SISI', 'SITC', 'SITE', 'SITM', 'SIX', 'SJ', 'SJM', 'SJT', 'SJW', 'SKE', 'SKGR', 'SKGRU', 'SKGRW', 'SKIL', 'SKIN', 'SKLZ', 'SKM', 'SKT', 'SKWD', 'SKX', 'SKY', 'SKYE', 'SKYH', 'SKYT', 'SKYW', 'SKYX', 'SLAB', 'SLAM', 'SLAMW', 'SLB', 'SLCA', 'SLDB', 'SLDP', 'SLDPW', 'SLE', 'SLF', 'SLG', 'SLGL', 'SLGN', 'SLI', 'SLM', 'SLMBP', 'SLN', 'SLNA', 'SLNAW', 'SLND', 'SLNG', 'SLNH', 'SLNHP', 'SLNO', 'SLP', 'SLQT', 'SLRC', 'SLRN', 'SLRX', 'SLS', 'SLSR', 'SLVM', 'SM', 'SMAR', 'SMBC', 'SMBK', 'SMCI', 'SMFG', 'SMFL', 'SMG', 'SMHI', 'SMID', 'SMLP', 'SMLR', 'SMMF', 'SMMT', 'SMP', 'SMPL', 'SMR', 'SMRT', 'SMSI', 'SMTC', 'SMTI', 'SMWB', 'SMX', 'SMXT', 'SMXWW', 'SN', 'SNA', 'SNAL', 'SNAP', 'SNAX', 'SNAXW', 'SNBR', 'SNCR', 'SNCRL', 'SNCY', 'SND', 'SNDA', 'SNDL', 'SNDR', 'SNDX', 'SNES', 'SNEX', 'SNFCA', 'SNGX', 'SNN', 'SNOA', 'SNOW', 'SNPO', 'SNPS', 'SNPX', 'SNSE', 'SNT', 'SNTG', 'SNTI', 'SNV', 'SNX', 'SNY', 'SO', 'SOAR', 'SOBR', 'SOC', 'SOFI', 'SOGP', 'SOHO', 'SOHOB', 'SOHON', 'SOHOO', 'SOHU', 'SOI', 'SOJC', 'SOJD', 'SOJE', 'SOL', 'SOLV', 'SON', 'SOND', 'SONDW', 'SONM', 'SONN', 'SONO', 'SONY', 'SOPA', 'SOPH', 'SOR', 'SOS', 'SOTK', 'SOUN', 'SOUNW', 'SOWG', 'SP', 'SPB', 'SPCB', 'SPCE', 'SPE', 'SPEC', 'SPFI', 'SPG', 'SPGC', 'SPGI', 'SPH', 'SPHR', 'SPI', 'SPIR', 'SPKL', 'SPKLW', 'SPLP', 'SPNS', 'SPNT', 'SPOK', 'SPOT', 'SPPL', 'SPR', 'SPRB', 'SPRC', 'SPRO', 'SPRU', 'SPRY', 'SPSC', 'SPT', 'SPTN', 'SPWH', 'SPWR', 'SPXC', 'SPXX', 'SQ', 'SQFT', 'SQFTP', 'SQFTW', 'SQM', 'SQNS', 'SQSP', 'SR', 'SRAD', 'SRBK', 'SRCE', 'SRCL', 'SRDX', 'SRE', 'SREA', 'SRFM', 'SRG', 'SRI', 'SRL', 'SRM', 'SRPT', 'SRRK', 'SRTS', 'SRV', 'SRZN', 'SRZNW', 'SSB', 'SSBI', 'SSBK', 'SSD', 'SSIC', 'SSKN', 'SSL', 'SSNC', 'SSNT', 'SSP', 'SSRM', 'SSSS', 'SSSSL', 'SST', 'SSTI', 'SSTK', 'SSY', 'SSYS', 'ST', 'STAA', 'STAF', 'STAG', 'STBA', 'STBX', 'STC', 'STCN', 'STE', 'STEL', 'STEM', 'STEP', 'STER', 'STEW', 'STG', 'STGW', 'STHO', 'STI', 'STIM', 'STK', 'STKH', 'STKL', 'STKS', 'STLA', 'STLD', 'STM', 'STN', 'STNE', 'STNG', 'STOK', 'STR', 'STRA', 'STRL', 'STRM', 'STRO', 'STRR', 'STRRP', 'STRS', 'STRT', 'STRW', 'STSS', 'STSSW', 'STT', 'STTK', 'STVN', 'STWD', 'STX', 'STXS', 'STZ', 'SU', 'SUGP', 'SUI', 'SUM', 'SUN', 'SUP', 'SUPN', 'SUPV', 'SURG', 'SURGW', 'SUUN', 'SUZ', 'SVC', 'SVII', 'SVIIR', 'SVM', 'SVMH', 'SVMHW', 'SVRA', 'SVRE', 'SVREW', 'SVT', 'SVV', 'SWAG', 'SWAGW', 'SWAV', 'SWBI', 'SWI', 'SWIM', 'SWIN', 'SWK', 'SWKH', 'SWKHL', 'SWKS', 'SWN', 'SWSS', 'SWSSW', 'SWTX', 'SWVL', 'SWVLW', 'SWX', 'SWZ', 'SXC', 'SXI', 'SXT', 'SXTC', 'SXTP', 'SXTPW', 'SY', 'SYBT', 'SYBX', 'SYF', 'SYK', 'SYM', 'SYNA', 'SYNX', 'SYPR', 'SYRA', 'SYRE', 'SYRS', 'SYT', 'SYTA', 'SYTAW', 'SYY', 'T', 'TAC', 'TACT', 'TAIT', 'TAK', 'TAL', 'TALK', 'TALKW', 'TALO', 'TANH', 'TAOP', 'TAP', 'TARA', 'TARO', 'TARS', 'TASK', 'TAST', 'TATT', 'TAYD', 'TBB', 'TBBB', 'TBBK', 'TBC', 'TBI', 'TBIO', 'TBLA', 'TBLAW', 'TBLD', 'TBLT', 'TBMC', 'TBNK', 'TBPH', 'TBRG', 'TC', 'TCBC', 'TCBI', 'TCBIO', 'TCBK', 'TCBP', 'TCBPW', 'TCBS', 'TCBX', 'TCI', 'TCJH', 'TCMD', 'TCOA', 'TCOM', 'TCON', 'TCPC', 'TCRT', 'TCRX', 'TCS', 'TCTM', 'TCX', 'TD', 'TDC', 'TDCX', 'TDF', 'TDG', 'TDOC', 'TDS', 'TDUP', 'TDW', 'TDY', 'TEAF', 'TEAM', 'TECH', 'TECK', 'TECTP', 'TEF', 'TEI', 'TEL', 'TELA', 'TELL', 'TELO', 'TELZ', 'TENB', 'TENK', 'TENKR', 'TENX', 'TEO', 'TER', 'TERN', 'TETE', 'TEVA', 'TEX', 'TFC', 'TFFP', 'TFII', 'TFIN', 'TFINP', 'TFPM', 'TFSA', 'TFSL', 'TFX', 'TG', 'TGAA', 'TGAN', 'TGB', 'TGI', 'TGL', 'TGLS', 'TGNA', 'TGS', 'TGT', 'TGTX', 'TH', 'THAR', 'THC', 'THCH', 'THCP', 'THFF', 'THG', 'THM', 'THMO', 'THO', 'THQ', 'THR', 'THRD', 'THRM', 'THRY', 'THS', 'THTX', 'THW', 'TIGO', 'TIGR', 'TIL', 'TILE', 'TIMB', 'TIPT', 'TIRX', 'TISI', 'TITN', 'TIVC', 'TIXT', 'TJX', 'TK', 'TKC', 'TKLF', 'TKNO', 'TKO', 'TKR', 'TLF', 'TLGY', 'TLGYW', 'TLIS', 'TLK', 'TLPH', 'TLRY', 'TLS', 'TLSA', 'TLSI', 'TLSIW', 'TLYS', 'TM', 'TMC', 'TMCI', 'TMCWW', 'TMDX', 'TME', 'TMHC', 'TMO', 'TMP', 'TMQ', 'TMTC', 'TMTCR', 'TMTCU', 'TMUS', 'TNC', 'TNDM', 'TNET', 'TNGX', 'TNK', 'TNL', 'TNON', 'TNONW', 'TNP', 'TNXP', 'TNYA', 'TOI', 'TOIIW', 'TOL', 'TOMZ', 'TOON', 'TOP', 'TOPS', 'TORO', 'TOST', 'TOUR', 'TOVX', 'TOWN', 'TPB', 'TPC', 'TPCS', 'TPET', 'TPG', 'TPGXL', 'TPH', 'TPHS', 'TPIC', 'TPL', 'TPR', 'TPST', 'TPTA', 'TPVG', 'TPX', 'TPZ', 'TR', 'TRAK', 'TRAW', 'TRC', 'TRDA', 'TREE', 'TREX', 'TRGP', 'TRI', 'TRIB', 'TRIN', 'TRINL', 'TRINZ', 'TRIP', 'TRIS', 'TRMB', 'TRMD', 'TRMK', 'TRML', 'TRN', 'TRNO', 'TRNR', 'TRNS', 'TRON', 'TRONU', 'TRONW', 'TROO', 'TROW', 'TROX', 'TRP', 'TRS', 'TRSG', 'TRST', 'TRT', 'TRTL', 'TRTN', 'TRTX', 'TRU', 'TRUE', 'TRUG', 'TRUP', 'TRV', 'TRVG', 'TRVI', 'TRVN', 'TRX', 'TS', 'TSAT', 'TSBK', 'TSBX', 'TSCO', 'TSE', 'TSEM', 'TSHA', 'TSI', 'TSLA', 'TSLX', 'TSM', 'TSN', 'TSQ', 'TSRI', 'TSVT', 'TT', 'TTC', 'TTD', 'TTE', 'TTEC', 'TTEK', 'TTGT', 'TTI', 'TTMI', 'TTNP', 'TTOO', 'TTP', 'TTSH', 'TTWO', 'TU', 'TUP', 'TURB', 'TURN', 'TUSK', 'TUYA', 'TV', 'TVC', 'TVE', 'TVGN', 'TVGNW', 'TVTX', 'TW', 'TWG', 'TWI', 'TWIN', 'TWKS', 'TWLO', 'TWLV', 'TWLVW', 'TWN', 'TWO', 'TWOU', 'TWST', 'TX', 'TXG', 'TXMD', 'TXN', 'TXO', 'TXRH', 'TXT', 'TY', 'TYG', 'TYGO', 'TYL', 'TYRA', 'TZOO', 'U', 'UA', 'UAA', 'UAL', 'UAMY', 'UAN', 'UAVS', 'UBCP', 'UBER', 'UBFO', 'UBS', 'UBSI', 'UBX', 'UBXG', 'UCAR', 'UCBI', 'UCBIO', 'UCL', 'UCTT', 'UDMY', 'UDR', 'UE', 'UEC', 'UEIC', 'UFCS', 'UFI', 'UFPI', 'UFPT', 'UG', 'UGI', 'UGIC', 'UGP', 'UGRO', 'UHAL', 'UHG', 'UHGWW', 'UHS', 'UHT', 'UI', 'UIS', 'UK', 'UKOMW', 'UL', 'ULBI', 'ULCC', 'ULH', 'ULS', 'ULTA', 'ULY', 'UMAC', 'UMBF', 'UMC', 'UMH', 'UNB', 'UNCY', 'UNF', 'UNFI', 'UNH', 'UNIT', 'UNM', 'UNMA', 'UNP', 'UNTY', 'UONE', 'UONEK', 'UP', 'UPBD', 'UPC', 'UPLD', 'UPS', 'UPST', 'UPWK', 'UPXI', 'URBN', 'URG', 'URGN', 'URI', 'UROY', 'USA', 'USAC', 'USAP', 'USAS', 'USAU', 'USB', 'USCB', 'USEA', 'USEG', 'USFD', 'USGO', 'USGOW', 'USIO', 'USLM', 'USM', 'USNA', 'USPH', 'UTF', 'UTG', 'UTHR', 'UTI', 'UTL', 'UTMD', 'UTSI', 'UTZ', 'UUU', 'UUUU', 'UVE', 'UVSP', 'UVV', 'UWMC', 'UXIN', 'UZD', 'UZE', 'UZF', 'V', 'VABK', 'VAC', 'VAL', 'VALE', 'VALN', 'VALU', 'VANI', 'VATE', 'VAXX', 'VBF', 'VBFC', 'VBIV', 'VBNK', 'VBTX', 'VC', 'VCEL', 'VCIG', 'VCNX', 'VCSA', 'VCTR', 'VCV', 'VCXB', 'VCYT', 'VECO', 'VEEE', 'VEEV', 'VEL', 'VEON', 'VERA', 'VERB', 'VERI', 'VERO', 'VERU', 'VERV', 'VERX', 'VERY', 'VET', 'VEV', 'VFC', 'VFF', 'VFL', 'VFS', 'VFSWW', 'VGAS', 'VGASW', 'VGI', 'VGM', 'VGR', 'VGZ', 'VHC', 'VHI', 'VIA', 'VIASP', 'VIAV', 'VICI', 'VICR', 'VIGL', 'VIK', 'VINC', 'VINE', 'VINO', 'VINP', 'VIOT', 'VIPS', 'VIR', 'VIRC', 'VIRI', 'VIRT', 'VIRX', 'VISL', 'VIST', 'VITL', 'VIV', 'VIVK', 'VKI', 'VKQ', 'VKTX', 'VLCN', 'VLD', 'VLGEA', 'VLN', 'VLO', 'VLRS', 'VLT', 'VLTO', 'VLY', 'VLYPO', 'VLYPP', 'VMAR', 'VMC', 'VMCA', 'VMD', 'VMEO', 'VMI', 'VMO', 'VNCE', 'VNDA', 'VNET', 'VNO', 'VNOM', 'VNRX', 'VNT', 'VOC', 'VOD', 'VOR', 'VOXR', 'VOXX', 'VOYA', 'VPG', 'VPV', 'VRA', 'VRAR', 'VRAX', 'VRCA', 'VRDN', 'VRE', 'VREX', 'VRM', 'VRME', 'VRMEW', 'VRNA', 'VRNS', 'VRNT', 'VRPX', 'VRRM', 'VRSK', 'VRSN', 'VRT', 'VRTS', 'VRTX', 'VS', 'VSAC', 'VSAT', 'VSCO', 'VSEC', 'VSH', 'VSME', 'VSSYW', 'VST', 'VSTA', 'VSTE', 'VSTEW', 'VSTM', 'VSTO', 'VSTS', 'VTAK', 'VTEX', 'VTGN', 'VTLE', 'VTMX', 'VTN', 'VTNR', 'VTOL', 'VTR', 'VTRS', 'VTRU', 'VTS', 'VTSI', 'VTVT', 'VTYX', 'VUZI', 'VVI', 'VVOS', 'VVPR', 'VVR', 'VVV', 'VVX', 'VWE', 'VWEWW', 'VXRT', 'VYGR', 'VYNE', 'VYX', 'VZIO', 'VZLA', 'W', 'WAB', 'WABC', 'WAFD', 'WAFDP', 'WAFU', 'WAL', 'WALD', 'WALDW', 'WASH', 'WAT', 'WATT', 'WAVD', 'WAVE', 'WAVS', 'WAVSW', 'WB', 'WBA', 'WBD', 'WBS', 'WBUY', 'WBX', 'WCC', 'WCN', 'WD', 'WDAY', 'WDC', 'WDFC', 'WDH', 'WDI', 'WDS', 'WEA', 'WEAV', 'WEC', 'WEL', 'WELL', 'WEN', 'WERN', 'WES', 'WEST', 'WESTW', 'WETH', 'WEX', 'WEYS', 'WF', 'WFC', 'WFCF', 'WFG', 'WFRD', 'WGO', 'WGS', 'WGSWW', 'WH', 'WHD', 'WHF', 'WHFCL', 'WHG', 'WHLM', 'WHLR', 'WHLRD', 'WHLRP', 'WHR', 'WIA', 'WILC', 'WIMI', 'WINA', 'WING', 'WINT', 'WINV', 'WINVR', 'WINVW', 'WIRE', 'WISA', 'WISH', 'WIT', 'WIW', 'WIX', 'WK', 'WKC', 'WKEY', 'WKHS', 'WKME', 'WKSP', 'WKSPW', 'WLDN', 'WLDS', 'WLDSW', 'WLFC', 'WLGS', 'WLK', 'WLKP', 'WLY', 'WLYB', 'WM', 'WMB', 'WMG', 'WMK', 'WMPN', 'WMS', 'WMT', 'WNC', 'WNEB', 'WNS', 'WNW', 'WOLF', 'WOOF', 'WOR', 'WORX', 'WOW', 'WPC', 'WPM', 'WPP', 'WPRT', 'WRAP', 'WRB', 'WRBY', 'WRK', 'WRLD', 'WRN', 'WRNT', 'WS', 'WSBC', 'WSBCP', 'WSBF', 'WSC', 'WSFS', 'WSM', 'WSO', 'WSR', 'WST', 'WT', 'WTBA', 'WTFC', 'WTFCM', 'WTFCP', 'WTI', 'WTM', 'WTMA', 'WTO', 'WTRG', 'WTS', 'WTTR', 'WTW', 'WU', 'WULF', 'WVE', 'WVVI', 'WVVIP', 'WW', 'WWD', 'WWR', 'WWW', 'WY', 'WYNN', 'WYY', 'X', 'XAIR', 'XBIO', 'XBIOW', 'XBIT', 'XBP', 'XBPEW', 'XCUR', 'XEL', 'XELA', 'XELAP', 'XELB', 'XENE', 'XERS', 'XFIN', 'XFINW', 'XFLT', 'XFOR', 'XGN', 'XHR', 'XIN', 'XLO', 'XMTR', 'XNCR', 'XNET', 'XOM', 'XOMA', 'XOMAO', 'XOMAP', 'XOS', 'XOSWW', 'XP', 'XPEL', 'XPER', 'XPEV', 'XPL', 'XPO', 'XPOF', 'XPON', 'XPRO', 'XRAY', 'XRTX', 'XRX', 'XTIA', 'XTKG', 'XTLB', 'XTNT', 'XWEL', 'XXII', 'XYF', 'XYL', 'XYLO', 'Y', 'YALA', 'YCBD', 'YELP', 'YETI', 'YEXT', 'YGMZ', 'YHGJ', 'YI', 'YIBO', 'YJ', 'YMAB', 'YMM', 'YORW', 'YOSH', 'YOTA', 'YOU', 'YPF', 'YQ', 'YRD', 'YS', 'YSBPW', 'YSG', 'YTEN', 'YTRA', 'YUM', 'YUMC', 'YY', 'YYAI', 'YYGH', 'Z', 'ZAPP', 'ZAPPW', 'ZBAO', 'ZBH', 'ZBRA', 'ZCAR', 'ZCARW', 'ZCMD', 'ZD', 'ZDGE', 'ZENV', 'ZEO', 'ZEOWW', 'ZEPP', 'ZETA', 'ZEUS', 'ZFOX', 'ZFOXW', 'ZG', 'ZGN', 'ZH', 'ZI', 'ZIM', 'ZIMV', 'ZION', 'ZIONL', 'ZIONO', 'ZIONP', 'ZIP', 'ZJYL', 'ZKH', 'ZKIN', 'ZLAB', 'ZLS', 'ZM', 'ZNTL', 'ZOM', 'ZONE', 'ZOOZ', 'ZOOZW', 'ZPTA', 'ZPTAW', 'ZS', 'ZTEK', 'ZTO', 'ZTR', 'ZTS', 'ZUMZ', 'ZUO', 'ZURA', 'ZURAW', 'ZVIA', 'ZVRA', 'ZVSA', 'ZWS', 'ZYME', 'ZYXI'],
    USER_WATCHLIST :[],
    USER_DATA_FOUND : [],
    STOCKS_DATA_FOUND : [],
    ALL_DATA_STOCKS :[
      {
          "Meta Data": {
              "1. Information": "Daily Time Series with Splits and Dividend Events",
              "2. Symbol": "IBM",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "165.0",
                  "2. high": "166.61",
                  "3. low": "164.92",
                  "4. close": "165.71",
                  "5. adjusted close": "165.71",
                  "6. volume": "3400405",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-05-02": {
                  "1. open": "164.35",
                  "2. high": "164.88",
                  "3. low": "162.62",
                  "4. close": "164.69",
                  "5. adjusted close": "164.69",
                  "6. volume": "3829853",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-05-01": {
                  "1. open": "165.69",
                  "2. high": "166.27",
                  "3. low": "164.3",
                  "4. close": "164.43",
                  "5. adjusted close": "164.43",
                  "6. volume": "4030960",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-30": {
                  "1. open": "166.49",
                  "2. high": "166.76",
                  "3. low": "165.2605",
                  "4. close": "166.2",
                  "5. adjusted close": "166.2",
                  "6. volume": "6011634",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-29": {
                  "1. open": "167.4",
                  "2. high": "168.22",
                  "3. low": "166.225",
                  "4. close": "167.43",
                  "5. adjusted close": "167.43",
                  "6. volume": "5263342",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-26": {
                  "1. open": "167.5",
                  "2. high": "167.87",
                  "3. low": "165.73",
                  "4. close": "167.13",
                  "5. adjusted close": "167.13",
                  "6. volume": "8983796",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-25": {
                  "1. open": "168.2",
                  "2. high": "172.45",
                  "3. low": "165.66",
                  "4. close": "168.91",
                  "5. adjusted close": "168.91",
                  "6. volume": "16702150",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-24": {
                  "1. open": "183.17",
                  "2. high": "184.29",
                  "3. low": "181.4",
                  "4. close": "184.1",
                  "5. adjusted close": "184.1",
                  "6. volume": "7616643",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-23": {
                  "1. open": "182.73",
                  "2. high": "184.68",
                  "3. low": "179.0",
                  "4. close": "182.19",
                  "5. adjusted close": "182.19",
                  "6. volume": "5950229",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-22": {
                  "1. open": "182.45",
                  "2. high": "183.315",
                  "3. low": "180.45",
                  "4. close": "181.9",
                  "5. adjusted close": "181.9",
                  "6. volume": "3076451",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-19": {
                  "1. open": "182.43",
                  "2. high": "182.8",
                  "3. low": "180.57",
                  "4. close": "181.58",
                  "5. adjusted close": "181.58",
                  "6. volume": "3037990",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-18": {
                  "1. open": "182.35",
                  "2. high": "183.46",
                  "3. low": "180.17",
                  "4. close": "181.47",
                  "5. adjusted close": "181.47",
                  "6. volume": "2886733",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-17": {
                  "1. open": "184.16",
                  "2. high": "184.67",
                  "3. low": "181.78",
                  "4. close": "183.1",
                  "5. adjusted close": "183.1",
                  "6. volume": "3003033",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-16": {
                  "1. open": "185.59",
                  "2. high": "185.71",
                  "3. low": "182.86",
                  "4. close": "183.75",
                  "5. adjusted close": "183.75",
                  "6. volume": "4473654",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-15": {
                  "1. open": "185.57",
                  "2. high": "187.48",
                  "3. low": "180.88",
                  "4. close": "181.25",
                  "5. adjusted close": "181.25",
                  "6. volume": "3528140",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-12": {
                  "1. open": "184.0",
                  "2. high": "185.1699",
                  "3. low": "181.685",
                  "4. close": "182.27",
                  "5. adjusted close": "182.27",
                  "6. volume": "3547378",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-11": {
                  "1. open": "186.04",
                  "2. high": "186.795",
                  "3. low": "184.58",
                  "4. close": "185.9",
                  "5. adjusted close": "185.9",
                  "6. volume": "2861736",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-10": {
                  "1. open": "187.42",
                  "2. high": "187.915",
                  "3. low": "185.52",
                  "4. close": "186.04",
                  "5. adjusted close": "186.04",
                  "6. volume": "3081915",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-09": {
                  "1. open": "190.54",
                  "2. high": "191.25",
                  "3. low": "186.66",
                  "4. close": "189.31",
                  "5. adjusted close": "189.31",
                  "6. volume": "2790673",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-08": {
                  "1. open": "189.24",
                  "2. high": "190.24",
                  "3. low": "188.9118",
                  "4. close": "189.82",
                  "5. adjusted close": "189.82",
                  "6. volume": "2673611",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-05": {
                  "1. open": "188.59",
                  "2. high": "190.32",
                  "3. low": "188.02",
                  "4. close": "189.14",
                  "5. adjusted close": "189.14",
                  "6. volume": "2012428",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-04": {
                  "1. open": "192.0",
                  "2. high": "193.28",
                  "3. low": "187.34",
                  "4. close": "187.94",
                  "5. adjusted close": "187.94",
                  "6. volume": "2924438",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-03": {
                  "1. open": "188.6",
                  "2. high": "191.35",
                  "3. low": "188.485",
                  "4. close": "190.9",
                  "5. adjusted close": "190.9",
                  "6. volume": "2818910",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-02": {
                  "1. open": "189.14",
                  "2. high": "189.8",
                  "3. low": "187.6",
                  "4. close": "188.88",
                  "5. adjusted close": "188.88",
                  "6. volume": "2689711",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-04-01": {
                  "1. open": "190.0",
                  "2. high": "190.46",
                  "3. low": "188.52",
                  "4. close": "189.83",
                  "5. adjusted close": "189.83",
                  "6. volume": "2362586",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-28": {
                  "1. open": "190.94",
                  "2. high": "191.9299",
                  "3. low": "190.34",
                  "4. close": "190.96",
                  "5. adjusted close": "190.96",
                  "6. volume": "3742169",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-27": {
                  "1. open": "189.6",
                  "2. high": "190.96",
                  "3. low": "188.6",
                  "4. close": "190.8",
                  "5. adjusted close": "190.8",
                  "6. volume": "3693305",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-26": {
                  "1. open": "189.02",
                  "2. high": "190.0",
                  "3. low": "188.5",
                  "4. close": "188.5",
                  "5. adjusted close": "188.5",
                  "6. volume": "4229535",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-25": {
                  "1. open": "190.26",
                  "2. high": "190.82",
                  "3. low": "188.75",
                  "4. close": "188.79",
                  "5. adjusted close": "188.79",
                  "6. volume": "3718289",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-22": {
                  "1. open": "192.0",
                  "2. high": "192.985",
                  "3. low": "190.51",
                  "4. close": "190.84",
                  "5. adjusted close": "190.84",
                  "6. volume": "3988398",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-21": {
                  "1. open": "193.0",
                  "2. high": "193.37",
                  "3. low": "190.01",
                  "4. close": "191.9",
                  "5. adjusted close": "191.9",
                  "6. volume": "6013561",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-20": {
                  "1. open": "192.87",
                  "2. high": "193.98",
                  "3. low": "191.31",
                  "4. close": "193.96",
                  "5. adjusted close": "193.96",
                  "6. volume": "3238643",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-19": {
                  "1. open": "191.49",
                  "2. high": "193.58",
                  "3. low": "190.28",
                  "4. close": "193.34",
                  "5. adjusted close": "193.34",
                  "6. volume": "5317341",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-18": {
                  "1. open": "191.7",
                  "2. high": "193.23",
                  "3. low": "190.32",
                  "4. close": "191.69",
                  "5. adjusted close": "191.69",
                  "6. volume": "5410562",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-15": {
                  "1. open": "191.99",
                  "2. high": "193.0573",
                  "3. low": "190.7",
                  "4. close": "191.07",
                  "5. adjusted close": "191.07",
                  "6. volume": "8828184",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-14": {
                  "1. open": "196.95",
                  "2. high": "197.748",
                  "3. low": "192.12",
                  "4. close": "193.43",
                  "5. adjusted close": "193.43",
                  "6. volume": "4102202",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-13": {
                  "1. open": "197.55",
                  "2. high": "198.1",
                  "3. low": "195.32",
                  "4. close": "196.7",
                  "5. adjusted close": "196.7",
                  "6. volume": "3960737",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-12": {
                  "1. open": "192.46",
                  "2. high": "199.18",
                  "3. low": "192.15",
                  "4. close": "197.78",
                  "5. adjusted close": "197.78",
                  "6. volume": "5862512",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-11": {
                  "1. open": "195.09",
                  "2. high": "195.38",
                  "3. low": "190.88",
                  "4. close": "191.73",
                  "5. adjusted close": "191.73",
                  "6. volume": "4712688",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-08": {
                  "1. open": "196.06",
                  "2. high": "197.77",
                  "3. low": "194.38",
                  "4. close": "195.95",
                  "5. adjusted close": "195.95",
                  "6. volume": "3943113",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-07": {
                  "1. open": "197.58",
                  "2. high": "198.73",
                  "3. low": "196.14",
                  "4. close": "196.54",
                  "5. adjusted close": "196.54",
                  "6. volume": "4604458",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-06": {
                  "1. open": "193.5",
                  "2. high": "198.13",
                  "3. low": "192.96",
                  "4. close": "196.16",
                  "5. adjusted close": "196.16",
                  "6. volume": "6945818",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-05": {
                  "1. open": "192.0",
                  "2. high": "193.94",
                  "3. low": "190.57",
                  "4. close": "191.95",
                  "5. adjusted close": "191.95",
                  "6. volume": "5653641",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-04": {
                  "1. open": "187.76",
                  "2. high": "193.898",
                  "3. low": "187.6",
                  "4. close": "193.06",
                  "5. adjusted close": "193.06",
                  "6. volume": "7938266",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-03-01": {
                  "1. open": "185.49",
                  "2. high": "188.38",
                  "3. low": "185.18",
                  "4. close": "188.2",
                  "5. adjusted close": "188.2",
                  "6. volume": "4018354",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-29": {
                  "1. open": "186.15",
                  "2. high": "186.8495",
                  "3. low": "184.69",
                  "4. close": "185.03",
                  "5. adjusted close": "185.03",
                  "6. volume": "6458487",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-28": {
                  "1. open": "184.63",
                  "2. high": "185.37",
                  "3. low": "183.55",
                  "4. close": "185.3",
                  "5. adjusted close": "185.3",
                  "6. volume": "3216345",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-27": {
                  "1. open": "184.16",
                  "2. high": "185.13",
                  "3. low": "182.62",
                  "4. close": "184.87",
                  "5. adjusted close": "184.87",
                  "6. volume": "3641378",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-26": {
                  "1. open": "185.6",
                  "2. high": "186.125",
                  "3. low": "184.06",
                  "4. close": "184.13",
                  "5. adjusted close": "184.13",
                  "6. volume": "4620815",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-23": {
                  "1. open": "184.9",
                  "2. high": "186.455",
                  "3. low": "184.57",
                  "4. close": "185.72",
                  "5. adjusted close": "185.72",
                  "6. volume": "3433800",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-22": {
                  "1. open": "182.45",
                  "2. high": "184.55",
                  "3. low": "181.93",
                  "4. close": "184.21",
                  "5. adjusted close": "184.21",
                  "6. volume": "5078398",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-21": {
                  "1. open": "182.56",
                  "2. high": "183.03",
                  "3. low": "178.75",
                  "4. close": "179.7",
                  "5. adjusted close": "179.7",
                  "6. volume": "4728473",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-20": {
                  "1. open": "187.64",
                  "2. high": "188.77",
                  "3. low": "183.06",
                  "4. close": "183.44",
                  "5. adjusted close": "183.44",
                  "6. volume": "4247181",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-16": {
                  "1. open": "186.63",
                  "2. high": "188.95",
                  "3. low": "185.9452",
                  "4. close": "187.64",
                  "5. adjusted close": "187.64",
                  "6. volume": "4842840",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-15": {
                  "1. open": "183.62",
                  "2. high": "186.98",
                  "3. low": "183.62",
                  "4. close": "186.87",
                  "5. adjusted close": "186.87",
                  "6. volume": "4714301",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-14": {
                  "1. open": "185.0",
                  "2. high": "185.0",
                  "3. low": "182.26",
                  "4. close": "183.57",
                  "5. adjusted close": "183.57",
                  "6. volume": "3173391",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-13": {
                  "1. open": "184.28",
                  "2. high": "184.77",
                  "3. low": "182.36",
                  "4. close": "183.7",
                  "5. adjusted close": "183.7",
                  "6. volume": "4290453",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-12": {
                  "1. open": "185.9",
                  "2. high": "186.48",
                  "3. low": "184.03",
                  "4. close": "186.16",
                  "5. adjusted close": "186.16",
                  "6. volume": "4724021",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-09": {
                  "1. open": "184.44",
                  "2. high": "187.18",
                  "3. low": "183.85",
                  "4. close": "186.34",
                  "5. adjusted close": "186.34",
                  "6. volume": "5064641",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-08": {
                  "1. open": "182.63",
                  "2. high": "184.55",
                  "3. low": "181.49",
                  "4. close": "184.36",
                  "5. adjusted close": "184.36",
                  "6. volume": "5161185",
                  "7. dividend amount": "1.6600",
                  "8. split coefficient": "1.0"
              },
              "2024-02-07": {
                  "1. open": "183.34",
                  "2. high": "184.02",
                  "3. low": "182.625",
                  "4. close": "183.74",
                  "5. adjusted close": "182.100346199333",
                  "6. volume": "4841188",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-06": {
                  "1. open": "183.55",
                  "2. high": "184.68",
                  "3. low": "183.04",
                  "4. close": "183.41",
                  "5. adjusted close": "181.773291043974",
                  "6. volume": "3338196",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-05": {
                  "1. open": "185.51",
                  "2. high": "185.78",
                  "3. low": "183.255",
                  "4. close": "183.42",
                  "5. adjusted close": "181.783201806257",
                  "6. volume": "4379602",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-02": {
                  "1. open": "187.1",
                  "2. high": "187.39",
                  "3. low": "185.615",
                  "4. close": "185.79",
                  "5. adjusted close": "184.132052467477",
                  "6. volume": "4055411",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-02-01": {
                  "1. open": "183.63",
                  "2. high": "187.51",
                  "3. low": "182.71",
                  "4. close": "186.9",
                  "5. adjusted close": "185.232147080959",
                  "6. volume": "4669444",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-31": {
                  "1. open": "187.05",
                  "2. high": "187.65",
                  "3. low": "183.14",
                  "4. close": "183.66",
                  "5. adjusted close": "182.021060101064",
                  "6. volume": "8876055",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-30": {
                  "1. open": "187.71",
                  "2. high": "188.65",
                  "3. low": "186.77",
                  "4. close": "187.87",
                  "5. adjusted close": "186.193491022471",
                  "6. volume": "4575058",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-29": {
                  "1. open": "187.46",
                  "2. high": "189.46",
                  "3. low": "186.05",
                  "4. close": "187.14",
                  "5. adjusted close": "185.470005375766",
                  "6. volume": "6107908",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-26": {
                  "1. open": "191.31",
                  "2. high": "192.3896",
                  "3. low": "186.16",
                  "4. close": "187.42",
                  "5. adjusted close": "185.747506719708",
                  "6. volume": "9895941",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-25": {
                  "1. open": "184.96",
                  "2. high": "196.9",
                  "3. low": "184.83",
                  "4. close": "190.43",
                  "5. adjusted close": "188.730646167079",
                  "6. volume": "29596239",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-24": {
                  "1. open": "174.76",
                  "2. high": "174.86",
                  "3. low": "172.9",
                  "4. close": "173.93",
                  "5. adjusted close": "172.377888399097",
                  "6. volume": "7831157",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-23": {
                  "1. open": "172.9",
                  "2. high": "174.02",
                  "3. low": "172.48",
                  "4. close": "173.94",
                  "5. adjusted close": "172.387799161381",
                  "6. volume": "3983461",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-22": {
                  "1. open": "172.82",
                  "2. high": "174.45",
                  "3. low": "172.4",
                  "4. close": "172.83",
                  "5. adjusted close": "171.287704547898",
                  "6. volume": "4925964",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-19": {
                  "1. open": "170.59",
                  "2. high": "171.5791",
                  "3. low": "169.18",
                  "4. close": "171.48",
                  "5. adjusted close": "169.949751639609",
                  "6. volume": "6929079",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-18": {
                  "1. open": "166.49",
                  "2. high": "166.99",
                  "3. low": "165.04",
                  "4. close": "166.84",
                  "5. adjusted close": "165.351157940006",
                  "6. volume": "3776990",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-17": {
                  "1. open": "166.79",
                  "2. high": "167.82",
                  "3. low": "165.495",
                  "4. close": "166.08",
                  "5. adjusted close": "164.597940006451",
                  "6. volume": "4288604",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-16": {
                  "1. open": "165.8",
                  "2. high": "167.25",
                  "3. low": "165.34",
                  "4. close": "166.96",
                  "5. adjusted close": "165.47008708741",
                  "6. volume": "4869635",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-12": {
                  "1. open": "162.97",
                  "2. high": "165.98",
                  "3. low": "162.355",
                  "4. close": "165.8",
                  "5. adjusted close": "164.320438662509",
                  "6. volume": "4958261",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-11": {
                  "1. open": "161.02",
                  "2. high": "162.23",
                  "3. low": "160.29",
                  "4. close": "162.16",
                  "5. adjusted close": "160.71292119127",
                  "6. volume": "3778395",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-10": {
                  "1. open": "160.28",
                  "2. high": "161.34",
                  "3. low": "159.74",
                  "4. close": "161.23",
                  "5. adjusted close": "159.791220298893",
                  "6. volume": "2967852",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-09": {
                  "1. open": "160.0",
                  "2. high": "160.4837",
                  "3. low": "159.51",
                  "4. close": "160.08",
                  "5. adjusted close": "158.651482636276",
                  "6. volume": "2617186",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-08": {
                  "1. open": "158.69",
                  "2. high": "161.216",
                  "3. low": "157.885",
                  "4. close": "161.14",
                  "5. adjusted close": "159.70202343834",
                  "6. volume": "3321698",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-05": {
                  "1. open": "159.91",
                  "2. high": "160.55",
                  "3. low": "158.67",
                  "4. close": "159.16",
                  "5. adjusted close": "157.739692506182",
                  "6. volume": "3698961",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-04": {
                  "1. open": "160.22",
                  "2. high": "161.81",
                  "3. low": "160.17",
                  "4. close": "160.86",
                  "5. adjusted close": "159.424522094398",
                  "6. volume": "3212004",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-03": {
                  "1. open": "161.0",
                  "2. high": "161.73",
                  "3. low": "160.08",
                  "4. close": "160.1",
                  "5. adjusted close": "158.671304160843",
                  "6. volume": "4086065",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2024-01-02": {
                  "1. open": "162.83",
                  "2. high": "163.29",
                  "3. low": "160.46",
                  "4. close": "161.5",
                  "5. adjusted close": "160.058810880551",
                  "6. volume": "3825044",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2023-12-29": {
                  "1. open": "163.75",
                  "2. high": "164.18",
                  "3. low": "162.83",
                  "4. close": "163.55",
                  "5. adjusted close": "162.090517148694",
                  "6. volume": "2526169",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2023-12-28": {
                  "1. open": "163.96",
                  "2. high": "163.96",
                  "3. low": "163.4",
                  "4. close": "163.75",
                  "5. adjusted close": "162.288732394366",
                  "6. volume": "2071313",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2023-12-27": {
                  "1. open": "163.14",
                  "2. high": "163.64",
                  "3. low": "162.68",
                  "4. close": "163.46",
                  "5. adjusted close": "162.001320288141",
                  "6. volume": "3006612",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2023-12-26": {
                  "1. open": "162.23",
                  "2. high": "163.31",
                  "3. low": "162.05",
                  "4. close": "163.21",
                  "5. adjusted close": "161.75355123105",
                  "6. volume": "1772443",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2023-12-22": {
                  "1. open": "161.1",
                  "2. high": "162.41",
                  "3. low": "161.0",
                  "4. close": "162.14",
                  "5. adjusted close": "160.693099666703",
                  "6. volume": "2442715",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2023-12-21": {
                  "1. open": "160.59",
                  "2. high": "161.08",
                  "3. low": "159.53",
                  "4. close": "160.78",
                  "5. adjusted close": "159.345235996129",
                  "6. volume": "2982924",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2023-12-20": {
                  "1. open": "161.29",
                  "2. high": "161.8",
                  "3. low": "160.01",
                  "4. close": "160.05",
                  "5. adjusted close": "158.621750349425",
                  "6. volume": "4865797",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2023-12-19": {
                  "1. open": "161.8",
                  "2. high": "162.28",
                  "3. low": "161.32",
                  "4. close": "161.56",
                  "5. adjusted close": "160.118275454252",
                  "6. volume": "3717429",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2023-12-18": {
                  "1. open": "162.23",
                  "2. high": "163.33",
                  "3. low": "161.5766",
                  "4. close": "162.74",
                  "5. adjusted close": "161.28774540372",
                  "6. volume": "3677533",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2023-12-15": {
                  "1. open": "162.3",
                  "2. high": "164.09",
                  "3. low": "162.04",
                  "4. close": "162.23",
                  "5. adjusted close": "160.782296527255",
                  "6. volume": "11016108",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2023-12-14": {
                  "1. open": "162.93",
                  "2. high": "163.499",
                  "3. low": "160.149",
                  "4. close": "162.91",
                  "5. adjusted close": "161.456228362542",
                  "6. volume": "6129804",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2023-12-13": {
                  "1. open": "164.37",
                  "2. high": "164.9653",
                  "3. low": "162.735",
                  "4. close": "163.62",
                  "5. adjusted close": "162.159892484679",
                  "6. volume": "4989141",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2023-12-12": {
                  "1. open": "163.27",
                  "2. high": "166.34",
                  "3. low": "162.92",
                  "4. close": "164.71",
                  "5. adjusted close": "163.240165573594",
                  "6. volume": "5292290",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              },
              "2023-12-11": {
                  "1. open": "162.68",
                  "2. high": "163.65",
                  "3. low": "161.95",
                  "4. close": "163.51",
                  "5. adjusted close": "162.050874099559",
                  "6. volume": "6077207",
                  "7. dividend amount": "0.0000",
                  "8. split coefficient": "1.0"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "ABT",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "106.1100",
                  "2. high": "106.6400",
                  "3. low": "105.4750",
                  "4. close": "105.9000",
                  "5. volume": "3610492"
              },
              "2024-05-02": {
                  "1. open": "106.6600",
                  "2. high": "106.6600",
                  "3. low": "105.1500",
                  "4. close": "105.9200",
                  "5. volume": "3708515"
              },
              "2024-05-01": {
                  "1. open": "105.9300",
                  "2. high": "107.1600",
                  "3. low": "105.9100",
                  "4. close": "106.2900",
                  "5. volume": "4097108"
              },
              "2024-04-30": {
                  "1. open": "106.5200",
                  "2. high": "106.8700",
                  "3. low": "105.8950",
                  "4. close": "105.9700",
                  "5. volume": "5073971"
              },
              "2024-04-29": {
                  "1. open": "107.3900",
                  "2. high": "108.1900",
                  "3. low": "106.6000",
                  "4. close": "107.2700",
                  "5. volume": "3307022"
              },
              "2024-04-26": {
                  "1. open": "106.5100",
                  "2. high": "107.8561",
                  "3. low": "106.3900",
                  "4. close": "107.5300",
                  "5. volume": "3575566"
              },
              "2024-04-25": {
                  "1. open": "106.6450",
                  "2. high": "107.4550",
                  "3. low": "106.1400",
                  "4. close": "106.8600",
                  "5. volume": "3112495"
              },
              "2024-04-24": {
                  "1. open": "106.7100",
                  "2. high": "107.1100",
                  "3. low": "105.5600",
                  "4. close": "106.8900",
                  "5. volume": "5052691"
              },
              "2024-04-23": {
                  "1. open": "107.6700",
                  "2. high": "108.1100",
                  "3. low": "107.3101",
                  "4. close": "107.5900",
                  "5. volume": "3849589"
              },
              "2024-04-22": {
                  "1. open": "107.4800",
                  "2. high": "107.9000",
                  "3. low": "106.2700",
                  "4. close": "107.0700",
                  "5. volume": "4948315"
              },
              "2024-04-19": {
                  "1. open": "105.9800",
                  "2. high": "107.7700",
                  "3. low": "105.3800",
                  "4. close": "107.2800",
                  "5. volume": "10533616"
              },
              "2024-04-18": {
                  "1. open": "106.5000",
                  "2. high": "107.0300",
                  "3. low": "104.4700",
                  "4. close": "105.2700",
                  "5. volume": "7306449"
              },
              "2024-04-17": {
                  "1. open": "107.5300",
                  "2. high": "108.7200",
                  "3. low": "104.2500",
                  "4. close": "105.9000",
                  "5. volume": "12002886"
              },
              "2024-04-16": {
                  "1. open": "108.8400",
                  "2. high": "110.3300",
                  "3. low": "108.1400",
                  "4. close": "109.2100",
                  "5. volume": "7283867"
              },
              "2024-04-15": {
                  "1. open": "110.0900",
                  "2. high": "110.8900",
                  "3. low": "108.8310",
                  "4. close": "108.8900",
                  "5. volume": "4595628"
              },
              "2024-04-12": {
                  "1. open": "110.2700",
                  "2. high": "110.5000",
                  "3. low": "108.4916",
                  "4. close": "109.1100",
                  "5. volume": "4041615"
              },
              "2024-04-11": {
                  "1. open": "111.6500",
                  "2. high": "111.9800",
                  "3. low": "110.3100",
                  "4. close": "111.4500",
                  "5. volume": "4321456"
              },
              "2024-04-10": {
                  "1. open": "111.2200",
                  "2. high": "111.6700",
                  "3. low": "110.3500",
                  "4. close": "111.1700",
                  "5. volume": "3965558"
              },
              "2024-04-09": {
                  "1. open": "110.5900",
                  "2. high": "112.5700",
                  "3. low": "110.5800",
                  "4. close": "112.4400",
                  "5. volume": "4223926"
              },
              "2024-04-08": {
                  "1. open": "111.3000",
                  "2. high": "111.4800",
                  "3. low": "110.1400",
                  "4. close": "110.5200",
                  "5. volume": "5782780"
              },
              "2024-04-05": {
                  "1. open": "109.7000",
                  "2. high": "111.2600",
                  "3. low": "109.5400",
                  "4. close": "111.2000",
                  "5. volume": "5589244"
              },
              "2024-04-04": {
                  "1. open": "111.8400",
                  "2. high": "112.0000",
                  "3. low": "109.8375",
                  "4. close": "110.1100",
                  "5. volume": "4730052"
              },
              "2024-04-03": {
                  "1. open": "112.1400",
                  "2. high": "112.5500",
                  "3. low": "111.0500",
                  "4. close": "111.2800",
                  "5. volume": "4302259"
              },
              "2024-04-02": {
                  "1. open": "111.8903",
                  "2. high": "112.4200",
                  "3. low": "111.1800",
                  "4. close": "112.0200",
                  "5. volume": "4559539"
              },
              "2024-04-01": {
                  "1. open": "113.6600",
                  "2. high": "113.6600",
                  "3. low": "111.8200",
                  "4. close": "112.0900",
                  "5. volume": "3801351"
              },
              "2024-03-28": {
                  "1. open": "113.2800",
                  "2. high": "114.0200",
                  "3. low": "112.9300",
                  "4. close": "113.6600",
                  "5. volume": "5278215"
              },
              "2024-03-27": {
                  "1. open": "112.0000",
                  "2. high": "113.7000",
                  "3. low": "111.9400",
                  "4. close": "113.4800",
                  "5. volume": "7533356"
              },
              "2024-03-26": {
                  "1. open": "110.4900",
                  "2. high": "111.9000",
                  "3. low": "109.9300",
                  "4. close": "111.5000",
                  "5. volume": "7770829"
              },
              "2024-03-25": {
                  "1. open": "110.4500",
                  "2. high": "110.8000",
                  "3. low": "109.1100",
                  "4. close": "110.0100",
                  "5. volume": "6622414"
              },
              "2024-03-22": {
                  "1. open": "111.5200",
                  "2. high": "111.9800",
                  "3. low": "110.5439",
                  "4. close": "110.5700",
                  "5. volume": "5387719"
              },
              "2024-03-21": {
                  "1. open": "111.9500",
                  "2. high": "112.1400",
                  "3. low": "111.0100",
                  "4. close": "111.5100",
                  "5. volume": "9722663"
              },
              "2024-03-20": {
                  "1. open": "113.0000",
                  "2. high": "113.2400",
                  "3. low": "110.7300",
                  "4. close": "111.5000",
                  "5. volume": "8317283"
              },
              "2024-03-19": {
                  "1. open": "112.4400",
                  "2. high": "114.4200",
                  "3. low": "112.0400",
                  "4. close": "113.1600",
                  "5. volume": "8299307"
              },
              "2024-03-18": {
                  "1. open": "115.3500",
                  "2. high": "115.7600",
                  "3. low": "112.2900",
                  "4. close": "112.4400",
                  "5. volume": "12991000"
              },
              "2024-03-15": {
                  "1. open": "113.0200",
                  "2. high": "115.4900",
                  "3. low": "112.2600",
                  "4. close": "115.4900",
                  "5. volume": "22415678"
              },
              "2024-03-14": {
                  "1. open": "120.0100",
                  "2. high": "120.3400",
                  "3. low": "117.8500",
                  "4. close": "118.8500",
                  "5. volume": "4937300"
              },
              "2024-03-13": {
                  "1. open": "120.5200",
                  "2. high": "120.9300",
                  "3. low": "119.6200",
                  "4. close": "120.1600",
                  "5. volume": "3421089"
              },
              "2024-03-12": {
                  "1. open": "119.9500",
                  "2. high": "121.0800",
                  "3. low": "119.0600",
                  "4. close": "120.7600",
                  "5. volume": "3078487"
              },
              "2024-03-11": {
                  "1. open": "120.9300",
                  "2. high": "121.4200",
                  "3. low": "119.6200",
                  "4. close": "120.1900",
                  "5. volume": "3879393"
              },
              "2024-03-08": {
                  "1. open": "120.9700",
                  "2. high": "121.6400",
                  "3. low": "120.6050",
                  "4. close": "120.9600",
                  "5. volume": "3357442"
              },
              "2024-03-07": {
                  "1. open": "120.0950",
                  "2. high": "121.5000",
                  "3. low": "119.9501",
                  "4. close": "120.9200",
                  "5. volume": "4200857"
              },
              "2024-03-06": {
                  "1. open": "118.6000",
                  "2. high": "119.5800",
                  "3. low": "118.4200",
                  "4. close": "119.3400",
                  "5. volume": "3388820"
              },
              "2024-03-05": {
                  "1. open": "120.4400",
                  "2. high": "120.6000",
                  "3. low": "118.0800",
                  "4. close": "118.4800",
                  "5. volume": "3502340"
              },
              "2024-03-04": {
                  "1. open": "118.3000",
                  "2. high": "120.2800",
                  "3. low": "118.1700",
                  "4. close": "120.0400",
                  "5. volume": "3164070"
              },
              "2024-03-01": {
                  "1. open": "118.5700",
                  "2. high": "119.4550",
                  "3. low": "117.8300",
                  "4. close": "118.6200",
                  "5. volume": "3899429"
              },
              "2024-02-29": {
                  "1. open": "120.3200",
                  "2. high": "120.4450",
                  "3. low": "118.5250",
                  "4. close": "118.6400",
                  "5. volume": "6135244"
              },
              "2024-02-28": {
                  "1. open": "119.4900",
                  "2. high": "120.1100",
                  "3. low": "119.2700",
                  "4. close": "120.0500",
                  "5. volume": "3383982"
              },
              "2024-02-27": {
                  "1. open": "118.1600",
                  "2. high": "119.5000",
                  "3. low": "117.8300",
                  "4. close": "119.4000",
                  "5. volume": "3203311"
              },
              "2024-02-26": {
                  "1. open": "119.5000",
                  "2. high": "119.9500",
                  "3. low": "118.3900",
                  "4. close": "118.6900",
                  "5. volume": "3483103"
              },
              "2024-02-23": {
                  "1. open": "119.3800",
                  "2. high": "120.1500",
                  "3. low": "118.8600",
                  "4. close": "119.4600",
                  "5. volume": "4261515"
              },
              "2024-02-22": {
                  "1. open": "118.1000",
                  "2. high": "119.2500",
                  "3. low": "116.8000",
                  "4. close": "119.0200",
                  "5. volume": "4916218"
              },
              "2024-02-21": {
                  "1. open": "115.9600",
                  "2. high": "117.9750",
                  "3. low": "115.9600",
                  "4. close": "117.8700",
                  "5. volume": "6144814"
              },
              "2024-02-20": {
                  "1. open": "114.3300",
                  "2. high": "117.1900",
                  "3. low": "113.9600",
                  "4. close": "116.6400",
                  "5. volume": "9601289"
              },
              "2024-02-16": {
                  "1. open": "113.5000",
                  "2. high": "115.4900",
                  "3. low": "113.4500",
                  "4. close": "114.0100",
                  "5. volume": "7161109"
              },
              "2024-02-15": {
                  "1. open": "112.2700",
                  "2. high": "114.2700",
                  "3. low": "112.2700",
                  "4. close": "113.6400",
                  "5. volume": "5450684"
              },
              "2024-02-14": {
                  "1. open": "111.6400",
                  "2. high": "112.3800",
                  "3. low": "111.1200",
                  "4. close": "112.0600",
                  "5. volume": "3991233"
              },
              "2024-02-13": {
                  "1. open": "112.4700",
                  "2. high": "113.1100",
                  "3. low": "110.5800",
                  "4. close": "111.3400",
                  "5. volume": "4263613"
              },
              "2024-02-12": {
                  "1. open": "111.5000",
                  "2. high": "112.6300",
                  "3. low": "111.2100",
                  "4. close": "112.5300",
                  "5. volume": "4232159"
              },
              "2024-02-09": {
                  "1. open": "112.2500",
                  "2. high": "112.6300",
                  "3. low": "111.1900",
                  "4. close": "111.8100",
                  "5. volume": "5947680"
              },
              "2024-02-08": {
                  "1. open": "113.3500",
                  "2. high": "113.3500",
                  "3. low": "111.5200",
                  "4. close": "112.4300",
                  "5. volume": "6980455"
              },
              "2024-02-07": {
                  "1. open": "114.6000",
                  "2. high": "114.6000",
                  "3. low": "112.8900",
                  "4. close": "113.3100",
                  "5. volume": "4757532"
              },
              "2024-02-06": {
                  "1. open": "111.8200",
                  "2. high": "114.5099",
                  "3. low": "111.7200",
                  "4. close": "114.0000",
                  "5. volume": "4734844"
              },
              "2024-02-05": {
                  "1. open": "112.0200",
                  "2. high": "112.4550",
                  "3. low": "111.1500",
                  "4. close": "111.6500",
                  "5. volume": "5670059"
              },
              "2024-02-02": {
                  "1. open": "112.9600",
                  "2. high": "114.0600",
                  "3. low": "111.9800",
                  "4. close": "112.1100",
                  "5. volume": "7575685"
              },
              "2024-02-01": {
                  "1. open": "112.7500",
                  "2. high": "114.5374",
                  "3. low": "111.9950",
                  "4. close": "114.4900",
                  "5. volume": "4520542"
              },
              "2024-01-31": {
                  "1. open": "114.0000",
                  "2. high": "114.5350",
                  "3. low": "112.6200",
                  "4. close": "113.1500",
                  "5. volume": "8325187"
              },
              "2024-01-30": {
                  "1. open": "113.9000",
                  "2. high": "113.9200",
                  "3. low": "112.3800",
                  "4. close": "113.4800",
                  "5. volume": "4768366"
              },
              "2024-01-29": {
                  "1. open": "112.1500",
                  "2. high": "113.4700",
                  "3. low": "112.0300",
                  "4. close": "113.4500",
                  "5. volume": "6480613"
              },
              "2024-01-26": {
                  "1. open": "113.2300",
                  "2. high": "113.4100",
                  "3. low": "111.5400",
                  "4. close": "112.0100",
                  "5. volume": "5176697"
              },
              "2024-01-25": {
                  "1. open": "111.4100",
                  "2. high": "112.5700",
                  "3. low": "110.7850",
                  "4. close": "112.4500",
                  "5. volume": "5648750"
              },
              "2024-01-24": {
                  "1. open": "110.7500",
                  "2. high": "113.3450",
                  "3. low": "109.7400",
                  "4. close": "110.7700",
                  "5. volume": "8707920"
              },
              "2024-01-23": {
                  "1. open": "114.4500",
                  "2. high": "115.5000",
                  "3. low": "112.8700",
                  "4. close": "114.0000",
                  "5. volume": "5037299"
              },
              "2024-01-22": {
                  "1. open": "114.9300",
                  "2. high": "115.6400",
                  "3. low": "114.1400",
                  "4. close": "114.1900",
                  "5. volume": "5062485"
              },
              "2024-01-19": {
                  "1. open": "113.6300",
                  "2. high": "114.8600",
                  "3. low": "113.4600",
                  "4. close": "114.6900",
                  "5. volume": "6843279"
              },
              "2024-01-18": {
                  "1. open": "114.2000",
                  "2. high": "114.5700",
                  "3. low": "113.4050",
                  "4. close": "114.0200",
                  "5. volume": "5098185"
              },
              "2024-01-17": {
                  "1. open": "113.6200",
                  "2. high": "114.5000",
                  "3. low": "113.4350",
                  "4. close": "113.9300",
                  "5. volume": "4672119"
              },
              "2024-01-16": {
                  "1. open": "113.5100",
                  "2. high": "114.0700",
                  "3. low": "112.9140",
                  "4. close": "113.7600",
                  "5. volume": "5876044"
              },
              "2024-01-12": {
                  "1. open": "114.1700",
                  "2. high": "114.9400",
                  "3. low": "113.4500",
                  "4. close": "113.9200",
                  "5. volume": "3884932"
              },
              "2024-01-11": {
                  "1. open": "113.2550",
                  "2. high": "113.7300",
                  "3. low": "112.5850",
                  "4. close": "113.5000",
                  "5. volume": "5163897"
              },
              "2024-01-10": {
                  "1. open": "113.0500",
                  "2. high": "114.4100",
                  "3. low": "112.8050",
                  "4. close": "114.4000",
                  "5. volume": "4672114"
              },
              "2024-01-09": {
                  "1. open": "112.1500",
                  "2. high": "113.5400",
                  "3. low": "112.0600",
                  "4. close": "112.7300",
                  "5. volume": "3802118"
              },
              "2024-01-08": {
                  "1. open": "111.1300",
                  "2. high": "112.5200",
                  "3. low": "110.9200",
                  "4. close": "112.4000",
                  "5. volume": "5030376"
              },
              "2024-01-05": {
                  "1. open": "110.7100",
                  "2. high": "111.0500",
                  "3. low": "110.0300",
                  "4. close": "110.8000",
                  "5. volume": "4052575"
              },
              "2024-01-04": {
                  "1. open": "109.6800",
                  "2. high": "111.0300",
                  "3. low": "109.5100",
                  "4. close": "110.9800",
                  "5. volume": "5296139"
              },
              "2024-01-03": {
                  "1. open": "110.1400",
                  "2. high": "110.2500",
                  "3. low": "109.2900",
                  "4. close": "109.5200",
                  "5. volume": "4239623"
              },
              "2024-01-02": {
                  "1. open": "109.5600",
                  "2. high": "111.0000",
                  "3. low": "109.5600",
                  "4. close": "109.8500",
                  "5. volume": "5058688"
              },
              "2023-12-29": {
                  "1. open": "110.4000",
                  "2. high": "110.7300",
                  "3. low": "109.8300",
                  "4. close": "110.0700",
                  "5. volume": "3550304"
              },
              "2023-12-28": {
                  "1. open": "109.8500",
                  "2. high": "110.7100",
                  "3. low": "109.7150",
                  "4. close": "110.4000",
                  "5. volume": "3206121"
              },
              "2023-12-27": {
                  "1. open": "109.0400",
                  "2. high": "109.8000",
                  "3. low": "109.0400",
                  "4. close": "109.7900",
                  "5. volume": "2470881"
              },
              "2023-12-26": {
                  "1. open": "108.5100",
                  "2. high": "109.7300",
                  "3. low": "108.5100",
                  "4. close": "109.2300",
                  "5. volume": "2513454"
              },
              "2023-12-22": {
                  "1. open": "108.8550",
                  "2. high": "109.3400",
                  "3. low": "108.5000",
                  "4. close": "109.0300",
                  "5. volume": "2565722"
              },
              "2023-12-21": {
                  "1. open": "107.4200",
                  "2. high": "108.6800",
                  "3. low": "107.1800",
                  "4. close": "108.4800",
                  "5. volume": "3555633"
              },
              "2023-12-20": {
                  "1. open": "107.8500",
                  "2. high": "108.8200",
                  "3. low": "107.3000",
                  "4. close": "107.4000",
                  "5. volume": "5666298"
              },
              "2023-12-19": {
                  "1. open": "108.1500",
                  "2. high": "108.7150",
                  "3. low": "107.4300",
                  "4. close": "108.4200",
                  "5. volume": "4628246"
              },
              "2023-12-18": {
                  "1. open": "107.6400",
                  "2. high": "108.6200",
                  "3. low": "107.1600",
                  "4. close": "108.0600",
                  "5. volume": "5142887"
              },
              "2023-12-15": {
                  "1. open": "107.8600",
                  "2. high": "107.9700",
                  "3. low": "106.5100",
                  "4. close": "107.2900",
                  "5. volume": "13316296"
              },
              "2023-12-14": {
                  "1. open": "107.8300",
                  "2. high": "108.6650",
                  "3. low": "106.6800",
                  "4. close": "108.6000",
                  "5. volume": "6611835"
              },
              "2023-12-13": {
                  "1. open": "106.0100",
                  "2. high": "107.2800",
                  "3. low": "105.9000",
                  "4. close": "107.2500",
                  "5. volume": "6534777"
              },
              "2023-12-12": {
                  "1. open": "106.3700",
                  "2. high": "107.2200",
                  "3. low": "105.5600",
                  "4. close": "106.6800",
                  "5. volume": "5354557"
              },
              "2023-12-11": {
                  "1. open": "104.2100",
                  "2. high": "106.2500",
                  "3. low": "104.2100",
                  "4. close": "106.2200",
                  "5. volume": "5208402"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "BMBL",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "10.4000",
                  "2. high": "10.4200",
                  "3. low": "10.0200",
                  "4. close": "10.1400",
                  "5. volume": "3923398"
              },
              "2024-05-02": {
                  "1. open": "10.2200",
                  "2. high": "10.3500",
                  "3. low": "10.0800",
                  "4. close": "10.1600",
                  "5. volume": "2704139"
              },
              "2024-05-01": {
                  "1. open": "10.1200",
                  "2. high": "10.3600",
                  "3. low": "10.0100",
                  "4. close": "10.1200",
                  "5. volume": "1974499"
              },
              "2024-04-30": {
                  "1. open": "10.2900",
                  "2. high": "10.2900",
                  "3. low": "9.9300",
                  "4. close": "10.1000",
                  "5. volume": "2803707"
              },
              "2024-04-29": {
                  "1. open": "10.5900",
                  "2. high": "10.6600",
                  "3. low": "10.2900",
                  "4. close": "10.3600",
                  "5. volume": "1655562"
              },
              "2024-04-26": {
                  "1. open": "10.5400",
                  "2. high": "10.7000",
                  "3. low": "10.4000",
                  "4. close": "10.4900",
                  "5. volume": "1694719"
              },
              "2024-04-25": {
                  "1. open": "10.2700",
                  "2. high": "10.6450",
                  "3. low": "10.1050",
                  "4. close": "10.5500",
                  "5. volume": "3178631"
              },
              "2024-04-24": {
                  "1. open": "10.1500",
                  "2. high": "10.5000",
                  "3. low": "10.0950",
                  "4. close": "10.4400",
                  "5. volume": "2881278"
              },
              "2024-04-23": {
                  "1. open": "10.2600",
                  "2. high": "10.5400",
                  "3. low": "10.1700",
                  "4. close": "10.1900",
                  "5. volume": "2180002"
              },
              "2024-04-22": {
                  "1. open": "10.2700",
                  "2. high": "10.6350",
                  "3. low": "10.1750",
                  "4. close": "10.3500",
                  "5. volume": "4010284"
              },
              "2024-04-19": {
                  "1. open": "10.1800",
                  "2. high": "10.3000",
                  "3. low": "10.0700",
                  "4. close": "10.1800",
                  "5. volume": "2153062"
              },
              "2024-04-18": {
                  "1. open": "10.1000",
                  "2. high": "10.3250",
                  "3. low": "9.9400",
                  "4. close": "10.2400",
                  "5. volume": "1795833"
              },
              "2024-04-17": {
                  "1. open": "10.0900",
                  "2. high": "10.2700",
                  "3. low": "10.0100",
                  "4. close": "10.1000",
                  "5. volume": "1726388"
              },
              "2024-04-16": {
                  "1. open": "10.0200",
                  "2. high": "10.2600",
                  "3. low": "9.9900",
                  "4. close": "10.0400",
                  "5. volume": "2422438"
              },
              "2024-04-15": {
                  "1. open": "10.4600",
                  "2. high": "10.5900",
                  "3. low": "10.0600",
                  "4. close": "10.1200",
                  "5. volume": "2489612"
              },
              "2024-04-12": {
                  "1. open": "10.8800",
                  "2. high": "10.9300",
                  "3. low": "10.4700",
                  "4. close": "10.5300",
                  "5. volume": "2700599"
              },
              "2024-04-11": {
                  "1. open": "10.9900",
                  "2. high": "11.0050",
                  "3. low": "10.5700",
                  "4. close": "10.9200",
                  "5. volume": "2370589"
              },
              "2024-04-10": {
                  "1. open": "10.7000",
                  "2. high": "10.9550",
                  "3. low": "10.5100",
                  "4. close": "10.9300",
                  "5. volume": "3283940"
              },
              "2024-04-09": {
                  "1. open": "10.6600",
                  "2. high": "11.1350",
                  "3. low": "10.6350",
                  "4. close": "10.9700",
                  "5. volume": "3412525"
              },
              "2024-04-08": {
                  "1. open": "10.5700",
                  "2. high": "10.8700",
                  "3. low": "10.5100",
                  "4. close": "10.6000",
                  "5. volume": "2258440"
              },
              "2024-04-05": {
                  "1. open": "10.7100",
                  "2. high": "10.7500",
                  "3. low": "10.5000",
                  "4. close": "10.5300",
                  "5. volume": "2842540"
              },
              "2024-04-04": {
                  "1. open": "10.8600",
                  "2. high": "11.2300",
                  "3. low": "10.8000",
                  "4. close": "10.8100",
                  "5. volume": "3850572"
              },
              "2024-04-03": {
                  "1. open": "11.0500",
                  "2. high": "11.2300",
                  "3. low": "11.0300",
                  "4. close": "11.2200",
                  "5. volume": "1140225"
              },
              "2024-04-02": {
                  "1. open": "11.2200",
                  "2. high": "11.2900",
                  "3. low": "11.0600",
                  "4. close": "11.1400",
                  "5. volume": "1667664"
              },
              "2024-04-01": {
                  "1. open": "11.4200",
                  "2. high": "11.4200",
                  "3. low": "11.1850",
                  "4. close": "11.3100",
                  "5. volume": "2025277"
              },
              "2024-03-28": {
                  "1. open": "11.1900",
                  "2. high": "11.5000",
                  "3. low": "11.1300",
                  "4. close": "11.3500",
                  "5. volume": "2567230"
              },
              "2024-03-27": {
                  "1. open": "11.0600",
                  "2. high": "11.2100",
                  "3. low": "10.8400",
                  "4. close": "11.1900",
                  "5. volume": "3339908"
              },
              "2024-03-26": {
                  "1. open": "11.1200",
                  "2. high": "11.2400",
                  "3. low": "10.8550",
                  "4. close": "10.9200",
                  "5. volume": "3857702"
              },
              "2024-03-25": {
                  "1. open": "10.9200",
                  "2. high": "11.1160",
                  "3. low": "10.8300",
                  "4. close": "11.0200",
                  "5. volume": "1936286"
              },
              "2024-03-22": {
                  "1. open": "10.8500",
                  "2. high": "11.1000",
                  "3. low": "10.8200",
                  "4. close": "10.8700",
                  "5. volume": "3232934"
              },
              "2024-03-21": {
                  "1. open": "11.0800",
                  "2. high": "11.1100",
                  "3. low": "10.7700",
                  "4. close": "10.7900",
                  "5. volume": "2756239"
              },
              "2024-03-20": {
                  "1. open": "10.8900",
                  "2. high": "11.2350",
                  "3. low": "10.8400",
                  "4. close": "10.9900",
                  "5. volume": "3547351"
              },
              "2024-03-19": {
                  "1. open": "10.7700",
                  "2. high": "11.0650",
                  "3. low": "10.7300",
                  "4. close": "10.9500",
                  "5. volume": "2383520"
              },
              "2024-03-18": {
                  "1. open": "10.7700",
                  "2. high": "11.0950",
                  "3. low": "10.6600",
                  "4. close": "10.8200",
                  "5. volume": "2514585"
              },
              "2024-03-15": {
                  "1. open": "10.4400",
                  "2. high": "10.8850",
                  "3. low": "10.3600",
                  "4. close": "10.7400",
                  "5. volume": "3881540"
              },
              "2024-03-14": {
                  "1. open": "10.6400",
                  "2. high": "10.7450",
                  "3. low": "10.3800",
                  "4. close": "10.4900",
                  "5. volume": "5083819"
              },
              "2024-03-13": {
                  "1. open": "10.8000",
                  "2. high": "10.9400",
                  "3. low": "10.6500",
                  "4. close": "10.7100",
                  "5. volume": "2695843"
              },
              "2024-03-12": {
                  "1. open": "11.1500",
                  "2. high": "11.1700",
                  "3. low": "10.7700",
                  "4. close": "10.8300",
                  "5. volume": "3665609"
              },
              "2024-03-11": {
                  "1. open": "10.8300",
                  "2. high": "11.2900",
                  "3. low": "10.8000",
                  "4. close": "11.1900",
                  "5. volume": "3219664"
              },
              "2024-03-08": {
                  "1. open": "10.7900",
                  "2. high": "11.1550",
                  "3. low": "10.7300",
                  "4. close": "10.8700",
                  "5. volume": "4320676"
              },
              "2024-03-07": {
                  "1. open": "10.8000",
                  "2. high": "10.9400",
                  "3. low": "10.6500",
                  "4. close": "10.7500",
                  "5. volume": "3375089"
              },
              "2024-03-06": {
                  "1. open": "11.0000",
                  "2. high": "11.0500",
                  "3. low": "10.5200",
                  "4. close": "10.6800",
                  "5. volume": "6392467"
              },
              "2024-03-05": {
                  "1. open": "11.0900",
                  "2. high": "11.1100",
                  "3. low": "10.7200",
                  "4. close": "10.9800",
                  "5. volume": "4240057"
              },
              "2024-03-04": {
                  "1. open": "11.4700",
                  "2. high": "11.5300",
                  "3. low": "11.1000",
                  "4. close": "11.2800",
                  "5. volume": "3780381"
              },
              "2024-03-01": {
                  "1. open": "11.4700",
                  "2. high": "11.5300",
                  "3. low": "11.2000",
                  "4. close": "11.4400",
                  "5. volume": "3689042"
              },
              "2024-02-29": {
                  "1. open": "11.4300",
                  "2. high": "11.7000",
                  "3. low": "11.1800",
                  "4. close": "11.4500",
                  "5. volume": "5645875"
              },
              "2024-02-28": {
                  "1. open": "11.7500",
                  "2. high": "12.7600",
                  "3. low": "11.1650",
                  "4. close": "11.2300",
                  "5. volume": "11651843"
              },
              "2024-02-27": {
                  "1. open": "12.9000",
                  "2. high": "13.3500",
                  "3. low": "12.7745",
                  "4. close": "13.1800",
                  "5. volume": "6961419"
              },
              "2024-02-26": {
                  "1. open": "13.0800",
                  "2. high": "13.3650",
                  "3. low": "12.6600",
                  "4. close": "12.7200",
                  "5. volume": "4344788"
              },
              "2024-02-23": {
                  "1. open": "13.1000",
                  "2. high": "13.3650",
                  "3. low": "12.9900",
                  "4. close": "13.1100",
                  "5. volume": "1709315"
              },
              "2024-02-22": {
                  "1. open": "13.2800",
                  "2. high": "13.3350",
                  "3. low": "13.0000",
                  "4. close": "13.1000",
                  "5. volume": "1612011"
              },
              "2024-02-21": {
                  "1. open": "13.1900",
                  "2. high": "13.3200",
                  "3. low": "12.9300",
                  "4. close": "13.2700",
                  "5. volume": "1538053"
              },
              "2024-02-20": {
                  "1. open": "13.3600",
                  "2. high": "13.5600",
                  "3. low": "13.2350",
                  "4. close": "13.2800",
                  "5. volume": "2000018"
              },
              "2024-02-16": {
                  "1. open": "13.8200",
                  "2. high": "13.9700",
                  "3. low": "13.4900",
                  "4. close": "13.5700",
                  "5. volume": "2665242"
              },
              "2024-02-15": {
                  "1. open": "13.4800",
                  "2. high": "14.0800",
                  "3. low": "13.4700",
                  "4. close": "14.0200",
                  "5. volume": "2449199"
              },
              "2024-02-14": {
                  "1. open": "13.2700",
                  "2. high": "13.5000",
                  "3. low": "13.1700",
                  "4. close": "13.4100",
                  "5. volume": "1743737"
              },
              "2024-02-13": {
                  "1. open": "13.3300",
                  "2. high": "13.4650",
                  "3. low": "12.8800",
                  "4. close": "12.9800",
                  "5. volume": "2515868"
              },
              "2024-02-12": {
                  "1. open": "13.3100",
                  "2. high": "13.9050",
                  "3. low": "13.2400",
                  "4. close": "13.7700",
                  "5. volume": "2228662"
              },
              "2024-02-09": {
                  "1. open": "13.0000",
                  "2. high": "13.3750",
                  "3. low": "12.8600",
                  "4. close": "13.2800",
                  "5. volume": "2181612"
              },
              "2024-02-08": {
                  "1. open": "13.4200",
                  "2. high": "13.4600",
                  "3. low": "12.9600",
                  "4. close": "12.9600",
                  "5. volume": "2143635"
              },
              "2024-02-07": {
                  "1. open": "13.8400",
                  "2. high": "13.8600",
                  "3. low": "13.4000",
                  "4. close": "13.4100",
                  "5. volume": "2168717"
              },
              "2024-02-06": {
                  "1. open": "13.1500",
                  "2. high": "13.8300",
                  "3. low": "13.1500",
                  "4. close": "13.7800",
                  "5. volume": "2088045"
              },
              "2024-02-05": {
                  "1. open": "13.6000",
                  "2. high": "13.6700",
                  "3. low": "13.1400",
                  "4. close": "13.2000",
                  "5. volume": "2087909"
              },
              "2024-02-02": {
                  "1. open": "13.7800",
                  "2. high": "14.0000",
                  "3. low": "13.6800",
                  "4. close": "13.7100",
                  "5. volume": "1602584"
              },
              "2024-02-01": {
                  "1. open": "13.7300",
                  "2. high": "13.9600",
                  "3. low": "13.4150",
                  "4. close": "13.9400",
                  "5. volume": "2632531"
              },
              "2024-01-31": {
                  "1. open": "13.5300",
                  "2. high": "14.3000",
                  "3. low": "13.3500",
                  "4. close": "13.7200",
                  "5. volume": "2441926"
              },
              "2024-01-30": {
                  "1. open": "14.1800",
                  "2. high": "14.2900",
                  "3. low": "13.8200",
                  "4. close": "13.8400",
                  "5. volume": "2518390"
              },
              "2024-01-29": {
                  "1. open": "14.2300",
                  "2. high": "14.4750",
                  "3. low": "14.0200",
                  "4. close": "14.3500",
                  "5. volume": "1836553"
              },
              "2024-01-26": {
                  "1. open": "14.4200",
                  "2. high": "14.6450",
                  "3. low": "14.1500",
                  "4. close": "14.2000",
                  "5. volume": "1842531"
              },
              "2024-01-25": {
                  "1. open": "14.1000",
                  "2. high": "14.5100",
                  "3. low": "13.7900",
                  "4. close": "14.3700",
                  "5. volume": "4013731"
              },
              "2024-01-24": {
                  "1. open": "14.4200",
                  "2. high": "14.4400",
                  "3. low": "13.9700",
                  "4. close": "14.0800",
                  "5. volume": "1352826"
              },
              "2024-01-23": {
                  "1. open": "14.2500",
                  "2. high": "14.4300",
                  "3. low": "13.9879",
                  "4. close": "14.1000",
                  "5. volume": "1358456"
              },
              "2024-01-22": {
                  "1. open": "13.8500",
                  "2. high": "14.2500",
                  "3. low": "13.7900",
                  "4. close": "13.9700",
                  "5. volume": "1645920"
              },
              "2024-01-19": {
                  "1. open": "14.1400",
                  "2. high": "14.1400",
                  "3. low": "13.7150",
                  "4. close": "13.7700",
                  "5. volume": "1420444"
              },
              "2024-01-18": {
                  "1. open": "13.6700",
                  "2. high": "14.0200",
                  "3. low": "13.2900",
                  "4. close": "14.0000",
                  "5. volume": "3192807"
              },
              "2024-01-17": {
                  "1. open": "13.8500",
                  "2. high": "13.9850",
                  "3. low": "13.5300",
                  "4. close": "13.5400",
                  "5. volume": "2519083"
              },
              "2024-01-16": {
                  "1. open": "13.8300",
                  "2. high": "14.1400",
                  "3. low": "13.6800",
                  "4. close": "14.1300",
                  "5. volume": "2471527"
              },
              "2024-01-12": {
                  "1. open": "14.2900",
                  "2. high": "14.4988",
                  "3. low": "13.8700",
                  "4. close": "13.8700",
                  "5. volume": "2120405"
              },
              "2024-01-11": {
                  "1. open": "14.1400",
                  "2. high": "14.3100",
                  "3. low": "13.6700",
                  "4. close": "14.1700",
                  "5. volume": "2710049"
              },
              "2024-01-10": {
                  "1. open": "14.3600",
                  "2. high": "14.4300",
                  "3. low": "13.9500",
                  "4. close": "14.2000",
                  "5. volume": "1985167"
              },
              "2024-01-09": {
                  "1. open": "14.7150",
                  "2. high": "15.0489",
                  "3. low": "14.2200",
                  "4. close": "14.4100",
                  "5. volume": "3933705"
              },
              "2024-01-08": {
                  "1. open": "14.0400",
                  "2. high": "14.2300",
                  "3. low": "13.9600",
                  "4. close": "14.1000",
                  "5. volume": "1359617"
              },
              "2024-01-05": {
                  "1. open": "14.0000",
                  "2. high": "14.7300",
                  "3. low": "13.9850",
                  "4. close": "14.0100",
                  "5. volume": "2173906"
              },
              "2024-01-04": {
                  "1. open": "13.8700",
                  "2. high": "14.4800",
                  "3. low": "13.7600",
                  "4. close": "14.1600",
                  "5. volume": "2366844"
              },
              "2024-01-03": {
                  "1. open": "14.2000",
                  "2. high": "14.4500",
                  "3. low": "13.8500",
                  "4. close": "13.9800",
                  "5. volume": "2717170"
              },
              "2024-01-02": {
                  "1. open": "14.5000",
                  "2. high": "14.8100",
                  "3. low": "14.4000",
                  "4. close": "14.5000",
                  "5. volume": "2370562"
              },
              "2023-12-29": {
                  "1. open": "15.2000",
                  "2. high": "15.3206",
                  "3. low": "14.7200",
                  "4. close": "14.7400",
                  "5. volume": "1774590"
              },
              "2023-12-28": {
                  "1. open": "14.8400",
                  "2. high": "15.3300",
                  "3. low": "14.7150",
                  "4. close": "15.2800",
                  "5. volume": "1684146"
              },
              "2023-12-27": {
                  "1. open": "14.8200",
                  "2. high": "14.9300",
                  "3. low": "14.5600",
                  "4. close": "14.8800",
                  "5. volume": "1621637"
              },
              "2023-12-26": {
                  "1. open": "14.9500",
                  "2. high": "14.9800",
                  "3. low": "14.6600",
                  "4. close": "14.7400",
                  "5. volume": "1820615"
              },
              "2023-12-22": {
                  "1. open": "14.8800",
                  "2. high": "15.2050",
                  "3. low": "14.7300",
                  "4. close": "15.0000",
                  "5. volume": "1904484"
              },
              "2023-12-21": {
                  "1. open": "15.1700",
                  "2. high": "15.2400",
                  "3. low": "14.6300",
                  "4. close": "14.9200",
                  "5. volume": "2644130"
              },
              "2023-12-20": {
                  "1. open": "15.2500",
                  "2. high": "15.4200",
                  "3. low": "14.8500",
                  "4. close": "14.9500",
                  "5. volume": "1651196"
              },
              "2023-12-19": {
                  "1. open": "15.2200",
                  "2. high": "15.4600",
                  "3. low": "15.1500",
                  "4. close": "15.2500",
                  "5. volume": "1916935"
              },
              "2023-12-18": {
                  "1. open": "15.0900",
                  "2. high": "15.2600",
                  "3. low": "14.7600",
                  "4. close": "15.1400",
                  "5. volume": "2008307"
              },
              "2023-12-15": {
                  "1. open": "15.3000",
                  "2. high": "15.3800",
                  "3. low": "14.8400",
                  "4. close": "15.1600",
                  "5. volume": "3392110"
              },
              "2023-12-14": {
                  "1. open": "15.4500",
                  "2. high": "15.9000",
                  "3. low": "14.9200",
                  "4. close": "15.1500",
                  "5. volume": "2987541"
              },
              "2023-12-13": {
                  "1. open": "14.3400",
                  "2. high": "15.1300",
                  "3. low": "14.2500",
                  "4. close": "15.1100",
                  "5. volume": "2839348"
              },
              "2023-12-12": {
                  "1. open": "14.6600",
                  "2. high": "14.6700",
                  "3. low": "14.0200",
                  "4. close": "14.3600",
                  "5. volume": "2725943"
              },
              "2023-12-11": {
                  "1. open": "13.9500",
                  "2. high": "14.6300",
                  "3. low": "13.9100",
                  "4. close": "14.5900",
                  "5. volume": "3406828"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "CB",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "248.9300",
                  "2. high": "250.4500",
                  "3. low": "244.8400",
                  "4. close": "248.5400",
                  "5. volume": "1444710"
              },
              "2024-05-02": {
                  "1. open": "250.5200",
                  "2. high": "251.3400",
                  "3. low": "248.5400",
                  "4. close": "250.2500",
                  "5. volume": "1588660"
              },
              "2024-05-01": {
                  "1. open": "249.1300",
                  "2. high": "251.7400",
                  "3. low": "249.1300",
                  "4. close": "249.9300",
                  "5. volume": "1158352"
              },
              "2024-04-30": {
                  "1. open": "249.6600",
                  "2. high": "250.3000",
                  "3. low": "248.2450",
                  "4. close": "248.6400",
                  "5. volume": "1862883"
              },
              "2024-04-29": {
                  "1. open": "245.5700",
                  "2. high": "249.3500",
                  "3. low": "245.5100",
                  "4. close": "249.2200",
                  "5. volume": "2218382"
              },
              "2024-04-26": {
                  "1. open": "243.9900",
                  "2. high": "246.9100",
                  "3. low": "243.1400",
                  "4. close": "245.4500",
                  "5. volume": "1565900"
              },
              "2024-04-25": {
                  "1. open": "242.7500",
                  "2. high": "246.3600",
                  "3. low": "242.2500",
                  "4. close": "245.9600",
                  "5. volume": "1920486"
              },
              "2024-04-24": {
                  "1. open": "240.5700",
                  "2. high": "243.6050",
                  "3. low": "238.8500",
                  "4. close": "243.0100",
                  "5. volume": "3228930"
              },
              "2024-04-23": {
                  "1. open": "251.8200",
                  "2. high": "252.9500",
                  "3. low": "249.1400",
                  "4. close": "249.8800",
                  "5. volume": "1917348"
              },
              "2024-04-22": {
                  "1. open": "251.0200",
                  "2. high": "253.5700",
                  "3. low": "250.0000",
                  "4. close": "251.5000",
                  "5. volume": "1639071"
              },
              "2024-04-19": {
                  "1. open": "247.0400",
                  "2. high": "250.6300",
                  "3. low": "244.9700",
                  "4. close": "250.2100",
                  "5. volume": "2573609"
              },
              "2024-04-18": {
                  "1. open": "245.2000",
                  "2. high": "246.0800",
                  "3. low": "244.4100",
                  "4. close": "245.3900",
                  "5. volume": "1565896"
              },
              "2024-04-17": {
                  "1. open": "243.5800",
                  "2. high": "244.9900",
                  "3. low": "241.3800",
                  "4. close": "243.5300",
                  "5. volume": "1797251"
              },
              "2024-04-16": {
                  "1. open": "245.9100",
                  "2. high": "246.6350",
                  "3. low": "244.6200",
                  "4. close": "245.2100",
                  "5. volume": "1257334"
              },
              "2024-04-15": {
                  "1. open": "249.3500",
                  "2. high": "249.3900",
                  "3. low": "244.2100",
                  "4. close": "244.4400",
                  "5. volume": "1478705"
              },
              "2024-04-12": {
                  "1. open": "244.5800",
                  "2. high": "246.0100",
                  "3. low": "243.8150",
                  "4. close": "245.8100",
                  "5. volume": "1506616"
              },
              "2024-04-11": {
                  "1. open": "247.0000",
                  "2. high": "247.0550",
                  "3. low": "244.0600",
                  "4. close": "244.5300",
                  "5. volume": "2163845"
              },
              "2024-04-10": {
                  "1. open": "248.4000",
                  "2. high": "250.5700",
                  "3. low": "247.0700",
                  "4. close": "248.0000",
                  "5. volume": "1341587"
              },
              "2024-04-09": {
                  "1. open": "253.3200",
                  "2. high": "253.6850",
                  "3. low": "246.8500",
                  "4. close": "248.0300",
                  "5. volume": "1423911"
              },
              "2024-04-08": {
                  "1. open": "252.5600",
                  "2. high": "253.8800",
                  "3. low": "251.8200",
                  "4. close": "253.1600",
                  "5. volume": "1255489"
              },
              "2024-04-05": {
                  "1. open": "254.0000",
                  "2. high": "254.7100",
                  "3. low": "252.4450",
                  "4. close": "252.9000",
                  "5. volume": "1265835"
              },
              "2024-04-04": {
                  "1. open": "255.3100",
                  "2. high": "257.0700",
                  "3. low": "252.0200",
                  "4. close": "252.2300",
                  "5. volume": "1331035"
              },
              "2024-04-03": {
                  "1. open": "256.0600",
                  "2. high": "257.0000",
                  "3. low": "254.6000",
                  "4. close": "254.7900",
                  "5. volume": "1101216"
              },
              "2024-04-02": {
                  "1. open": "257.8600",
                  "2. high": "258.2800",
                  "3. low": "256.0600",
                  "4. close": "256.3400",
                  "5. volume": "926366"
              },
              "2024-04-01": {
                  "1. open": "258.9700",
                  "2. high": "259.0000",
                  "3. low": "256.6000",
                  "4. close": "257.4000",
                  "5. volume": "740995"
              },
              "2024-03-28": {
                  "1. open": "259.1800",
                  "2. high": "259.9200",
                  "3. low": "257.9650",
                  "4. close": "259.1300",
                  "5. volume": "1878945"
              },
              "2024-03-27": {
                  "1. open": "256.9800",
                  "2. high": "258.5900",
                  "3. low": "256.6000",
                  "4. close": "258.5000",
                  "5. volume": "1493616"
              },
              "2024-03-26": {
                  "1. open": "254.7800",
                  "2. high": "257.5550",
                  "3. low": "254.4100",
                  "4. close": "256.0800",
                  "5. volume": "2359151"
              },
              "2024-03-25": {
                  "1. open": "256.0800",
                  "2. high": "256.9000",
                  "3. low": "255.0400",
                  "4. close": "255.6100",
                  "5. volume": "1332261"
              },
              "2024-03-22": {
                  "1. open": "256.6000",
                  "2. high": "257.3200",
                  "3. low": "255.4000",
                  "4. close": "255.5100",
                  "5. volume": "1198170"
              },
              "2024-03-21": {
                  "1. open": "257.5900",
                  "2. high": "257.9999",
                  "3. low": "255.8400",
                  "4. close": "256.3100",
                  "5. volume": "2748117"
              },
              "2024-03-20": {
                  "1. open": "258.0800",
                  "2. high": "260.0900",
                  "3. low": "257.6315",
                  "4. close": "258.5100",
                  "5. volume": "1774773"
              },
              "2024-03-19": {
                  "1. open": "259.0000",
                  "2. high": "259.6900",
                  "3. low": "258.0650",
                  "4. close": "258.4800",
                  "5. volume": "1611208"
              },
              "2024-03-18": {
                  "1. open": "256.5200",
                  "2. high": "258.2900",
                  "3. low": "256.0100",
                  "4. close": "257.6400",
                  "5. volume": "1267405"
              },
              "2024-03-15": {
                  "1. open": "255.3300",
                  "2. high": "258.7500",
                  "3. low": "255.3300",
                  "4. close": "256.2900",
                  "5. volume": "3390965"
              },
              "2024-03-14": {
                  "1. open": "257.4700",
                  "2. high": "259.5600",
                  "3. low": "255.2200",
                  "4. close": "257.6300",
                  "5. volume": "1504437"
              },
              "2024-03-13": {
                  "1. open": "258.4900",
                  "2. high": "260.5850",
                  "3. low": "257.6300",
                  "4. close": "260.2100",
                  "5. volume": "1666987"
              },
              "2024-03-12": {
                  "1. open": "254.8800",
                  "2. high": "258.1500",
                  "3. low": "254.2400",
                  "4. close": "257.7500",
                  "5. volume": "1930723"
              },
              "2024-03-11": {
                  "1. open": "248.5000",
                  "2. high": "255.8800",
                  "3. low": "248.3000",
                  "4. close": "255.0000",
                  "5. volume": "2119062"
              },
              "2024-03-08": {
                  "1. open": "248.5800",
                  "2. high": "249.6950",
                  "3. low": "247.1800",
                  "4. close": "248.8100",
                  "5. volume": "1339200"
              },
              "2024-03-07": {
                  "1. open": "250.1700",
                  "2. high": "251.5400",
                  "3. low": "248.4600",
                  "4. close": "248.8200",
                  "5. volume": "1720581"
              },
              "2024-03-06": {
                  "1. open": "249.6100",
                  "2. high": "251.1800",
                  "3. low": "247.5800",
                  "4. close": "250.5500",
                  "5. volume": "1774388"
              },
              "2024-03-05": {
                  "1. open": "248.2500",
                  "2. high": "249.9100",
                  "3. low": "247.8590",
                  "4. close": "249.3600",
                  "5. volume": "1440074"
              },
              "2024-03-04": {
                  "1. open": "249.4600",
                  "2. high": "250.6300",
                  "3. low": "248.0700",
                  "4. close": "248.2600",
                  "5. volume": "2003709"
              },
              "2024-03-01": {
                  "1. open": "251.2500",
                  "2. high": "251.9750",
                  "3. low": "249.9000",
                  "4. close": "250.6200",
                  "5. volume": "1634571"
              },
              "2024-02-29": {
                  "1. open": "253.9400",
                  "2. high": "253.9400",
                  "3. low": "250.4500",
                  "4. close": "251.6700",
                  "5. volume": "2396962"
              },
              "2024-02-28": {
                  "1. open": "255.0000",
                  "2. high": "255.0000",
                  "3. low": "253.4300",
                  "4. close": "253.5800",
                  "5. volume": "1429924"
              },
              "2024-02-27": {
                  "1. open": "254.0200",
                  "2. high": "255.0200",
                  "3. low": "253.0801",
                  "4. close": "254.8700",
                  "5. volume": "959064"
              },
              "2024-02-26": {
                  "1. open": "256.1200",
                  "2. high": "257.8400",
                  "3. low": "254.6800",
                  "4. close": "254.8400",
                  "5. volume": "1251802"
              },
              "2024-02-23": {
                  "1. open": "256.4700",
                  "2. high": "257.6350",
                  "3. low": "254.7100",
                  "4. close": "256.0100",
                  "5. volume": "1153051"
              },
              "2024-02-22": {
                  "1. open": "252.6600",
                  "2. high": "255.7100",
                  "3. low": "250.7100",
                  "4. close": "255.4400",
                  "5. volume": "1233455"
              },
              "2024-02-21": {
                  "1. open": "252.2600",
                  "2. high": "253.1600",
                  "3. low": "250.1800",
                  "4. close": "251.9600",
                  "5. volume": "992002"
              },
              "2024-02-20": {
                  "1. open": "250.3800",
                  "2. high": "252.5550",
                  "3. low": "250.1245",
                  "4. close": "250.5100",
                  "5. volume": "1248297"
              },
              "2024-02-16": {
                  "1. open": "251.1700",
                  "2. high": "252.7000",
                  "3. low": "250.0000",
                  "4. close": "250.9000",
                  "5. volume": "1329466"
              },
              "2024-02-15": {
                  "1. open": "248.3800",
                  "2. high": "251.7600",
                  "3. low": "248.2700",
                  "4. close": "251.0600",
                  "5. volume": "1447943"
              },
              "2024-02-14": {
                  "1. open": "247.0000",
                  "2. high": "248.7900",
                  "3. low": "246.4700",
                  "4. close": "248.1200",
                  "5. volume": "2054293"
              },
              "2024-02-13": {
                  "1. open": "248.9100",
                  "2. high": "250.3050",
                  "3. low": "244.9600",
                  "4. close": "246.8200",
                  "5. volume": "1505029"
              },
              "2024-02-12": {
                  "1. open": "247.3500",
                  "2. high": "249.1999",
                  "3. low": "246.5000",
                  "4. close": "248.0100",
                  "5. volume": "1234657"
              },
              "2024-02-09": {
                  "1. open": "243.3200",
                  "2. high": "247.2800",
                  "3. low": "243.3200",
                  "4. close": "247.2100",
                  "5. volume": "1471276"
              },
              "2024-02-08": {
                  "1. open": "246.0500",
                  "2. high": "246.8300",
                  "3. low": "242.4050",
                  "4. close": "244.3400",
                  "5. volume": "1630712"
              },
              "2024-02-07": {
                  "1. open": "247.6500",
                  "2. high": "248.3500",
                  "3. low": "245.8600",
                  "4. close": "246.8900",
                  "5. volume": "1982498"
              },
              "2024-02-06": {
                  "1. open": "249.0900",
                  "2. high": "249.6200",
                  "3. low": "247.1250",
                  "4. close": "247.6700",
                  "5. volume": "1425915"
              },
              "2024-02-05": {
                  "1. open": "246.3200",
                  "2. high": "249.6200",
                  "3. low": "245.8200",
                  "4. close": "249.2500",
                  "5. volume": "2139030"
              },
              "2024-02-02": {
                  "1. open": "245.8200",
                  "2. high": "248.1900",
                  "3. low": "245.8200",
                  "4. close": "246.6900",
                  "5. volume": "2094598"
              },
              "2024-02-01": {
                  "1. open": "244.7300",
                  "2. high": "245.8700",
                  "3. low": "242.3600",
                  "4. close": "244.9500",
                  "5. volume": "2030001"
              },
              "2024-01-31": {
                  "1. open": "247.2000",
                  "2. high": "248.5500",
                  "3. low": "244.2150",
                  "4. close": "245.0000",
                  "5. volume": "3530914"
              },
              "2024-01-30": {
                  "1. open": "243.5900",
                  "2. high": "243.9900",
                  "3. low": "242.1300",
                  "4. close": "243.1700",
                  "5. volume": "2641242"
              },
              "2024-01-29": {
                  "1. open": "240.7500",
                  "2. high": "242.9200",
                  "3. low": "240.2050",
                  "4. close": "242.7700",
                  "5. volume": "1738634"
              },
              "2024-01-26": {
                  "1. open": "241.0500",
                  "2. high": "241.5400",
                  "3. low": "240.1200",
                  "4. close": "241.2400",
                  "5. volume": "1764062"
              },
              "2024-01-25": {
                  "1. open": "241.7000",
                  "2. high": "243.1900",
                  "3. low": "239.1700",
                  "4. close": "241.2100",
                  "5. volume": "2020117"
              },
              "2024-01-24": {
                  "1. open": "241.7400",
                  "2. high": "244.3400",
                  "3. low": "241.2600",
                  "4. close": "241.5800",
                  "5. volume": "2460163"
              },
              "2024-01-23": {
                  "1. open": "240.0000",
                  "2. high": "242.1300",
                  "3. low": "239.7300",
                  "4. close": "240.3500",
                  "5. volume": "2228636"
              },
              "2024-01-22": {
                  "1. open": "237.6700",
                  "2. high": "240.3300",
                  "3. low": "237.6700",
                  "4. close": "239.0000",
                  "5. volume": "2550348"
              },
              "2024-01-19": {
                  "1. open": "232.9200",
                  "2. high": "238.0400",
                  "3. low": "232.3600",
                  "4. close": "237.3200",
                  "5. volume": "3549648"
              },
              "2024-01-18": {
                  "1. open": "228.1900",
                  "2. high": "230.2400",
                  "3. low": "226.7400",
                  "4. close": "230.0300",
                  "5. volume": "1280503"
              },
              "2024-01-17": {
                  "1. open": "228.0000",
                  "2. high": "232.2800",
                  "3. low": "227.6800",
                  "4. close": "228.2500",
                  "5. volume": "2164460"
              },
              "2024-01-16": {
                  "1. open": "227.8200",
                  "2. high": "228.6400",
                  "3. low": "226.0600",
                  "4. close": "227.7300",
                  "5. volume": "1654967"
              },
              "2024-01-12": {
                  "1. open": "228.7000",
                  "2. high": "229.4300",
                  "3. low": "226.5600",
                  "4. close": "227.5500",
                  "5. volume": "1446753"
              },
              "2024-01-11": {
                  "1. open": "226.0000",
                  "2. high": "228.0900",
                  "3. low": "224.7400",
                  "4. close": "227.7100",
                  "5. volume": "1555151"
              },
              "2024-01-10": {
                  "1. open": "224.7400",
                  "2. high": "226.0775",
                  "3. low": "223.5500",
                  "4. close": "225.2500",
                  "5. volume": "1716775"
              },
              "2024-01-09": {
                  "1. open": "226.2000",
                  "2. high": "226.2000",
                  "3. low": "222.8550",
                  "4. close": "225.3100",
                  "5. volume": "1293274"
              },
              "2024-01-08": {
                  "1. open": "227.6500",
                  "2. high": "227.9900",
                  "3. low": "223.6900",
                  "4. close": "226.2000",
                  "5. volume": "1535483"
              },
              "2024-01-05": {
                  "1. open": "228.7200",
                  "2. high": "229.1200",
                  "3. low": "226.6300",
                  "4. close": "227.7000",
                  "5. volume": "1437477"
              },
              "2024-01-04": {
                  "1. open": "228.7500",
                  "2. high": "230.1900",
                  "3. low": "227.2800",
                  "4. close": "227.3000",
                  "5. volume": "1583893"
              },
              "2024-01-03": {
                  "1. open": "229.0800",
                  "2. high": "229.4900",
                  "3. low": "226.3500",
                  "4. close": "226.4100",
                  "5. volume": "1811068"
              },
              "2024-01-02": {
                  "1. open": "226.3700",
                  "2. high": "228.4800",
                  "3. low": "226.2938",
                  "4. close": "227.3500",
                  "5. volume": "2399274"
              },
              "2023-12-29": {
                  "1. open": "224.4000",
                  "2. high": "226.6200",
                  "3. low": "224.2800",
                  "4. close": "226.0000",
                  "5. volume": "1671583"
              },
              "2023-12-28": {
                  "1. open": "224.4000",
                  "2. high": "225.6150",
                  "3. low": "224.0800",
                  "4. close": "224.4300",
                  "5. volume": "1327419"
              },
              "2023-12-27": {
                  "1. open": "221.0100",
                  "2. high": "223.0853",
                  "3. low": "221.0100",
                  "4. close": "222.6900",
                  "5. volume": "1001742"
              },
              "2023-12-26": {
                  "1. open": "220.2300",
                  "2. high": "222.4500",
                  "3. low": "220.2300",
                  "4. close": "222.0700",
                  "5. volume": "1134221"
              },
              "2023-12-22": {
                  "1. open": "220.8300",
                  "2. high": "221.7300",
                  "3. low": "220.2100",
                  "4. close": "220.7700",
                  "5. volume": "1004514"
              },
              "2023-12-21": {
                  "1. open": "218.0800",
                  "2. high": "220.1700",
                  "3. low": "216.9050",
                  "4. close": "220.0200",
                  "5. volume": "1572713"
              },
              "2023-12-20": {
                  "1. open": "220.2700",
                  "2. high": "221.4200",
                  "3. low": "218.7200",
                  "4. close": "218.8100",
                  "5. volume": "1672165"
              },
              "2023-12-19": {
                  "1. open": "220.2700",
                  "2. high": "221.8700",
                  "3. low": "219.4649",
                  "4. close": "221.8100",
                  "5. volume": "1758699"
              },
              "2023-12-18": {
                  "1. open": "220.2700",
                  "2. high": "221.6000",
                  "3. low": "219.1850",
                  "4. close": "220.3100",
                  "5. volume": "1492197"
              },
              "2023-12-15": {
                  "1. open": "219.2100",
                  "2. high": "221.8700",
                  "3. low": "217.5400",
                  "4. close": "220.0700",
                  "5. volume": "5574733"
              },
              "2023-12-14": {
                  "1. open": "224.6300",
                  "2. high": "224.6300",
                  "3. low": "218.1700",
                  "4. close": "220.5100",
                  "5. volume": "4839734"
              },
              "2023-12-13": {
                  "1. open": "226.9100",
                  "2. high": "228.2400",
                  "3. low": "225.7700",
                  "4. close": "226.1100",
                  "5. volume": "2338590"
              },
              "2023-12-12": {
                  "1. open": "225.5200",
                  "2. high": "227.9750",
                  "3. low": "224.7700",
                  "4. close": "227.0700",
                  "5. volume": "1795120"
              },
              "2023-12-11": {
                  "1. open": "223.9100",
                  "2. high": "225.1600",
                  "3. low": "222.2500",
                  "4. close": "224.4700",
                  "5. volume": "2119082"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "DPZ",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "518.3000",
                  "2. high": "518.9899",
                  "3. low": "509.0800",
                  "4. close": "514.3300",
                  "5. volume": "583565"
              },
              "2024-05-02": {
                  "1. open": "517.3200",
                  "2. high": "520.0150",
                  "3. low": "511.6950",
                  "4. close": "512.7000",
                  "5. volume": "470021"
              },
              "2024-05-01": {
                  "1. open": "525.5800",
                  "2. high": "528.9900",
                  "3. low": "515.0000",
                  "4. close": "516.4200",
                  "5. volume": "690470"
              },
              "2024-04-30": {
                  "1. open": "528.4100",
                  "2. high": "542.7499",
                  "3. low": "522.9116",
                  "4. close": "529.2700",
                  "5. volume": "1314496"
              },
              "2024-04-29": {
                  "1. open": "530.3000",
                  "2. high": "539.9900",
                  "3. low": "508.2900",
                  "4. close": "527.1300",
                  "5. volume": "1903785"
              },
              "2024-04-26": {
                  "1. open": "492.3700",
                  "2. high": "502.6300",
                  "3. low": "491.2800",
                  "4. close": "499.0700",
                  "5. volume": "958086"
              },
              "2024-04-25": {
                  "1. open": "487.9700",
                  "2. high": "498.4400",
                  "3. low": "484.6650",
                  "4. close": "494.7700",
                  "5. volume": "661670"
              },
              "2024-04-24": {
                  "1. open": "479.6100",
                  "2. high": "488.8400",
                  "3. low": "478.0400",
                  "4. close": "487.7100",
                  "5. volume": "719359"
              },
              "2024-04-23": {
                  "1. open": "475.5900",
                  "2. high": "483.5100",
                  "3. low": "471.6050",
                  "4. close": "481.1600",
                  "5. volume": "663590"
              },
              "2024-04-22": {
                  "1. open": "477.4500",
                  "2. high": "477.4500",
                  "3. low": "469.1700",
                  "4. close": "471.2800",
                  "5. volume": "578210"
              },
              "2024-04-19": {
                  "1. open": "483.3200",
                  "2. high": "483.3200",
                  "3. low": "469.9900",
                  "4. close": "473.5500",
                  "5. volume": "590272"
              },
              "2024-04-18": {
                  "1. open": "483.0800",
                  "2. high": "487.4429",
                  "3. low": "478.5700",
                  "4. close": "481.6600",
                  "5. volume": "350554"
              },
              "2024-04-17": {
                  "1. open": "490.3300",
                  "2. high": "490.3300",
                  "3. low": "479.6100",
                  "4. close": "482.0500",
                  "5. volume": "328702"
              },
              "2024-04-16": {
                  "1. open": "489.1900",
                  "2. high": "489.5799",
                  "3. low": "484.1100",
                  "4. close": "486.6500",
                  "5. volume": "346095"
              },
              "2024-04-15": {
                  "1. open": "498.8800",
                  "2. high": "500.1800",
                  "3. low": "487.9400",
                  "4. close": "488.0200",
                  "5. volume": "406304"
              },
              "2024-04-12": {
                  "1. open": "500.8300",
                  "2. high": "502.5950",
                  "3. low": "494.9150",
                  "4. close": "495.3100",
                  "5. volume": "475739"
              },
              "2024-04-11": {
                  "1. open": "507.9300",
                  "2. high": "507.9300",
                  "3. low": "498.5100",
                  "4. close": "504.5200",
                  "5. volume": "408298"
              },
              "2024-04-10": {
                  "1. open": "493.8500",
                  "2. high": "507.9250",
                  "3. low": "491.0900",
                  "4. close": "506.8300",
                  "5. volume": "771788"
              },
              "2024-04-09": {
                  "1. open": "500.1000",
                  "2. high": "501.1400",
                  "3. low": "493.9600",
                  "4. close": "498.4500",
                  "5. volume": "555243"
              },
              "2024-04-08": {
                  "1. open": "492.7500",
                  "2. high": "503.1900",
                  "3. low": "492.7500",
                  "4. close": "501.9800",
                  "5. volume": "762547"
              },
              "2024-04-05": {
                  "1. open": "485.0000",
                  "2. high": "494.9550",
                  "3. low": "485.0000",
                  "4. close": "493.2000",
                  "5. volume": "690713"
              },
              "2024-04-04": {
                  "1. open": "506.0000",
                  "2. high": "506.0000",
                  "3. low": "482.7800",
                  "4. close": "482.8600",
                  "5. volume": "841519"
              },
              "2024-04-03": {
                  "1. open": "495.8900",
                  "2. high": "508.4400",
                  "3. low": "494.8200",
                  "4. close": "505.8600",
                  "5. volume": "1024918"
              },
              "2024-04-02": {
                  "1. open": "493.3000",
                  "2. high": "498.2100",
                  "3. low": "487.9500",
                  "4. close": "497.2600",
                  "5. volume": "513003"
              },
              "2024-04-01": {
                  "1. open": "495.0500",
                  "2. high": "498.1000",
                  "3. low": "492.1300",
                  "4. close": "493.9200",
                  "5. volume": "618751"
              },
              "2024-03-28": {
                  "1. open": "493.7300",
                  "2. high": "497.1400",
                  "3. low": "489.7700",
                  "4. close": "496.8800",
                  "5. volume": "668820"
              },
              "2024-03-27": {
                  "1. open": "485.8600",
                  "2. high": "493.1900",
                  "3. low": "485.0600",
                  "4. close": "492.1300",
                  "5. volume": "997421"
              },
              "2024-03-26": {
                  "1. open": "471.4400",
                  "2. high": "483.4900",
                  "3. low": "467.3400",
                  "4. close": "483.0000",
                  "5. volume": "955853"
              },
              "2024-03-25": {
                  "1. open": "458.9500",
                  "2. high": "467.0000",
                  "3. low": "458.0100",
                  "4. close": "465.1100",
                  "5. volume": "521259"
              },
              "2024-03-22": {
                  "1. open": "457.0000",
                  "2. high": "459.3800",
                  "3. low": "454.3900",
                  "4. close": "458.4200",
                  "5. volume": "395962"
              },
              "2024-03-21": {
                  "1. open": "451.0500",
                  "2. high": "456.6400",
                  "3. low": "448.2100",
                  "4. close": "455.8700",
                  "5. volume": "591953"
              },
              "2024-03-20": {
                  "1. open": "445.8000",
                  "2. high": "451.8300",
                  "3. low": "445.1100",
                  "4. close": "451.7200",
                  "5. volume": "366013"
              },
              "2024-03-19": {
                  "1. open": "443.9500",
                  "2. high": "445.1300",
                  "3. low": "440.2500",
                  "4. close": "444.9000",
                  "5. volume": "427710"
              },
              "2024-03-18": {
                  "1. open": "442.4600",
                  "2. high": "446.0300",
                  "3. low": "440.3700",
                  "4. close": "442.7900",
                  "5. volume": "430918"
              },
              "2024-03-15": {
                  "1. open": "440.2700",
                  "2. high": "445.7126",
                  "3. low": "439.9900",
                  "4. close": "441.2200",
                  "5. volume": "512128"
              },
              "2024-03-14": {
                  "1. open": "450.2600",
                  "2. high": "451.9900",
                  "3. low": "443.0500",
                  "4. close": "443.6600",
                  "5. volume": "408002"
              },
              "2024-03-13": {
                  "1. open": "453.3300",
                  "2. high": "454.2150",
                  "3. low": "449.1550",
                  "4. close": "452.4800",
                  "5. volume": "493909"
              },
              "2024-03-12": {
                  "1. open": "444.9400",
                  "2. high": "453.0400",
                  "3. low": "444.6700",
                  "4. close": "452.5800",
                  "5. volume": "492513"
              },
              "2024-03-11": {
                  "1. open": "443.6800",
                  "2. high": "445.9200",
                  "3. low": "439.5100",
                  "4. close": "443.9000",
                  "5. volume": "415562"
              },
              "2024-03-08": {
                  "1. open": "445.8400",
                  "2. high": "450.4500",
                  "3. low": "442.8500",
                  "4. close": "445.0100",
                  "5. volume": "475983"
              },
              "2024-03-07": {
                  "1. open": "448.9400",
                  "2. high": "452.6150",
                  "3. low": "446.8450",
                  "4. close": "447.3700",
                  "5. volume": "523045"
              },
              "2024-03-06": {
                  "1. open": "451.7200",
                  "2. high": "451.9400",
                  "3. low": "443.8250",
                  "4. close": "447.2400",
                  "5. volume": "501435"
              },
              "2024-03-05": {
                  "1. open": "450.3200",
                  "2. high": "450.8000",
                  "3. low": "445.8300",
                  "4. close": "449.5900",
                  "5. volume": "344838"
              },
              "2024-03-04": {
                  "1. open": "447.4500",
                  "2. high": "452.2750",
                  "3. low": "446.5301",
                  "4. close": "449.9900",
                  "5. volume": "419101"
              },
              "2024-03-01": {
                  "1. open": "448.0000",
                  "2. high": "449.4800",
                  "3. low": "444.6900",
                  "4. close": "447.2300",
                  "5. volume": "423376"
              },
              "2024-02-29": {
                  "1. open": "447.9900",
                  "2. high": "451.6200",
                  "3. low": "443.6450",
                  "4. close": "448.3500",
                  "5. volume": "787709"
              },
              "2024-02-28": {
                  "1. open": "446.0600",
                  "2. high": "451.9699",
                  "3. low": "444.2500",
                  "4. close": "446.3700",
                  "5. volume": "585768"
              },
              "2024-02-27": {
                  "1. open": "460.2600",
                  "2. high": "460.2755",
                  "3. low": "444.0400",
                  "4. close": "446.2700",
                  "5. volume": "1055211"
              },
              "2024-02-26": {
                  "1. open": "463.0000",
                  "2. high": "476.1800",
                  "3. low": "456.7800",
                  "4. close": "459.0000",
                  "5. volume": "2263734"
              },
              "2024-02-23": {
                  "1. open": "430.0000",
                  "2. high": "434.0350",
                  "3. low": "427.9400",
                  "4. close": "433.6500",
                  "5. volume": "977119"
              },
              "2024-02-22": {
                  "1. open": "421.3900",
                  "2. high": "429.3100",
                  "3. low": "419.3800",
                  "4. close": "428.0100",
                  "5. volume": "569584"
              },
              "2024-02-21": {
                  "1. open": "417.6600",
                  "2. high": "421.6800",
                  "3. low": "416.3525",
                  "4. close": "420.7600",
                  "5. volume": "486225"
              },
              "2024-02-20": {
                  "1. open": "421.1400",
                  "2. high": "421.3900",
                  "3. low": "416.4600",
                  "4. close": "417.1500",
                  "5. volume": "449058"
              },
              "2024-02-16": {
                  "1. open": "423.6700",
                  "2. high": "427.9000",
                  "3. low": "421.5471",
                  "4. close": "421.8500",
                  "5. volume": "406430"
              },
              "2024-02-15": {
                  "1. open": "425.1900",
                  "2. high": "428.5099",
                  "3. low": "422.2400",
                  "4. close": "424.7200",
                  "5. volume": "370092"
              },
              "2024-02-14": {
                  "1. open": "423.7300",
                  "2. high": "424.7200",
                  "3. low": "417.6400",
                  "4. close": "424.4800",
                  "5. volume": "482963"
              },
              "2024-02-13": {
                  "1. open": "421.9600",
                  "2. high": "425.5900",
                  "3. low": "418.6400",
                  "4. close": "421.5000",
                  "5. volume": "411190"
              },
              "2024-02-12": {
                  "1. open": "425.0900",
                  "2. high": "429.0000",
                  "3. low": "424.8250",
                  "4. close": "427.2900",
                  "5. volume": "385444"
              },
              "2024-02-09": {
                  "1. open": "426.0000",
                  "2. high": "427.5500",
                  "3. low": "424.4500",
                  "4. close": "425.0900",
                  "5. volume": "391540"
              },
              "2024-02-08": {
                  "1. open": "424.5800",
                  "2. high": "431.4700",
                  "3. low": "423.0100",
                  "4. close": "426.5800",
                  "5. volume": "540356"
              },
              "2024-02-07": {
                  "1. open": "421.6300",
                  "2. high": "427.9000",
                  "3. low": "418.4400",
                  "4. close": "421.9500",
                  "5. volume": "527118"
              },
              "2024-02-06": {
                  "1. open": "416.3600",
                  "2. high": "424.9800",
                  "3. low": "413.5600",
                  "4. close": "421.5800",
                  "5. volume": "594213"
              },
              "2024-02-05": {
                  "1. open": "420.6900",
                  "2. high": "422.4150",
                  "3. low": "414.2900",
                  "4. close": "418.0500",
                  "5. volume": "504894"
              },
              "2024-02-02": {
                  "1. open": "430.6400",
                  "2. high": "430.6400",
                  "3. low": "421.4400",
                  "4. close": "422.0600",
                  "5. volume": "637615"
              },
              "2024-02-01": {
                  "1. open": "427.8800",
                  "2. high": "433.8400",
                  "3. low": "426.3500",
                  "4. close": "433.5300",
                  "5. volume": "413790"
              },
              "2024-01-31": {
                  "1. open": "436.1300",
                  "2. high": "436.1300",
                  "3. low": "424.4700",
                  "4. close": "426.2200",
                  "5. volume": "436734"
              },
              "2024-01-30": {
                  "1. open": "433.4200",
                  "2. high": "439.1600",
                  "3. low": "432.9500",
                  "4. close": "434.7400",
                  "5. volume": "557964"
              },
              "2024-01-29": {
                  "1. open": "420.4300",
                  "2. high": "433.7300",
                  "3. low": "419.0743",
                  "4. close": "433.4400",
                  "5. volume": "619486"
              },
              "2024-01-26": {
                  "1. open": "418.1900",
                  "2. high": "420.7800",
                  "3. low": "416.5450",
                  "4. close": "419.1200",
                  "5. volume": "351857"
              },
              "2024-01-25": {
                  "1. open": "421.0000",
                  "2. high": "421.0200",
                  "3. low": "412.8400",
                  "4. close": "418.0800",
                  "5. volume": "489461"
              },
              "2024-01-24": {
                  "1. open": "428.0400",
                  "2. high": "429.4500",
                  "3. low": "420.2400",
                  "4. close": "421.7700",
                  "5. volume": "410187"
              },
              "2024-01-23": {
                  "1. open": "428.9300",
                  "2. high": "430.7600",
                  "3. low": "423.6150",
                  "4. close": "425.7100",
                  "5. volume": "406134"
              },
              "2024-01-22": {
                  "1. open": "426.7700",
                  "2. high": "430.3800",
                  "3. low": "425.3200",
                  "4. close": "428.0100",
                  "5. volume": "488566"
              },
              "2024-01-19": {
                  "1. open": "428.3000",
                  "2. high": "428.4100",
                  "3. low": "421.9600",
                  "4. close": "426.7700",
                  "5. volume": "500959"
              },
              "2024-01-18": {
                  "1. open": "426.6500",
                  "2. high": "432.4900",
                  "3. low": "421.5800",
                  "4. close": "425.9300",
                  "5. volume": "603916"
              },
              "2024-01-17": {
                  "1. open": "422.8900",
                  "2. high": "427.7899",
                  "3. low": "420.7500",
                  "4. close": "422.4000",
                  "5. volume": "528622"
              },
              "2024-01-16": {
                  "1. open": "414.2700",
                  "2. high": "425.9700",
                  "3. low": "412.7050",
                  "4. close": "425.9400",
                  "5. volume": "705507"
              },
              "2024-01-12": {
                  "1. open": "413.9700",
                  "2. high": "413.9700",
                  "3. low": "406.9600",
                  "4. close": "411.3000",
                  "5. volume": "359762"
              },
              "2024-01-11": {
                  "1. open": "414.7800",
                  "2. high": "414.7800",
                  "3. low": "408.1500",
                  "4. close": "411.8000",
                  "5. volume": "313438"
              },
              "2024-01-10": {
                  "1. open": "410.5100",
                  "2. high": "414.2600",
                  "3. low": "406.7900",
                  "4. close": "414.1300",
                  "5. volume": "447841"
              },
              "2024-01-09": {
                  "1. open": "401.5700",
                  "2. high": "412.1000",
                  "3. low": "400.2700",
                  "4. close": "410.1400",
                  "5. volume": "541153"
              },
              "2024-01-08": {
                  "1. open": "402.2300",
                  "2. high": "404.3994",
                  "3. low": "395.0800",
                  "4. close": "402.6900",
                  "5. volume": "690399"
              },
              "2024-01-05": {
                  "1. open": "400.0100",
                  "2. high": "404.5500",
                  "3. low": "399.6300",
                  "4. close": "400.0300",
                  "5. volume": "519631"
              },
              "2024-01-04": {
                  "1. open": "400.8800",
                  "2. high": "404.9500",
                  "3. low": "399.4200",
                  "4. close": "401.2700",
                  "5. volume": "525029"
              },
              "2024-01-03": {
                  "1. open": "412.8800",
                  "2. high": "413.4700",
                  "3. low": "400.3800",
                  "4. close": "400.4600",
                  "5. volume": "612693"
              },
              "2024-01-02": {
                  "1. open": "408.9000",
                  "2. high": "414.7750",
                  "3. low": "408.2500",
                  "4. close": "413.1400",
                  "5. volume": "546379"
              },
              "2023-12-29": {
                  "1. open": "411.2400",
                  "2. high": "414.2700",
                  "3. low": "409.5500",
                  "4. close": "412.2300",
                  "5. volume": "361128"
              },
              "2023-12-28": {
                  "1. open": "412.7400",
                  "2. high": "414.0000",
                  "3. low": "410.9100",
                  "4. close": "411.2100",
                  "5. volume": "226164"
              },
              "2023-12-27": {
                  "1. open": "411.5000",
                  "2. high": "414.1500",
                  "3. low": "408.7700",
                  "4. close": "413.8500",
                  "5. volume": "263933"
              },
              "2023-12-26": {
                  "1. open": "408.4600",
                  "2. high": "412.5100",
                  "3. low": "408.4600",
                  "4. close": "411.3400",
                  "5. volume": "307393"
              },
              "2023-12-22": {
                  "1. open": "409.0000",
                  "2. high": "412.5000",
                  "3. low": "407.8700",
                  "4. close": "409.8400",
                  "5. volume": "382706"
              },
              "2023-12-21": {
                  "1. open": "406.5100",
                  "2. high": "409.5999",
                  "3. low": "403.2800",
                  "4. close": "408.8000",
                  "5. volume": "366509"
              },
              "2023-12-20": {
                  "1. open": "406.5500",
                  "2. high": "411.2121",
                  "3. low": "403.0700",
                  "4. close": "403.2500",
                  "5. volume": "445473"
              },
              "2023-12-19": {
                  "1. open": "406.0000",
                  "2. high": "410.5200",
                  "3. low": "403.8900",
                  "4. close": "406.5500",
                  "5. volume": "444816"
              },
              "2023-12-18": {
                  "1. open": "402.8500",
                  "2. high": "405.3799",
                  "3. low": "399.1700",
                  "4. close": "403.0400",
                  "5. volume": "563652"
              },
              "2023-12-15": {
                  "1. open": "399.3900",
                  "2. high": "401.8100",
                  "3. low": "395.9250",
                  "4. close": "400.0500",
                  "5. volume": "1381776"
              },
              "2023-12-14": {
                  "1. open": "405.0000",
                  "2. high": "407.8850",
                  "3. low": "400.0750",
                  "4. close": "402.8500",
                  "5. volume": "670501"
              },
              "2023-12-13": {
                  "1. open": "394.0000",
                  "2. high": "404.8499",
                  "3. low": "393.0000",
                  "4. close": "402.8000",
                  "5. volume": "518536"
              },
              "2023-12-12": {
                  "1. open": "398.9900",
                  "2. high": "399.0000",
                  "3. low": "393.9700",
                  "4. close": "396.8100",
                  "5. volume": "489468"
              },
              "2023-12-11": {
                  "1. open": "393.0100",
                  "2. high": "399.1350",
                  "3. low": "392.6150",
                  "4. close": "397.4800",
                  "5. volume": "655482"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "FRSH",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "14.9300",
                  "2. high": "14.9500",
                  "3. low": "13.8250",
                  "4. close": "14.0300",
                  "5. volume": "6974887"
              },
              "2024-05-02": {
                  "1. open": "13.4000",
                  "2. high": "14.7700",
                  "3. low": "13.0100",
                  "4. close": "14.6700",
                  "5. volume": "22956337"
              },
              "2024-05-01": {
                  "1. open": "17.9000",
                  "2. high": "18.7800",
                  "3. low": "17.8600",
                  "4. close": "18.2500",
                  "5. volume": "3567705"
              },
              "2024-04-30": {
                  "1. open": "18.1600",
                  "2. high": "18.3750",
                  "3. low": "17.8400",
                  "4. close": "17.8500",
                  "5. volume": "2290450"
              },
              "2024-04-29": {
                  "1. open": "18.5300",
                  "2. high": "18.7400",
                  "3. low": "18.2800",
                  "4. close": "18.4200",
                  "5. volume": "2421908"
              },
              "2024-04-26": {
                  "1. open": "18.7400",
                  "2. high": "18.7400",
                  "3. low": "18.2600",
                  "4. close": "18.4400",
                  "5. volume": "2779528"
              },
              "2024-04-25": {
                  "1. open": "18.0100",
                  "2. high": "18.6100",
                  "3. low": "18.0100",
                  "4. close": "18.5600",
                  "5. volume": "1561483"
              },
              "2024-04-24": {
                  "1. open": "18.3100",
                  "2. high": "18.5800",
                  "3. low": "18.1300",
                  "4. close": "18.5200",
                  "5. volume": "2332877"
              },
              "2024-04-23": {
                  "1. open": "18.0900",
                  "2. high": "18.6700",
                  "3. low": "18.0100",
                  "4. close": "18.3500",
                  "5. volume": "1534434"
              },
              "2024-04-22": {
                  "1. open": "17.7300",
                  "2. high": "18.1900",
                  "3. low": "17.5950",
                  "4. close": "18.1600",
                  "5. volume": "2019197"
              },
              "2024-04-19": {
                  "1. open": "17.6700",
                  "2. high": "18.0750",
                  "3. low": "17.4550",
                  "4. close": "17.5900",
                  "5. volume": "3974486"
              },
              "2024-04-18": {
                  "1. open": "17.7600",
                  "2. high": "17.9700",
                  "3. low": "17.5400",
                  "4. close": "17.6500",
                  "5. volume": "2359309"
              },
              "2024-04-17": {
                  "1. open": "17.3600",
                  "2. high": "17.9200",
                  "3. low": "17.3350",
                  "4. close": "17.6900",
                  "5. volume": "2187499"
              },
              "2024-04-16": {
                  "1. open": "17.0000",
                  "2. high": "17.5300",
                  "3. low": "16.8600",
                  "4. close": "17.3000",
                  "5. volume": "1560507"
              },
              "2024-04-15": {
                  "1. open": "18.0300",
                  "2. high": "18.2100",
                  "3. low": "17.0000",
                  "4. close": "17.1000",
                  "5. volume": "1839783"
              },
              "2024-04-12": {
                  "1. open": "18.0400",
                  "2. high": "18.1600",
                  "3. low": "17.8500",
                  "4. close": "17.9600",
                  "5. volume": "1934099"
              },
              "2024-04-11": {
                  "1. open": "18.0600",
                  "2. high": "18.3100",
                  "3. low": "17.5800",
                  "4. close": "18.2800",
                  "5. volume": "2188484"
              },
              "2024-04-10": {
                  "1. open": "18.0300",
                  "2. high": "18.3800",
                  "3. low": "17.8850",
                  "4. close": "17.9600",
                  "5. volume": "1867051"
              },
              "2024-04-09": {
                  "1. open": "18.7700",
                  "2. high": "18.9200",
                  "3. low": "18.5550",
                  "4. close": "18.7600",
                  "5. volume": "1816493"
              },
              "2024-04-08": {
                  "1. open": "18.3200",
                  "2. high": "18.6950",
                  "3. low": "18.2100",
                  "4. close": "18.6400",
                  "5. volume": "2392104"
              },
              "2024-04-05": {
                  "1. open": "17.9500",
                  "2. high": "18.2050",
                  "3. low": "17.9300",
                  "4. close": "18.1700",
                  "5. volume": "1687316"
              },
              "2024-04-04": {
                  "1. open": "17.9400",
                  "2. high": "18.7200",
                  "3. low": "17.7800",
                  "4. close": "18.0100",
                  "5. volume": "3695032"
              },
              "2024-04-03": {
                  "1. open": "17.5500",
                  "2. high": "17.9150",
                  "3. low": "17.5350",
                  "4. close": "17.6600",
                  "5. volume": "1367311"
              },
              "2024-04-02": {
                  "1. open": "17.8000",
                  "2. high": "17.9900",
                  "3. low": "17.6500",
                  "4. close": "17.7900",
                  "5. volume": "2073789"
              },
              "2024-04-01": {
                  "1. open": "18.2000",
                  "2. high": "18.7000",
                  "3. low": "18.1650",
                  "4. close": "18.2500",
                  "5. volume": "3312513"
              },
              "2024-03-28": {
                  "1. open": "18.0600",
                  "2. high": "18.4100",
                  "3. low": "17.9900",
                  "4. close": "18.2100",
                  "5. volume": "1887909"
              },
              "2024-03-27": {
                  "1. open": "18.1500",
                  "2. high": "18.2400",
                  "3. low": "17.9300",
                  "4. close": "18.0900",
                  "5. volume": "1623523"
              },
              "2024-03-26": {
                  "1. open": "18.4400",
                  "2. high": "18.4400",
                  "3. low": "17.8900",
                  "4. close": "17.9200",
                  "5. volume": "1879588"
              },
              "2024-03-25": {
                  "1. open": "18.3500",
                  "2. high": "18.3500",
                  "3. low": "18.1150",
                  "4. close": "18.2300",
                  "5. volume": "1255548"
              },
              "2024-03-22": {
                  "1. open": "18.4500",
                  "2. high": "18.6400",
                  "3. low": "18.1600",
                  "4. close": "18.2900",
                  "5. volume": "1604744"
              },
              "2024-03-21": {
                  "1. open": "18.6200",
                  "2. high": "18.7600",
                  "3. low": "18.4350",
                  "4. close": "18.5000",
                  "5. volume": "2070041"
              },
              "2024-03-20": {
                  "1. open": "18.3400",
                  "2. high": "18.7100",
                  "3. low": "18.1750",
                  "4. close": "18.5900",
                  "5. volume": "2391987"
              },
              "2024-03-19": {
                  "1. open": "17.8100",
                  "2. high": "18.5000",
                  "3. low": "17.7600",
                  "4. close": "18.3500",
                  "5. volume": "4093439"
              },
              "2024-03-18": {
                  "1. open": "17.9000",
                  "2. high": "18.1300",
                  "3. low": "17.6400",
                  "4. close": "17.9700",
                  "5. volume": "3183272"
              },
              "2024-03-15": {
                  "1. open": "17.8300",
                  "2. high": "17.9850",
                  "3. low": "17.7050",
                  "4. close": "17.7700",
                  "5. volume": "3051206"
              },
              "2024-03-14": {
                  "1. open": "18.6600",
                  "2. high": "18.7300",
                  "3. low": "17.7950",
                  "4. close": "18.0300",
                  "5. volume": "3337769"
              },
              "2024-03-13": {
                  "1. open": "18.5400",
                  "2. high": "18.9500",
                  "3. low": "18.3700",
                  "4. close": "18.7400",
                  "5. volume": "1677592"
              },
              "2024-03-12": {
                  "1. open": "19.1300",
                  "2. high": "19.1800",
                  "3. low": "18.6500",
                  "4. close": "18.6600",
                  "5. volume": "1541896"
              },
              "2024-03-11": {
                  "1. open": "18.5400",
                  "2. high": "19.3000",
                  "3. low": "18.5400",
                  "4. close": "19.0900",
                  "5. volume": "3128955"
              },
              "2024-03-08": {
                  "1. open": "18.7600",
                  "2. high": "19.2975",
                  "3. low": "18.4600",
                  "4. close": "18.6300",
                  "5. volume": "2082377"
              },
              "2024-03-07": {
                  "1. open": "18.8500",
                  "2. high": "18.8500",
                  "3. low": "18.2700",
                  "4. close": "18.5500",
                  "5. volume": "2981272"
              },
              "2024-03-06": {
                  "1. open": "18.6400",
                  "2. high": "18.8550",
                  "3. low": "18.3100",
                  "4. close": "18.6400",
                  "5. volume": "2751604"
              },
              "2024-03-05": {
                  "1. open": "19.4600",
                  "2. high": "19.4600",
                  "3. low": "18.3400",
                  "4. close": "18.3700",
                  "5. volume": "3976032"
              },
              "2024-03-04": {
                  "1. open": "20.3900",
                  "2. high": "20.3900",
                  "3. low": "19.6500",
                  "4. close": "19.7200",
                  "5. volume": "1634458"
              },
              "2024-03-01": {
                  "1. open": "20.4100",
                  "2. high": "20.4400",
                  "3. low": "19.9499",
                  "4. close": "20.2600",
                  "5. volume": "2423904"
              },
              "2024-02-29": {
                  "1. open": "20.5400",
                  "2. high": "20.6050",
                  "3. low": "19.9100",
                  "4. close": "20.4400",
                  "5. volume": "3147796"
              },
              "2024-02-28": {
                  "1. open": "20.6300",
                  "2. high": "20.6300",
                  "3. low": "19.5350",
                  "4. close": "20.1100",
                  "5. volume": "4140156"
              },
              "2024-02-27": {
                  "1. open": "20.0000",
                  "2. high": "20.9100",
                  "3. low": "19.5036",
                  "4. close": "20.8800",
                  "5. volume": "2786194"
              },
              "2024-02-26": {
                  "1. open": "20.1200",
                  "2. high": "20.7100",
                  "3. low": "20.0200",
                  "4. close": "20.4300",
                  "5. volume": "2482503"
              },
              "2024-02-23": {
                  "1. open": "20.1400",
                  "2. high": "20.3700",
                  "3. low": "20.0850",
                  "4. close": "20.2500",
                  "5. volume": "1461867"
              },
              "2024-02-22": {
                  "1. open": "20.5800",
                  "2. high": "20.8000",
                  "3. low": "19.9650",
                  "4. close": "20.1400",
                  "5. volume": "2078799"
              },
              "2024-02-21": {
                  "1. open": "20.4800",
                  "2. high": "20.5900",
                  "3. low": "20.1200",
                  "4. close": "20.3300",
                  "5. volume": "1983794"
              },
              "2024-02-20": {
                  "1. open": "21.0700",
                  "2. high": "21.0700",
                  "3. low": "20.4400",
                  "4. close": "20.9500",
                  "5. volume": "2221510"
              },
              "2024-02-16": {
                  "1. open": "20.4400",
                  "2. high": "20.8790",
                  "3. low": "20.2900",
                  "4. close": "20.6900",
                  "5. volume": "2186665"
              },
              "2024-02-15": {
                  "1. open": "21.6100",
                  "2. high": "21.6100",
                  "3. low": "20.5850",
                  "4. close": "20.7100",
                  "5. volume": "2651570"
              },
              "2024-02-14": {
                  "1. open": "21.1500",
                  "2. high": "21.4600",
                  "3. low": "20.9800",
                  "4. close": "21.2700",
                  "5. volume": "1737785"
              },
              "2024-02-13": {
                  "1. open": "20.5100",
                  "2. high": "21.1800",
                  "3. low": "20.2000",
                  "4. close": "20.7400",
                  "5. volume": "2772076"
              },
              "2024-02-12": {
                  "1. open": "21.6400",
                  "2. high": "22.1400",
                  "3. low": "21.3850",
                  "4. close": "21.5800",
                  "5. volume": "3359189"
              },
              "2024-02-09": {
                  "1. open": "21.7700",
                  "2. high": "22.0700",
                  "3. low": "21.3500",
                  "4. close": "21.7100",
                  "5. volume": "2711340"
              },
              "2024-02-08": {
                  "1. open": "21.0000",
                  "2. high": "21.6811",
                  "3. low": "20.8000",
                  "4. close": "21.3600",
                  "5. volume": "3218600"
              },
              "2024-02-07": {
                  "1. open": "22.7400",
                  "2. high": "22.7800",
                  "3. low": "20.1692",
                  "4. close": "21.1500",
                  "5. volume": "9091835"
              },
              "2024-02-06": {
                  "1. open": "21.6400",
                  "2. high": "22.0100",
                  "3. low": "21.1208",
                  "4. close": "21.8200",
                  "5. volume": "3774726"
              },
              "2024-02-05": {
                  "1. open": "22.2700",
                  "2. high": "22.2960",
                  "3. low": "21.4300",
                  "4. close": "21.6600",
                  "5. volume": "2323751"
              },
              "2024-02-02": {
                  "1. open": "22.3600",
                  "2. high": "22.4050",
                  "3. low": "21.6400",
                  "4. close": "22.3300",
                  "5. volume": "3317995"
              },
              "2024-02-01": {
                  "1. open": "22.4900",
                  "2. high": "22.9500",
                  "3. low": "22.3150",
                  "4. close": "22.7600",
                  "5. volume": "2531111"
              },
              "2024-01-31": {
                  "1. open": "23.0000",
                  "2. high": "23.0000",
                  "3. low": "22.1450",
                  "4. close": "22.2000",
                  "5. volume": "2534215"
              },
              "2024-01-30": {
                  "1. open": "23.2300",
                  "2. high": "23.2900",
                  "3. low": "22.6950",
                  "4. close": "23.1200",
                  "5. volume": "1588329"
              },
              "2024-01-29": {
                  "1. open": "22.4500",
                  "2. high": "23.3000",
                  "3. low": "22.2500",
                  "4. close": "23.2900",
                  "5. volume": "2112767"
              },
              "2024-01-26": {
                  "1. open": "21.9700",
                  "2. high": "22.9400",
                  "3. low": "21.8279",
                  "4. close": "22.1400",
                  "5. volume": "2480577"
              },
              "2024-01-25": {
                  "1. open": "22.0500",
                  "2. high": "22.1500",
                  "3. low": "21.3100",
                  "4. close": "21.8900",
                  "5. volume": "3308020"
              },
              "2024-01-24": {
                  "1. open": "22.4400",
                  "2. high": "22.5200",
                  "3. low": "21.6300",
                  "4. close": "21.6600",
                  "5. volume": "2350312"
              },
              "2024-01-23": {
                  "1. open": "22.2400",
                  "2. high": "22.3700",
                  "3. low": "21.8050",
                  "4. close": "21.9800",
                  "5. volume": "2115289"
              },
              "2024-01-22": {
                  "1. open": "21.6220",
                  "2. high": "22.6550",
                  "3. low": "21.4750",
                  "4. close": "21.9700",
                  "5. volume": "2685408"
              },
              "2024-01-19": {
                  "1. open": "22.5100",
                  "2. high": "22.5100",
                  "3. low": "21.0150",
                  "4. close": "21.2400",
                  "5. volume": "4919625"
              },
              "2024-01-18": {
                  "1. open": "22.6200",
                  "2. high": "22.7300",
                  "3. low": "21.9450",
                  "4. close": "22.3000",
                  "5. volume": "1675613"
              },
              "2024-01-17": {
                  "1. open": "22.9000",
                  "2. high": "22.9900",
                  "3. low": "22.0600",
                  "4. close": "22.3800",
                  "5. volume": "2205782"
              },
              "2024-01-16": {
                  "1. open": "23.3200",
                  "2. high": "23.6350",
                  "3. low": "23.0750",
                  "4. close": "23.2800",
                  "5. volume": "2000185"
              },
              "2024-01-12": {
                  "1. open": "23.7300",
                  "2. high": "23.9300",
                  "3. low": "23.4407",
                  "4. close": "23.5900",
                  "5. volume": "2261138"
              },
              "2024-01-11": {
                  "1. open": "23.3200",
                  "2. high": "23.6500",
                  "3. low": "22.8000",
                  "4. close": "23.4700",
                  "5. volume": "1899402"
              },
              "2024-01-10": {
                  "1. open": "22.9700",
                  "2. high": "23.4750",
                  "3. low": "22.8900",
                  "4. close": "23.3200",
                  "5. volume": "2028093"
              },
              "2024-01-09": {
                  "1. open": "22.4600",
                  "2. high": "23.0450",
                  "3. low": "22.3900",
                  "4. close": "22.8600",
                  "5. volume": "1513432"
              },
              "2024-01-08": {
                  "1. open": "22.0700",
                  "2. high": "22.8900",
                  "3. low": "21.9400",
                  "4. close": "22.7000",
                  "5. volume": "2474017"
              },
              "2024-01-05": {
                  "1. open": "22.2600",
                  "2. high": "22.5400",
                  "3. low": "21.7600",
                  "4. close": "21.9100",
                  "5. volume": "2134040"
              },
              "2024-01-04": {
                  "1. open": "21.4800",
                  "2. high": "22.0100",
                  "3. low": "21.2150",
                  "4. close": "21.4700",
                  "5. volume": "2805511"
              },
              "2024-01-03": {
                  "1. open": "21.5900",
                  "2. high": "21.6900",
                  "3. low": "21.2400",
                  "4. close": "21.5100",
                  "5. volume": "3342901"
              },
              "2024-01-02": {
                  "1. open": "23.1140",
                  "2. high": "23.1500",
                  "3. low": "21.9300",
                  "4. close": "22.0800",
                  "5. volume": "2803726"
              },
              "2023-12-29": {
                  "1. open": "24.0000",
                  "2. high": "24.0900",
                  "3. low": "23.3950",
                  "4. close": "23.4900",
                  "5. volume": "1720455"
              },
              "2023-12-28": {
                  "1. open": "23.9600",
                  "2. high": "24.1500",
                  "3. low": "23.6800",
                  "4. close": "24.0000",
                  "5. volume": "1451144"
              },
              "2023-12-27": {
                  "1. open": "23.8800",
                  "2. high": "24.0200",
                  "3. low": "23.5100",
                  "4. close": "23.7300",
                  "5. volume": "1356032"
              },
              "2023-12-26": {
                  "1. open": "24.1700",
                  "2. high": "24.2500",
                  "3. low": "23.8050",
                  "4. close": "23.8400",
                  "5. volume": "1283677"
              },
              "2023-12-22": {
                  "1. open": "24.1400",
                  "2. high": "24.3400",
                  "3. low": "23.8250",
                  "4. close": "23.9600",
                  "5. volume": "1082866"
              },
              "2023-12-21": {
                  "1. open": "23.9900",
                  "2. high": "24.1000",
                  "3. low": "23.3800",
                  "4. close": "24.0800",
                  "5. volume": "1660450"
              },
              "2023-12-20": {
                  "1. open": "24.1900",
                  "2. high": "24.5900",
                  "3. low": "23.5500",
                  "4. close": "23.5600",
                  "5. volume": "2050133"
              },
              "2023-12-19": {
                  "1. open": "24.2400",
                  "2. high": "24.9750",
                  "3. low": "24.2400",
                  "4. close": "24.4800",
                  "5. volume": "2877788"
              },
              "2023-12-18": {
                  "1. open": "24.0000",
                  "2. high": "24.4700",
                  "3. low": "23.7512",
                  "4. close": "24.1900",
                  "5. volume": "2591707"
              },
              "2023-12-15": {
                  "1. open": "23.8000",
                  "2. high": "24.1550",
                  "3. low": "23.4300",
                  "4. close": "24.1500",
                  "5. volume": "5049629"
              },
              "2023-12-14": {
                  "1. open": "22.6900",
                  "2. high": "23.7400",
                  "3. low": "22.6400",
                  "4. close": "23.5400",
                  "5. volume": "5003208"
              },
              "2023-12-13": {
                  "1. open": "21.3000",
                  "2. high": "22.2350",
                  "3. low": "21.0600",
                  "4. close": "22.1900",
                  "5. volume": "4555924"
              },
              "2023-12-12": {
                  "1. open": "20.5300",
                  "2. high": "21.2500",
                  "3. low": "20.4301",
                  "4. close": "21.2400",
                  "5. volume": "2647727"
              },
              "2023-12-11": {
                  "1. open": "20.0500",
                  "2. high": "20.5550",
                  "3. low": "19.8200",
                  "4. close": "20.5300",
                  "5. volume": "1863818"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "GSBD",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "15.5900",
                  "2. high": "15.6100",
                  "3. low": "15.4400",
                  "4. close": "15.5800",
                  "5. volume": "368009"
              },
              "2024-05-02": {
                  "1. open": "15.6600",
                  "2. high": "15.6600",
                  "3. low": "15.3600",
                  "4. close": "15.4300",
                  "5. volume": "563612"
              },
              "2024-05-01": {
                  "1. open": "15.5100",
                  "2. high": "15.6900",
                  "3. low": "15.5100",
                  "4. close": "15.6400",
                  "5. volume": "636252"
              },
              "2024-04-30": {
                  "1. open": "15.7700",
                  "2. high": "15.7800",
                  "3. low": "15.5150",
                  "4. close": "15.5400",
                  "5. volume": "397644"
              },
              "2024-04-29": {
                  "1. open": "15.7100",
                  "2. high": "15.8000",
                  "3. low": "15.7100",
                  "4. close": "15.7700",
                  "5. volume": "436473"
              },
              "2024-04-26": {
                  "1. open": "15.5700",
                  "2. high": "15.7200",
                  "3. low": "15.5200",
                  "4. close": "15.6900",
                  "5. volume": "743053"
              },
              "2024-04-25": {
                  "1. open": "15.5000",
                  "2. high": "15.5400",
                  "3. low": "15.4200",
                  "4. close": "15.4800",
                  "5. volume": "366939"
              },
              "2024-04-24": {
                  "1. open": "15.5200",
                  "2. high": "15.6000",
                  "3. low": "15.4900",
                  "4. close": "15.5300",
                  "5. volume": "539323"
              },
              "2024-04-23": {
                  "1. open": "15.4800",
                  "2. high": "15.5300",
                  "3. low": "15.4300",
                  "4. close": "15.5100",
                  "5. volume": "503148"
              },
              "2024-04-22": {
                  "1. open": "15.3500",
                  "2. high": "15.5200",
                  "3. low": "15.3200",
                  "4. close": "15.5000",
                  "5. volume": "444927"
              },
              "2024-04-19": {
                  "1. open": "15.3100",
                  "2. high": "15.3600",
                  "3. low": "15.2800",
                  "4. close": "15.3300",
                  "5. volume": "352738"
              },
              "2024-04-18": {
                  "1. open": "15.1900",
                  "2. high": "15.2800",
                  "3. low": "15.1200",
                  "4. close": "15.2600",
                  "5. volume": "442810"
              },
              "2024-04-17": {
                  "1. open": "15.0000",
                  "2. high": "15.1750",
                  "3. low": "14.9950",
                  "4. close": "15.1300",
                  "5. volume": "564343"
              },
              "2024-04-16": {
                  "1. open": "14.9100",
                  "2. high": "15.0050",
                  "3. low": "14.8600",
                  "4. close": "14.9600",
                  "5. volume": "473378"
              },
              "2024-04-15": {
                  "1. open": "15.0000",
                  "2. high": "15.1100",
                  "3. low": "14.9015",
                  "4. close": "14.9400",
                  "5. volume": "767443"
              },
              "2024-04-12": {
                  "1. open": "15.0400",
                  "2. high": "15.1198",
                  "3. low": "14.8600",
                  "4. close": "14.8800",
                  "5. volume": "397429"
              },
              "2024-04-11": {
                  "1. open": "14.9500",
                  "2. high": "15.0800",
                  "3. low": "14.9150",
                  "4. close": "15.0700",
                  "5. volume": "406897"
              },
              "2024-04-10": {
                  "1. open": "14.9400",
                  "2. high": "15.0500",
                  "3. low": "14.9000",
                  "4. close": "14.9600",
                  "5. volume": "388444"
              },
              "2024-04-09": {
                  "1. open": "14.9800",
                  "2. high": "15.0650",
                  "3. low": "14.9200",
                  "4. close": "15.0400",
                  "5. volume": "682221"
              },
              "2024-04-08": {
                  "1. open": "14.8800",
                  "2. high": "14.9250",
                  "3. low": "14.8401",
                  "4. close": "14.9100",
                  "5. volume": "337676"
              },
              "2024-04-05": {
                  "1. open": "14.8900",
                  "2. high": "14.9100",
                  "3. low": "14.8200",
                  "4. close": "14.8400",
                  "5. volume": "786561"
              },
              "2024-04-04": {
                  "1. open": "14.9900",
                  "2. high": "15.0100",
                  "3. low": "14.8200",
                  "4. close": "14.8400",
                  "5. volume": "583184"
              },
              "2024-04-03": {
                  "1. open": "14.9600",
                  "2. high": "15.0335",
                  "3. low": "14.9171",
                  "4. close": "14.9600",
                  "5. volume": "405363"
              },
              "2024-04-02": {
                  "1. open": "14.9800",
                  "2. high": "15.0400",
                  "3. low": "14.9100",
                  "4. close": "14.9800",
                  "5. volume": "624365"
              },
              "2024-04-01": {
                  "1. open": "15.0100",
                  "2. high": "15.0100",
                  "3. low": "14.9100",
                  "4. close": "15.0000",
                  "5. volume": "658207"
              },
              "2024-03-28": {
                  "1. open": "15.0000",
                  "2. high": "15.1100",
                  "3. low": "14.9600",
                  "4. close": "14.9800",
                  "5. volume": "686551"
              },
              "2024-03-27": {
                  "1. open": "14.9800",
                  "2. high": "15.0500",
                  "3. low": "14.7900",
                  "4. close": "14.9600",
                  "5. volume": "991596"
              },
              "2024-03-26": {
                  "1. open": "15.3700",
                  "2. high": "15.4050",
                  "3. low": "15.3300",
                  "4. close": "15.3300",
                  "5. volume": "716432"
              },
              "2024-03-25": {
                  "1. open": "15.2500",
                  "2. high": "15.4200",
                  "3. low": "15.2500",
                  "4. close": "15.3400",
                  "5. volume": "773419"
              },
              "2024-03-22": {
                  "1. open": "15.2600",
                  "2. high": "15.2800",
                  "3. low": "15.1900",
                  "4. close": "15.2200",
                  "5. volume": "505194"
              },
              "2024-03-21": {
                  "1. open": "15.1000",
                  "2. high": "15.2400",
                  "3. low": "15.0900",
                  "4. close": "15.2100",
                  "5. volume": "511395"
              },
              "2024-03-20": {
                  "1. open": "15.0600",
                  "2. high": "15.0700",
                  "3. low": "14.9550",
                  "4. close": "15.0400",
                  "5. volume": "746727"
              },
              "2024-03-19": {
                  "1. open": "15.0300",
                  "2. high": "15.1621",
                  "3. low": "14.9500",
                  "4. close": "15.0100",
                  "5. volume": "1021293"
              },
              "2024-03-18": {
                  "1. open": "15.2200",
                  "2. high": "15.2500",
                  "3. low": "15.0400",
                  "4. close": "15.0700",
                  "5. volume": "1014644"
              },
              "2024-03-15": {
                  "1. open": "15.1000",
                  "2. high": "15.2400",
                  "3. low": "15.0100",
                  "4. close": "15.1500",
                  "5. volume": "1614339"
              },
              "2024-03-14": {
                  "1. open": "15.4500",
                  "2. high": "15.4500",
                  "3. low": "14.9600",
                  "4. close": "15.0000",
                  "5. volume": "2174718"
              },
              "2024-03-13": {
                  "1. open": "15.5400",
                  "2. high": "15.5950",
                  "3. low": "15.3100",
                  "4. close": "15.3300",
                  "5. volume": "2312207"
              },
              "2024-03-12": {
                  "1. open": "15.4000",
                  "2. high": "15.5300",
                  "3. low": "15.3300",
                  "4. close": "15.5200",
                  "5. volume": "606924"
              },
              "2024-03-11": {
                  "1. open": "15.5300",
                  "2. high": "15.5600",
                  "3. low": "15.3950",
                  "4. close": "15.4000",
                  "5. volume": "498116"
              },
              "2024-03-08": {
                  "1. open": "15.5300",
                  "2. high": "15.5700",
                  "3. low": "15.4600",
                  "4. close": "15.5100",
                  "5. volume": "404590"
              },
              "2024-03-07": {
                  "1. open": "15.4400",
                  "2. high": "15.4600",
                  "3. low": "15.3600",
                  "4. close": "15.4000",
                  "5. volume": "295193"
              },
              "2024-03-06": {
                  "1. open": "15.3500",
                  "2. high": "15.4400",
                  "3. low": "15.3300",
                  "4. close": "15.3600",
                  "5. volume": "472542"
              },
              "2024-03-05": {
                  "1. open": "15.3000",
                  "2. high": "15.3800",
                  "3. low": "15.2503",
                  "4. close": "15.3200",
                  "5. volume": "377629"
              },
              "2024-03-04": {
                  "1. open": "15.2400",
                  "2. high": "15.3400",
                  "3. low": "15.1700",
                  "4. close": "15.3100",
                  "5. volume": "505772"
              },
              "2024-03-01": {
                  "1. open": "15.0600",
                  "2. high": "15.2500",
                  "3. low": "15.0000",
                  "4. close": "15.2300",
                  "5. volume": "525927"
              },
              "2024-02-29": {
                  "1. open": "15.3700",
                  "2. high": "15.6520",
                  "3. low": "14.9300",
                  "4. close": "15.0200",
                  "5. volume": "1042671"
              },
              "2024-02-28": {
                  "1. open": "15.6000",
                  "2. high": "15.6000",
                  "3. low": "15.4500",
                  "4. close": "15.5200",
                  "5. volume": "454104"
              },
              "2024-02-27": {
                  "1. open": "15.4400",
                  "2. high": "15.5800",
                  "3. low": "15.3300",
                  "4. close": "15.5700",
                  "5. volume": "544827"
              },
              "2024-02-26": {
                  "1. open": "15.3400",
                  "2. high": "15.4600",
                  "3. low": "15.3300",
                  "4. close": "15.3700",
                  "5. volume": "407231"
              },
              "2024-02-23": {
                  "1. open": "15.3600",
                  "2. high": "15.5200",
                  "3. low": "15.3600",
                  "4. close": "15.4300",
                  "5. volume": "359121"
              },
              "2024-02-22": {
                  "1. open": "15.3200",
                  "2. high": "15.3950",
                  "3. low": "15.2800",
                  "4. close": "15.3900",
                  "5. volume": "283860"
              },
              "2024-02-21": {
                  "1. open": "15.3200",
                  "2. high": "15.3400",
                  "3. low": "15.2450",
                  "4. close": "15.2900",
                  "5. volume": "390550"
              },
              "2024-02-20": {
                  "1. open": "15.2100",
                  "2. high": "15.3700",
                  "3. low": "15.2100",
                  "4. close": "15.3200",
                  "5. volume": "283333"
              },
              "2024-02-16": {
                  "1. open": "15.3100",
                  "2. high": "15.4200",
                  "3. low": "15.2500",
                  "4. close": "15.3400",
                  "5. volume": "367978"
              },
              "2024-02-15": {
                  "1. open": "15.2300",
                  "2. high": "15.4100",
                  "3. low": "15.1900",
                  "4. close": "15.3800",
                  "5. volume": "604837"
              },
              "2024-02-14": {
                  "1. open": "15.0200",
                  "2. high": "15.1600",
                  "3. low": "15.0000",
                  "4. close": "15.1500",
                  "5. volume": "391057"
              },
              "2024-02-13": {
                  "1. open": "15.0200",
                  "2. high": "15.0950",
                  "3. low": "14.8994",
                  "4. close": "14.9500",
                  "5. volume": "376568"
              },
              "2024-02-12": {
                  "1. open": "14.9300",
                  "2. high": "15.1500",
                  "3. low": "14.9000",
                  "4. close": "15.1000",
                  "5. volume": "334122"
              },
              "2024-02-09": {
                  "1. open": "14.8600",
                  "2. high": "14.9300",
                  "3. low": "14.7900",
                  "4. close": "14.9300",
                  "5. volume": "653643"
              },
              "2024-02-08": {
                  "1. open": "14.8900",
                  "2. high": "14.9400",
                  "3. low": "14.8200",
                  "4. close": "14.8600",
                  "5. volume": "442266"
              },
              "2024-02-07": {
                  "1. open": "14.9100",
                  "2. high": "14.9700",
                  "3. low": "14.8200",
                  "4. close": "14.8900",
                  "5. volume": "379918"
              },
              "2024-02-06": {
                  "1. open": "14.9900",
                  "2. high": "14.9900",
                  "3. low": "14.8120",
                  "4. close": "14.8900",
                  "5. volume": "523949"
              },
              "2024-02-05": {
                  "1. open": "15.0700",
                  "2. high": "15.0700",
                  "3. low": "14.8800",
                  "4. close": "15.0000",
                  "5. volume": "487600"
              },
              "2024-02-02": {
                  "1. open": "15.0000",
                  "2. high": "15.2150",
                  "3. low": "14.9800",
                  "4. close": "15.1000",
                  "5. volume": "404542"
              },
              "2024-02-01": {
                  "1. open": "15.1500",
                  "2. high": "15.1600",
                  "3. low": "14.9000",
                  "4. close": "15.0600",
                  "5. volume": "518387"
              },
              "2024-01-31": {
                  "1. open": "15.3500",
                  "2. high": "15.3700",
                  "3. low": "15.1100",
                  "4. close": "15.1300",
                  "5. volume": "537683"
              },
              "2024-01-30": {
                  "1. open": "15.2900",
                  "2. high": "15.4300",
                  "3. low": "15.2800",
                  "4. close": "15.3600",
                  "5. volume": "726208"
              },
              "2024-01-29": {
                  "1. open": "15.3400",
                  "2. high": "15.3900",
                  "3. low": "15.2000",
                  "4. close": "15.3200",
                  "5. volume": "572541"
              },
              "2024-01-26": {
                  "1. open": "15.3000",
                  "2. high": "15.3900",
                  "3. low": "15.2850",
                  "4. close": "15.3400",
                  "5. volume": "480808"
              },
              "2024-01-25": {
                  "1. open": "15.2400",
                  "2. high": "15.3300",
                  "3. low": "15.1600",
                  "4. close": "15.2900",
                  "5. volume": "386023"
              },
              "2024-01-24": {
                  "1. open": "15.1800",
                  "2. high": "15.2800",
                  "3. low": "15.1400",
                  "4. close": "15.1800",
                  "5. volume": "579125"
              },
              "2024-01-23": {
                  "1. open": "15.0500",
                  "2. high": "15.1700",
                  "3. low": "15.0309",
                  "4. close": "15.1500",
                  "5. volume": "347484"
              },
              "2024-01-22": {
                  "1. open": "14.9600",
                  "2. high": "15.0600",
                  "3. low": "14.9210",
                  "4. close": "15.0600",
                  "5. volume": "397921"
              },
              "2024-01-19": {
                  "1. open": "14.9700",
                  "2. high": "14.9700",
                  "3. low": "14.8498",
                  "4. close": "14.9100",
                  "5. volume": "457754"
              },
              "2024-01-18": {
                  "1. open": "14.9000",
                  "2. high": "14.9450",
                  "3. low": "14.7700",
                  "4. close": "14.9400",
                  "5. volume": "441211"
              },
              "2024-01-17": {
                  "1. open": "14.8000",
                  "2. high": "14.8800",
                  "3. low": "14.7600",
                  "4. close": "14.8700",
                  "5. volume": "407530"
              },
              "2024-01-16": {
                  "1. open": "14.9000",
                  "2. high": "14.9000",
                  "3. low": "14.8050",
                  "4. close": "14.8500",
                  "5. volume": "410043"
              },
              "2024-01-12": {
                  "1. open": "14.9000",
                  "2. high": "14.9700",
                  "3. low": "14.8750",
                  "4. close": "14.9100",
                  "5. volume": "386449"
              },
              "2024-01-11": {
                  "1. open": "14.8300",
                  "2. high": "14.9000",
                  "3. low": "14.6200",
                  "4. close": "14.8800",
                  "5. volume": "393125"
              },
              "2024-01-10": {
                  "1. open": "14.7800",
                  "2. high": "14.8850",
                  "3. low": "14.7800",
                  "4. close": "14.8400",
                  "5. volume": "491957"
              },
              "2024-01-09": {
                  "1. open": "14.7700",
                  "2. high": "14.8400",
                  "3. low": "14.7300",
                  "4. close": "14.8200",
                  "5. volume": "593071"
              },
              "2024-01-08": {
                  "1. open": "14.8300",
                  "2. high": "14.8800",
                  "3. low": "14.7500",
                  "4. close": "14.8200",
                  "5. volume": "626262"
              },
              "2024-01-05": {
                  "1. open": "14.8100",
                  "2. high": "14.8400",
                  "3. low": "14.7325",
                  "4. close": "14.8100",
                  "5. volume": "717163"
              },
              "2024-01-04": {
                  "1. open": "14.5900",
                  "2. high": "14.9350",
                  "3. low": "14.5900",
                  "4. close": "14.8100",
                  "5. volume": "770470"
              },
              "2024-01-03": {
                  "1. open": "14.5850",
                  "2. high": "14.6600",
                  "3. low": "14.4910",
                  "4. close": "14.5600",
                  "5. volume": "647637"
              },
              "2024-01-02": {
                  "1. open": "14.5900",
                  "2. high": "14.7000",
                  "3. low": "14.5000",
                  "4. close": "14.6000",
                  "5. volume": "630370"
              },
              "2023-12-29": {
                  "1. open": "14.7500",
                  "2. high": "14.7800",
                  "3. low": "14.5600",
                  "4. close": "14.6500",
                  "5. volume": "1441508"
              },
              "2023-12-28": {
                  "1. open": "15.0200",
                  "2. high": "15.0800",
                  "3. low": "14.8100",
                  "4. close": "14.8200",
                  "5. volume": "1193505"
              },
              "2023-12-27": {
                  "1. open": "15.4900",
                  "2. high": "15.5000",
                  "3. low": "15.3900",
                  "4. close": "15.4400",
                  "5. volume": "943383"
              },
              "2023-12-26": {
                  "1. open": "15.3700",
                  "2. high": "15.4900",
                  "3. low": "15.3500",
                  "4. close": "15.3800",
                  "5. volume": "866308"
              },
              "2023-12-22": {
                  "1. open": "15.3300",
                  "2. high": "15.4500",
                  "3. low": "15.3100",
                  "4. close": "15.3400",
                  "5. volume": "614552"
              },
              "2023-12-21": {
                  "1. open": "15.3100",
                  "2. high": "15.3400",
                  "3. low": "15.2400",
                  "4. close": "15.3200",
                  "5. volume": "758594"
              },
              "2023-12-20": {
                  "1. open": "15.2500",
                  "2. high": "15.3795",
                  "3. low": "15.1700",
                  "4. close": "15.1900",
                  "5. volume": "786110"
              },
              "2023-12-19": {
                  "1. open": "15.2300",
                  "2. high": "15.3000",
                  "3. low": "15.1700",
                  "4. close": "15.2700",
                  "5. volume": "744940"
              },
              "2023-12-18": {
                  "1. open": "15.1500",
                  "2. high": "15.2600",
                  "3. low": "15.0850",
                  "4. close": "15.2200",
                  "5. volume": "624854"
              },
              "2023-12-15": {
                  "1. open": "15.1600",
                  "2. high": "15.2000",
                  "3. low": "14.9700",
                  "4. close": "15.0300",
                  "5. volume": "864678"
              },
              "2023-12-14": {
                  "1. open": "15.1000",
                  "2. high": "15.2374",
                  "3. low": "14.9000",
                  "4. close": "15.1400",
                  "5. volume": "954172"
              },
              "2023-12-13": {
                  "1. open": "14.9200",
                  "2. high": "15.1000",
                  "3. low": "14.8300",
                  "4. close": "15.0900",
                  "5. volume": "517274"
              },
              "2023-12-12": {
                  "1. open": "14.8800",
                  "2. high": "14.9500",
                  "3. low": "14.8100",
                  "4. close": "14.9000",
                  "5. volume": "369617"
              },
              "2023-12-11": {
                  "1. open": "14.9800",
                  "2. high": "14.9900",
                  "3. low": "14.7800",
                  "4. close": "14.8300",
                  "5. volume": "484832"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "HSY",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "196.0000",
                  "2. high": "199.0600",
                  "3. low": "191.6100",
                  "4. close": "197.9200",
                  "5. volume": "3396043"
              },
              "2024-05-02": {
                  "1. open": "195.6600",
                  "2. high": "196.4700",
                  "3. low": "194.1300",
                  "4. close": "195.8800",
                  "5. volume": "2347637"
              },
              "2024-05-01": {
                  "1. open": "192.3300",
                  "2. high": "195.0150",
                  "3. low": "191.1900",
                  "4. close": "193.7000",
                  "5. volume": "1794091"
              },
              "2024-04-30": {
                  "1. open": "193.9000",
                  "2. high": "197.7100",
                  "3. low": "193.3000",
                  "4. close": "193.9200",
                  "5. volume": "3133786"
              },
              "2024-04-29": {
                  "1. open": "187.2100",
                  "2. high": "192.6000",
                  "3. low": "186.8300",
                  "4. close": "192.4700",
                  "5. volume": "2961417"
              },
              "2024-04-26": {
                  "1. open": "186.4400",
                  "2. high": "188.0500",
                  "3. low": "185.9600",
                  "4. close": "186.1600",
                  "5. volume": "1186506"
              },
              "2024-04-25": {
                  "1. open": "188.8000",
                  "2. high": "189.2100",
                  "3. low": "185.8200",
                  "4. close": "187.1500",
                  "5. volume": "1316497"
              },
              "2024-04-24": {
                  "1. open": "185.8900",
                  "2. high": "188.8900",
                  "3. low": "184.9150",
                  "4. close": "188.1400",
                  "5. volume": "1629940"
              },
              "2024-04-23": {
                  "1. open": "185.8300",
                  "2. high": "188.2300",
                  "3. low": "185.8300",
                  "4. close": "187.0800",
                  "5. volume": "1288160"
              },
              "2024-04-22": {
                  "1. open": "185.9000",
                  "2. high": "186.4450",
                  "3. low": "184.7600",
                  "4. close": "186.3300",
                  "5. volume": "1631734"
              },
              "2024-04-19": {
                  "1. open": "185.0000",
                  "2. high": "185.6200",
                  "3. low": "182.8400",
                  "4. close": "185.0200",
                  "5. volume": "1740253"
              },
              "2024-04-18": {
                  "1. open": "183.3000",
                  "2. high": "185.2500",
                  "3. low": "182.0000",
                  "4. close": "184.8600",
                  "5. volume": "1415659"
              },
              "2024-04-17": {
                  "1. open": "184.2800",
                  "2. high": "184.4116",
                  "3. low": "180.4400",
                  "4. close": "182.4500",
                  "5. volume": "1736097"
              },
              "2024-04-16": {
                  "1. open": "183.1400",
                  "2. high": "184.2300",
                  "3. low": "181.6650",
                  "4. close": "183.3100",
                  "5. volume": "1621097"
              },
              "2024-04-15": {
                  "1. open": "185.1900",
                  "2. high": "186.0200",
                  "3. low": "182.1750",
                  "4. close": "182.5700",
                  "5. volume": "2005707"
              },
              "2024-04-12": {
                  "1. open": "189.0000",
                  "2. high": "189.2700",
                  "3. low": "184.5800",
                  "4. close": "185.8000",
                  "5. volume": "1803377"
              },
              "2024-04-11": {
                  "1. open": "192.3700",
                  "2. high": "192.9023",
                  "3. low": "188.5300",
                  "4. close": "189.5000",
                  "5. volume": "1301378"
              },
              "2024-04-10": {
                  "1. open": "192.5000",
                  "2. high": "193.5400",
                  "3. low": "190.6700",
                  "4. close": "192.0300",
                  "5. volume": "1373592"
              },
              "2024-04-09": {
                  "1. open": "194.5700",
                  "2. high": "194.8900",
                  "3. low": "191.7900",
                  "4. close": "194.5800",
                  "5. volume": "1350660"
              },
              "2024-04-08": {
                  "1. open": "193.9000",
                  "2. high": "196.1000",
                  "3. low": "193.9000",
                  "4. close": "194.1900",
                  "5. volume": "1182316"
              },
              "2024-04-05": {
                  "1. open": "195.5000",
                  "2. high": "196.8668",
                  "3. low": "192.2400",
                  "4. close": "193.7400",
                  "5. volume": "1406437"
              },
              "2024-04-04": {
                  "1. open": "194.5500",
                  "2. high": "196.7300",
                  "3. low": "193.1500",
                  "4. close": "195.9500",
                  "5. volume": "1465219"
              },
              "2024-04-03": {
                  "1. open": "200.0000",
                  "2. high": "200.2950",
                  "3. low": "194.7900",
                  "4. close": "194.8700",
                  "5. volume": "2094011"
              },
              "2024-04-02": {
                  "1. open": "199.6200",
                  "2. high": "201.2150",
                  "3. low": "197.7650",
                  "4. close": "200.5500",
                  "5. volume": "1991491"
              },
              "2024-04-01": {
                  "1. open": "196.5800",
                  "2. high": "198.9400",
                  "3. low": "194.6500",
                  "4. close": "198.2700",
                  "5. volume": "1564500"
              },
              "2024-03-28": {
                  "1. open": "195.0000",
                  "2. high": "196.7700",
                  "3. low": "194.2700",
                  "4. close": "194.5000",
                  "5. volume": "1585082"
              },
              "2024-03-27": {
                  "1. open": "191.9400",
                  "2. high": "194.5000",
                  "3. low": "191.9200",
                  "4. close": "193.7100",
                  "5. volume": "1446089"
              },
              "2024-03-26": {
                  "1. open": "191.4100",
                  "2. high": "192.8000",
                  "3. low": "189.1100",
                  "4. close": "190.9000",
                  "5. volume": "2396827"
              },
              "2024-03-25": {
                  "1. open": "197.9000",
                  "2. high": "198.3300",
                  "3. low": "191.6400",
                  "4. close": "192.2600",
                  "5. volume": "1766175"
              },
              "2024-03-22": {
                  "1. open": "199.6000",
                  "2. high": "199.6000",
                  "3. low": "197.7500",
                  "4. close": "197.9900",
                  "5. volume": "1127392"
              },
              "2024-03-21": {
                  "1. open": "197.4700",
                  "2. high": "200.6550",
                  "3. low": "196.9461",
                  "4. close": "199.3100",
                  "5. volume": "2331360"
              },
              "2024-03-20": {
                  "1. open": "202.2000",
                  "2. high": "204.1900",
                  "3. low": "196.6800",
                  "4. close": "198.0300",
                  "5. volume": "2347536"
              },
              "2024-03-19": {
                  "1. open": "197.9500",
                  "2. high": "202.4750",
                  "3. low": "197.9500",
                  "4. close": "202.2200",
                  "5. volume": "2514569"
              },
              "2024-03-18": {
                  "1. open": "193.2100",
                  "2. high": "198.7700",
                  "3. low": "191.7900",
                  "4. close": "197.0500",
                  "5. volume": "2687962"
              },
              "2024-03-15": {
                  "1. open": "194.4400",
                  "2. high": "198.6300",
                  "3. low": "193.5400",
                  "4. close": "193.5400",
                  "5. volume": "12184826"
              },
              "2024-03-14": {
                  "1. open": "196.1300",
                  "2. high": "196.5300",
                  "3. low": "193.2200",
                  "4. close": "195.0600",
                  "5. volume": "2299615"
              },
              "2024-03-13": {
                  "1. open": "197.3700",
                  "2. high": "199.2700",
                  "3. low": "195.8200",
                  "4. close": "195.8900",
                  "5. volume": "2254288"
              },
              "2024-03-12": {
                  "1. open": "198.7500",
                  "2. high": "199.5700",
                  "3. low": "195.4000",
                  "4. close": "196.4700",
                  "5. volume": "1957489"
              },
              "2024-03-11": {
                  "1. open": "195.7000",
                  "2. high": "199.3000",
                  "3. low": "195.7000",
                  "4. close": "199.0200",
                  "5. volume": "2116593"
              },
              "2024-03-08": {
                  "1. open": "192.3300",
                  "2. high": "195.4900",
                  "3. low": "192.1400",
                  "4. close": "194.5600",
                  "5. volume": "1968926"
              },
              "2024-03-07": {
                  "1. open": "193.0800",
                  "2. high": "193.9900",
                  "3. low": "191.1500",
                  "4. close": "192.5200",
                  "5. volume": "2179226"
              },
              "2024-03-06": {
                  "1. open": "194.8200",
                  "2. high": "196.8400",
                  "3. low": "191.0500",
                  "4. close": "192.8300",
                  "5. volume": "2928413"
              },
              "2024-03-05": {
                  "1. open": "184.2500",
                  "2. high": "188.0000",
                  "3. low": "184.2500",
                  "4. close": "187.5600",
                  "5. volume": "1986317"
              },
              "2024-03-04": {
                  "1. open": "186.7700",
                  "2. high": "186.7700",
                  "3. low": "181.1600",
                  "4. close": "184.0000",
                  "5. volume": "2729569"
              },
              "2024-03-01": {
                  "1. open": "187.8600",
                  "2. high": "188.5452",
                  "3. low": "185.8400",
                  "4. close": "188.0500",
                  "5. volume": "1284073"
              },
              "2024-02-29": {
                  "1. open": "186.6800",
                  "2. high": "188.5300",
                  "3. low": "185.5000",
                  "4. close": "187.9200",
                  "5. volume": "2160429"
              },
              "2024-02-28": {
                  "1. open": "187.3200",
                  "2. high": "187.8700",
                  "3. low": "184.5000",
                  "4. close": "186.2100",
                  "5. volume": "1329039"
              },
              "2024-02-27": {
                  "1. open": "188.1300",
                  "2. high": "189.3900",
                  "3. low": "187.0700",
                  "4. close": "187.1700",
                  "5. volume": "1904969"
              },
              "2024-02-26": {
                  "1. open": "193.9500",
                  "2. high": "194.6800",
                  "3. low": "188.6000",
                  "4. close": "188.6100",
                  "5. volume": "2032906"
              },
              "2024-02-23": {
                  "1. open": "193.0600",
                  "2. high": "195.3200",
                  "3. low": "192.4400",
                  "4. close": "193.8300",
                  "5. volume": "1678974"
              },
              "2024-02-22": {
                  "1. open": "191.5600",
                  "2. high": "193.7900",
                  "3. low": "187.9900",
                  "4. close": "193.5400",
                  "5. volume": "1570551"
              },
              "2024-02-21": {
                  "1. open": "194.8000",
                  "2. high": "195.3300",
                  "3. low": "191.8000",
                  "4. close": "192.4900",
                  "5. volume": "1244072"
              },
              "2024-02-20": {
                  "1. open": "192.3600",
                  "2. high": "195.1100",
                  "3. low": "192.2393",
                  "4. close": "193.5700",
                  "5. volume": "1811582"
              },
              "2024-02-16": {
                  "1. open": "191.2500",
                  "2. high": "193.2600",
                  "3. low": "189.5300",
                  "4. close": "191.1600",
                  "5. volume": "1595258"
              },
              "2024-02-15": {
                  "1. open": "192.1700",
                  "2. high": "194.8500",
                  "3. low": "192.1700",
                  "4. close": "192.5800",
                  "5. volume": "1270879"
              },
              "2024-02-14": {
                  "1. open": "193.2600",
                  "2. high": "195.0100",
                  "3. low": "190.4100",
                  "4. close": "191.2500",
                  "5. volume": "1610564"
              },
              "2024-02-13": {
                  "1. open": "193.5200",
                  "2. high": "197.4300",
                  "3. low": "193.5200",
                  "4. close": "194.8400",
                  "5. volume": "1977538"
              },
              "2024-02-12": {
                  "1. open": "190.0000",
                  "2. high": "194.6200",
                  "3. low": "189.6000",
                  "4. close": "193.7200",
                  "5. volume": "3132270"
              },
              "2024-02-09": {
                  "1. open": "201.2500",
                  "2. high": "201.7950",
                  "3. low": "194.6700",
                  "4. close": "195.4500",
                  "5. volume": "3118468"
              },
              "2024-02-08": {
                  "1. open": "192.2000",
                  "2. high": "209.6800",
                  "3. low": "189.5703",
                  "4. close": "202.3100",
                  "5. volume": "4712438"
              },
              "2024-02-07": {
                  "1. open": "195.4000",
                  "2. high": "196.4000",
                  "3. low": "193.7700",
                  "4. close": "194.2600",
                  "5. volume": "1959314"
              },
              "2024-02-06": {
                  "1. open": "196.4100",
                  "2. high": "196.5950",
                  "3. low": "193.6100",
                  "4. close": "194.7800",
                  "5. volume": "1602247"
              },
              "2024-02-05": {
                  "1. open": "196.7900",
                  "2. high": "199.5599",
                  "3. low": "196.2700",
                  "4. close": "196.3900",
                  "5. volume": "1911203"
              },
              "2024-02-02": {
                  "1. open": "198.5400",
                  "2. high": "199.2100",
                  "3. low": "196.7900",
                  "4. close": "197.6600",
                  "5. volume": "1761525"
              },
              "2024-02-01": {
                  "1. open": "192.7800",
                  "2. high": "198.5300",
                  "3. low": "190.8900",
                  "4. close": "198.4300",
                  "5. volume": "1776505"
              },
              "2024-01-31": {
                  "1. open": "197.0000",
                  "2. high": "197.2100",
                  "3. low": "193.3800",
                  "4. close": "193.5400",
                  "5. volume": "2147811"
              },
              "2024-01-30": {
                  "1. open": "192.9900",
                  "2. high": "197.5900",
                  "3. low": "192.6140",
                  "4. close": "197.3800",
                  "5. volume": "2355570"
              },
              "2024-01-29": {
                  "1. open": "193.2900",
                  "2. high": "194.6300",
                  "3. low": "191.1300",
                  "4. close": "192.7900",
                  "5. volume": "1678995"
              },
              "2024-01-26": {
                  "1. open": "189.6100",
                  "2. high": "191.4200",
                  "3. low": "189.6100",
                  "4. close": "190.2100",
                  "5. volume": "1111072"
              },
              "2024-01-25": {
                  "1. open": "188.8400",
                  "2. high": "190.4050",
                  "3. low": "187.3300",
                  "4. close": "189.3600",
                  "5. volume": "1401299"
              },
              "2024-01-24": {
                  "1. open": "191.4300",
                  "2. high": "191.4300",
                  "3. low": "189.2500",
                  "4. close": "189.3100",
                  "5. volume": "1383251"
              },
              "2024-01-23": {
                  "1. open": "188.9700",
                  "2. high": "192.5700",
                  "3. low": "188.8000",
                  "4. close": "192.0300",
                  "5. volume": "1315004"
              },
              "2024-01-22": {
                  "1. open": "190.2700",
                  "2. high": "190.2700",
                  "3. low": "187.7500",
                  "4. close": "188.2600",
                  "5. volume": "1143076"
              },
              "2024-01-19": {
                  "1. open": "191.5800",
                  "2. high": "191.8500",
                  "3. low": "188.5950",
                  "4. close": "190.4600",
                  "5. volume": "1286196"
              },
              "2024-01-18": {
                  "1. open": "191.3800",
                  "2. high": "191.6200",
                  "3. low": "188.2400",
                  "4. close": "191.4700",
                  "5. volume": "1814973"
              },
              "2024-01-17": {
                  "1. open": "191.1600",
                  "2. high": "193.4800",
                  "3. low": "190.7600",
                  "4. close": "191.5400",
                  "5. volume": "1428112"
              },
              "2024-01-16": {
                  "1. open": "191.1600",
                  "2. high": "193.6700",
                  "3. low": "190.4400",
                  "4. close": "191.5300",
                  "5. volume": "1617474"
              },
              "2024-01-12": {
                  "1. open": "193.1300",
                  "2. high": "194.7100",
                  "3. low": "190.2000",
                  "4. close": "190.6400",
                  "5. volume": "1629897"
              },
              "2024-01-11": {
                  "1. open": "189.1200",
                  "2. high": "190.6600",
                  "3. low": "187.5003",
                  "4. close": "190.4100",
                  "5. volume": "1284920"
              },
              "2024-01-10": {
                  "1. open": "193.2500",
                  "2. high": "194.5799",
                  "3. low": "189.5500",
                  "4. close": "189.6400",
                  "5. volume": "1611626"
              },
              "2024-01-09": {
                  "1. open": "191.0200",
                  "2. high": "193.1500",
                  "3. low": "189.7500",
                  "4. close": "193.0900",
                  "5. volume": "1434257"
              },
              "2024-01-08": {
                  "1. open": "187.7000",
                  "2. high": "191.5250",
                  "3. low": "187.7000",
                  "4. close": "191.4500",
                  "5. volume": "1650867"
              },
              "2024-01-05": {
                  "1. open": "190.0200",
                  "2. high": "190.7900",
                  "3. low": "186.9800",
                  "4. close": "187.6400",
                  "5. volume": "1237278"
              },
              "2024-01-04": {
                  "1. open": "191.6500",
                  "2. high": "195.6500",
                  "3. low": "190.3300",
                  "4. close": "190.5000",
                  "5. volume": "1925149"
              },
              "2024-01-03": {
                  "1. open": "192.5000",
                  "2. high": "194.3500",
                  "3. low": "191.3700",
                  "4. close": "191.8400",
                  "5. volume": "2370532"
              },
              "2024-01-02": {
                  "1. open": "185.5300",
                  "2. high": "192.2250",
                  "3. low": "185.4500",
                  "4. close": "192.0300",
                  "5. volume": "2359050"
              },
              "2023-12-29": {
                  "1. open": "184.0700",
                  "2. high": "186.7700",
                  "3. low": "183.7850",
                  "4. close": "186.4400",
                  "5. volume": "1591760"
              },
              "2023-12-28": {
                  "1. open": "183.1000",
                  "2. high": "184.7799",
                  "3. low": "182.9100",
                  "4. close": "184.1100",
                  "5. volume": "1122188"
              },
              "2023-12-27": {
                  "1. open": "183.1700",
                  "2. high": "184.0300",
                  "3. low": "182.9000",
                  "4. close": "183.9200",
                  "5. volume": "857037"
              },
              "2023-12-26": {
                  "1. open": "182.3000",
                  "2. high": "183.9800",
                  "3. low": "181.5632",
                  "4. close": "183.4000",
                  "5. volume": "703119"
              },
              "2023-12-22": {
                  "1. open": "181.7500",
                  "2. high": "183.7900",
                  "3. low": "181.5100",
                  "4. close": "182.5200",
                  "5. volume": "1214990"
              },
              "2023-12-21": {
                  "1. open": "179.7500",
                  "2. high": "181.0500",
                  "3. low": "178.8200",
                  "4. close": "181.0000",
                  "5. volume": "1326615"
              },
              "2023-12-20": {
                  "1. open": "181.5000",
                  "2. high": "182.7593",
                  "3. low": "179.3600",
                  "4. close": "179.5200",
                  "5. volume": "1634620"
              },
              "2023-12-19": {
                  "1. open": "182.4900",
                  "2. high": "183.5100",
                  "3. low": "181.7200",
                  "4. close": "182.5500",
                  "5. volume": "1639689"
              },
              "2023-12-18": {
                  "1. open": "182.3900",
                  "2. high": "184.1400",
                  "3. low": "181.2700",
                  "4. close": "182.2600",
                  "5. volume": "1800763"
              },
              "2023-12-15": {
                  "1. open": "183.9300",
                  "2. high": "185.1800",
                  "3. low": "181.4700",
                  "4. close": "181.7100",
                  "5. volume": "3532420"
              },
              "2023-12-14": {
                  "1. open": "189.2000",
                  "2. high": "189.7000",
                  "3. low": "184.6050",
                  "4. close": "186.2100",
                  "5. volume": "1968489"
              },
              "2023-12-13": {
                  "1. open": "184.9200",
                  "2. high": "188.9600",
                  "3. low": "184.3700",
                  "4. close": "188.7900",
                  "5. volume": "1281000"
              },
              "2023-12-12": {
                  "1. open": "186.7400",
                  "2. high": "186.7500",
                  "3. low": "184.2070",
                  "4. close": "184.6900",
                  "5. volume": "1354168"
              },
              "2023-12-11": {
                  "1. open": "186.2000",
                  "2. high": "187.0000",
                  "3. low": "185.0700",
                  "4. close": "186.2800",
                  "5. volume": "1198800"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "LNN",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "120.7600",
                  "2. high": "121.7500",
                  "3. low": "117.9900",
                  "4. close": "118.2900",
                  "5. volume": "105250"
              },
              "2024-05-02": {
                  "1. open": "118.0800",
                  "2. high": "120.0600",
                  "3. low": "116.8710",
                  "4. close": "119.8800",
                  "5. volume": "92253"
              },
              "2024-05-01": {
                  "1. open": "116.1500",
                  "2. high": "118.5700",
                  "3. low": "116.1500",
                  "4. close": "117.1700",
                  "5. volume": "99877"
              },
              "2024-04-30": {
                  "1. open": "116.2100",
                  "2. high": "117.9100",
                  "3. low": "115.9400",
                  "4. close": "116.1500",
                  "5. volume": "86169"
              },
              "2024-04-29": {
                  "1. open": "117.0000",
                  "2. high": "118.1950",
                  "3. low": "116.1500",
                  "4. close": "117.3300",
                  "5. volume": "84521"
              },
              "2024-04-26": {
                  "1. open": "117.2800",
                  "2. high": "117.6500",
                  "3. low": "115.8900",
                  "4. close": "116.2400",
                  "5. volume": "70363"
              },
              "2024-04-25": {
                  "1. open": "116.1900",
                  "2. high": "117.7350",
                  "3. low": "115.1800",
                  "4. close": "117.4000",
                  "5. volume": "71360"
              },
              "2024-04-24": {
                  "1. open": "118.1100",
                  "2. high": "119.2700",
                  "3. low": "116.1600",
                  "4. close": "116.3700",
                  "5. volume": "87032"
              },
              "2024-04-23": {
                  "1. open": "116.0900",
                  "2. high": "119.0300",
                  "3. low": "116.0900",
                  "4. close": "118.9600",
                  "5. volume": "91137"
              },
              "2024-04-22": {
                  "1. open": "118.0200",
                  "2. high": "118.0200",
                  "3. low": "116.0850",
                  "4. close": "116.8200",
                  "5. volume": "107395"
              },
              "2024-04-19": {
                  "1. open": "116.1700",
                  "2. high": "117.5800",
                  "3. low": "115.5300",
                  "4. close": "117.3700",
                  "5. volume": "124528"
              },
              "2024-04-18": {
                  "1. open": "113.0300",
                  "2. high": "116.9700",
                  "3. low": "113.0300",
                  "4. close": "116.5100",
                  "5. volume": "125561"
              },
              "2024-04-17": {
                  "1. open": "114.9950",
                  "2. high": "115.3600",
                  "3. low": "112.7900",
                  "4. close": "112.8100",
                  "5. volume": "111530"
              },
              "2024-04-16": {
                  "1. open": "114.1300",
                  "2. high": "116.0350",
                  "3. low": "113.2200",
                  "4. close": "114.1700",
                  "5. volume": "81883"
              },
              "2024-04-15": {
                  "1. open": "115.5200",
                  "2. high": "115.8800",
                  "3. low": "114.0100",
                  "4. close": "114.7400",
                  "5. volume": "77877"
              },
              "2024-04-12": {
                  "1. open": "114.5700",
                  "2. high": "115.8200",
                  "3. low": "114.0200",
                  "4. close": "114.5300",
                  "5. volume": "78312"
              },
              "2024-04-11": {
                  "1. open": "115.6700",
                  "2. high": "115.9210",
                  "3. low": "114.7300",
                  "4. close": "115.2200",
                  "5. volume": "63789"
              },
              "2024-04-10": {
                  "1. open": "116.0100",
                  "2. high": "116.1600",
                  "3. low": "114.2200",
                  "4. close": "115.1000",
                  "5. volume": "106600"
              },
              "2024-04-09": {
                  "1. open": "120.0000",
                  "2. high": "120.0000",
                  "3. low": "117.8700",
                  "4. close": "118.6100",
                  "5. volume": "99562"
              },
              "2024-04-08": {
                  "1. open": "117.0700",
                  "2. high": "120.0300",
                  "3. low": "115.7800",
                  "4. close": "119.8000",
                  "5. volume": "121334"
              },
              "2024-04-05": {
                  "1. open": "116.3100",
                  "2. high": "118.8800",
                  "3. low": "115.3150",
                  "4. close": "116.2500",
                  "5. volume": "130069"
              },
              "2024-04-04": {
                  "1. open": "112.5500",
                  "2. high": "118.8850",
                  "3. low": "110.0900",
                  "4. close": "114.4900",
                  "5. volume": "250810"
              },
              "2024-04-03": {
                  "1. open": "114.5000",
                  "2. high": "116.7600",
                  "3. low": "114.3300",
                  "4. close": "115.3500",
                  "5. volume": "112007"
              },
              "2024-04-02": {
                  "1. open": "115.2700",
                  "2. high": "115.2700",
                  "3. low": "113.0100",
                  "4. close": "114.7900",
                  "5. volume": "102638"
              },
              "2024-04-01": {
                  "1. open": "117.7000",
                  "2. high": "117.7000",
                  "3. low": "114.2800",
                  "4. close": "115.6300",
                  "5. volume": "100649"
              },
              "2024-03-28": {
                  "1. open": "118.5800",
                  "2. high": "120.0350",
                  "3. low": "117.5200",
                  "4. close": "117.6600",
                  "5. volume": "85959"
              },
              "2024-03-27": {
                  "1. open": "118.0200",
                  "2. high": "118.5900",
                  "3. low": "116.5450",
                  "4. close": "118.1100",
                  "5. volume": "72768"
              },
              "2024-03-26": {
                  "1. open": "116.1200",
                  "2. high": "117.3700",
                  "3. low": "115.4750",
                  "4. close": "117.3600",
                  "5. volume": "86209"
              },
              "2024-03-25": {
                  "1. open": "113.5800",
                  "2. high": "115.5600",
                  "3. low": "112.8513",
                  "4. close": "115.3700",
                  "5. volume": "65221"
              },
              "2024-03-22": {
                  "1. open": "114.0500",
                  "2. high": "114.0500",
                  "3. low": "112.5900",
                  "4. close": "113.2800",
                  "5. volume": "38186"
              },
              "2024-03-21": {
                  "1. open": "114.4600",
                  "2. high": "115.0900",
                  "3. low": "113.0800",
                  "4. close": "113.7000",
                  "5. volume": "85038"
              },
              "2024-03-20": {
                  "1. open": "112.4900",
                  "2. high": "114.0800",
                  "3. low": "112.0100",
                  "4. close": "113.4000",
                  "5. volume": "58052"
              },
              "2024-03-19": {
                  "1. open": "111.5200",
                  "2. high": "113.4750",
                  "3. low": "111.5200",
                  "4. close": "113.2800",
                  "5. volume": "51552"
              },
              "2024-03-18": {
                  "1. open": "114.5800",
                  "2. high": "114.6700",
                  "3. low": "111.8050",
                  "4. close": "112.2100",
                  "5. volume": "102194"
              },
              "2024-03-15": {
                  "1. open": "113.0100",
                  "2. high": "115.4100",
                  "3. low": "113.0100",
                  "4. close": "115.0500",
                  "5. volume": "346948"
              },
              "2024-03-14": {
                  "1. open": "116.1900",
                  "2. high": "116.2700",
                  "3. low": "112.8300",
                  "4. close": "113.3100",
                  "5. volume": "90520"
              },
              "2024-03-13": {
                  "1. open": "114.4300",
                  "2. high": "117.2200",
                  "3. low": "114.4300",
                  "4. close": "116.0600",
                  "5. volume": "65530"
              },
              "2024-03-12": {
                  "1. open": "115.5300",
                  "2. high": "115.7800",
                  "3. low": "113.6100",
                  "4. close": "113.9900",
                  "5. volume": "60451"
              },
              "2024-03-11": {
                  "1. open": "115.2800",
                  "2. high": "116.7800",
                  "3. low": "114.9300",
                  "4. close": "116.0600",
                  "5. volume": "87998"
              },
              "2024-03-08": {
                  "1. open": "121.5200",
                  "2. high": "122.1450",
                  "3. low": "114.8500",
                  "4. close": "114.9700",
                  "5. volume": "103085"
              },
              "2024-03-07": {
                  "1. open": "120.6300",
                  "2. high": "123.2550",
                  "3. low": "120.6300",
                  "4. close": "122.7300",
                  "5. volume": "56570"
              },
              "2024-03-06": {
                  "1. open": "121.3900",
                  "2. high": "121.7700",
                  "3. low": "119.7600",
                  "4. close": "119.9200",
                  "5. volume": "54564"
              },
              "2024-03-05": {
                  "1. open": "119.8200",
                  "2. high": "121.8950",
                  "3. low": "119.8200",
                  "4. close": "121.1000",
                  "5. volume": "62250"
              },
              "2024-03-04": {
                  "1. open": "121.2100",
                  "2. high": "121.6400",
                  "3. low": "119.6300",
                  "4. close": "120.4900",
                  "5. volume": "56294"
              },
              "2024-03-01": {
                  "1. open": "119.3000",
                  "2. high": "122.1400",
                  "3. low": "117.0000",
                  "4. close": "120.5000",
                  "5. volume": "119101"
              },
              "2024-02-29": {
                  "1. open": "122.8200",
                  "2. high": "122.8200",
                  "3. low": "119.3000",
                  "4. close": "119.3100",
                  "5. volume": "140942"
              },
              "2024-02-28": {
                  "1. open": "118.3700",
                  "2. high": "121.5200",
                  "3. low": "118.3700",
                  "4. close": "121.4000",
                  "5. volume": "57002"
              },
              "2024-02-27": {
                  "1. open": "121.3500",
                  "2. high": "121.4650",
                  "3. low": "118.6100",
                  "4. close": "119.6200",
                  "5. volume": "82341"
              },
              "2024-02-26": {
                  "1. open": "120.9300",
                  "2. high": "121.5200",
                  "3. low": "119.7650",
                  "4. close": "120.5900",
                  "5. volume": "54452"
              },
              "2024-02-23": {
                  "1. open": "120.0700",
                  "2. high": "122.2700",
                  "3. low": "119.7925",
                  "4. close": "121.8200",
                  "5. volume": "68036"
              },
              "2024-02-22": {
                  "1. open": "122.5700",
                  "2. high": "122.8400",
                  "3. low": "118.9050",
                  "4. close": "119.3000",
                  "5. volume": "89159"
              },
              "2024-02-21": {
                  "1. open": "122.8100",
                  "2. high": "123.4000",
                  "3. low": "121.0000",
                  "4. close": "122.9800",
                  "5. volume": "105741"
              },
              "2024-02-20": {
                  "1. open": "121.7800",
                  "2. high": "123.0850",
                  "3. low": "120.9900",
                  "4. close": "122.7900",
                  "5. volume": "117639"
              },
              "2024-02-16": {
                  "1. open": "125.0000",
                  "2. high": "126.7100",
                  "3. low": "123.3300",
                  "4. close": "123.4400",
                  "5. volume": "54730"
              },
              "2024-02-15": {
                  "1. open": "125.7300",
                  "2. high": "126.1200",
                  "3. low": "124.3500",
                  "4. close": "125.7300",
                  "5. volume": "96366"
              },
              "2024-02-14": {
                  "1. open": "126.8100",
                  "2. high": "126.8100",
                  "3. low": "124.2800",
                  "4. close": "126.1500",
                  "5. volume": "46979"
              },
              "2024-02-13": {
                  "1. open": "128.3500",
                  "2. high": "128.3500",
                  "3. low": "123.3500",
                  "4. close": "124.9000",
                  "5. volume": "63333"
              },
              "2024-02-12": {
                  "1. open": "130.2600",
                  "2. high": "132.7750",
                  "3. low": "130.2600",
                  "4. close": "131.8600",
                  "5. volume": "51027"
              },
              "2024-02-09": {
                  "1. open": "128.6000",
                  "2. high": "131.3500",
                  "3. low": "128.2700",
                  "4. close": "130.5100",
                  "5. volume": "49197"
              },
              "2024-02-08": {
                  "1. open": "128.3800",
                  "2. high": "129.7100",
                  "3. low": "128.1400",
                  "4. close": "128.6800",
                  "5. volume": "109063"
              },
              "2024-02-07": {
                  "1. open": "128.5400",
                  "2. high": "130.3250",
                  "3. low": "126.9000",
                  "4. close": "128.8100",
                  "5. volume": "50612"
              },
              "2024-02-06": {
                  "1. open": "128.7900",
                  "2. high": "129.9400",
                  "3. low": "128.3100",
                  "4. close": "128.7700",
                  "5. volume": "35759"
              },
              "2024-02-05": {
                  "1. open": "129.9900",
                  "2. high": "131.0500",
                  "3. low": "128.0600",
                  "4. close": "128.0900",
                  "5. volume": "45378"
              },
              "2024-02-02": {
                  "1. open": "130.4100",
                  "2. high": "132.0300",
                  "3. low": "129.6800",
                  "4. close": "131.7000",
                  "5. volume": "48340"
              },
              "2024-02-01": {
                  "1. open": "131.3300",
                  "2. high": "132.3450",
                  "3. low": "129.8500",
                  "4. close": "132.1600",
                  "5. volume": "47518"
              },
              "2024-01-31": {
                  "1. open": "134.4400",
                  "2. high": "134.4400",
                  "3. low": "130.1000",
                  "4. close": "130.1100",
                  "5. volume": "61383"
              },
              "2024-01-30": {
                  "1. open": "132.3900",
                  "2. high": "135.0500",
                  "3. low": "132.2800",
                  "4. close": "134.0800",
                  "5. volume": "60613"
              },
              "2024-01-29": {
                  "1. open": "133.5700",
                  "2. high": "134.1850",
                  "3. low": "131.7700",
                  "4. close": "133.5400",
                  "5. volume": "48882"
              },
              "2024-01-26": {
                  "1. open": "133.4400",
                  "2. high": "133.7000",
                  "3. low": "131.9100",
                  "4. close": "133.3500",
                  "5. volume": "78939"
              },
              "2024-01-25": {
                  "1. open": "131.3700",
                  "2. high": "133.2600",
                  "3. low": "130.1000",
                  "4. close": "132.7500",
                  "5. volume": "102461"
              },
              "2024-01-24": {
                  "1. open": "133.5800",
                  "2. high": "133.5800",
                  "3. low": "129.1300",
                  "4. close": "129.5000",
                  "5. volume": "69522"
              },
              "2024-01-23": {
                  "1. open": "132.3400",
                  "2. high": "133.1600",
                  "3. low": "131.0500",
                  "4. close": "132.4900",
                  "5. volume": "50723"
              },
              "2024-01-22": {
                  "1. open": "130.0400",
                  "2. high": "132.3100",
                  "3. low": "130.0400",
                  "4. close": "131.3300",
                  "5. volume": "51821"
              },
              "2024-01-19": {
                  "1. open": "130.2400",
                  "2. high": "130.2400",
                  "3. low": "127.8500",
                  "4. close": "129.6200",
                  "5. volume": "122278"
              },
              "2024-01-18": {
                  "1. open": "128.1600",
                  "2. high": "130.5600",
                  "3. low": "128.0750",
                  "4. close": "129.6200",
                  "5. volume": "85493"
              },
              "2024-01-17": {
                  "1. open": "127.7700",
                  "2. high": "128.9500",
                  "3. low": "126.8300",
                  "4. close": "126.8300",
                  "5. volume": "71733"
              },
              "2024-01-16": {
                  "1. open": "128.4600",
                  "2. high": "130.3750",
                  "3. low": "128.1800",
                  "4. close": "129.6700",
                  "5. volume": "79866"
              },
              "2024-01-12": {
                  "1. open": "132.9900",
                  "2. high": "133.8900",
                  "3. low": "128.8500",
                  "4. close": "129.2800",
                  "5. volume": "62390"
              },
              "2024-01-11": {
                  "1. open": "131.4600",
                  "2. high": "131.9000",
                  "3. low": "128.6650",
                  "4. close": "130.9400",
                  "5. volume": "101846"
              },
              "2024-01-10": {
                  "1. open": "132.5900",
                  "2. high": "132.7699",
                  "3. low": "130.7000",
                  "4. close": "131.8600",
                  "5. volume": "82426"
              },
              "2024-01-09": {
                  "1. open": "131.6000",
                  "2. high": "132.8150",
                  "3. low": "130.6100",
                  "4. close": "132.1800",
                  "5. volume": "103533"
              },
              "2024-01-08": {
                  "1. open": "133.7000",
                  "2. high": "133.7000",
                  "3. low": "131.7650",
                  "4. close": "132.8800",
                  "5. volume": "74345"
              },
              "2024-01-05": {
                  "1. open": "128.1800",
                  "2. high": "133.9600",
                  "3. low": "127.3450",
                  "4. close": "133.0000",
                  "5. volume": "141879"
              },
              "2024-01-04": {
                  "1. open": "121.8400",
                  "2. high": "133.4300",
                  "3. low": "121.8400",
                  "4. close": "131.2400",
                  "5. volume": "157793"
              },
              "2024-01-03": {
                  "1. open": "126.4700",
                  "2. high": "126.4700",
                  "3. low": "122.5300",
                  "4. close": "122.7900",
                  "5. volume": "146488"
              },
              "2024-01-02": {
                  "1. open": "128.6700",
                  "2. high": "129.6800",
                  "3. low": "127.2000",
                  "4. close": "127.6900",
                  "5. volume": "84167"
              },
              "2023-12-29": {
                  "1. open": "130.6000",
                  "2. high": "130.6600",
                  "3. low": "129.1600",
                  "4. close": "129.1600",
                  "5. volume": "45366"
              },
              "2023-12-28": {
                  "1. open": "131.4600",
                  "2. high": "131.8800",
                  "3. low": "130.2200",
                  "4. close": "130.6600",
                  "5. volume": "59292"
              },
              "2023-12-27": {
                  "1. open": "133.8600",
                  "2. high": "133.8600",
                  "3. low": "131.1500",
                  "4. close": "131.1600",
                  "5. volume": "82284"
              },
              "2023-12-26": {
                  "1. open": "134.0100",
                  "2. high": "134.4200",
                  "3. low": "133.0500",
                  "4. close": "133.3400",
                  "5. volume": "61547"
              },
              "2023-12-22": {
                  "1. open": "131.9000",
                  "2. high": "134.0600",
                  "3. low": "131.5000",
                  "4. close": "133.6500",
                  "5. volume": "52736"
              },
              "2023-12-21": {
                  "1. open": "130.1300",
                  "2. high": "131.4100",
                  "3. low": "129.7500",
                  "4. close": "131.2900",
                  "5. volume": "72593"
              },
              "2023-12-20": {
                  "1. open": "130.3700",
                  "2. high": "133.3150",
                  "3. low": "128.8400",
                  "4. close": "130.2100",
                  "5. volume": "65435"
              },
              "2023-12-19": {
                  "1. open": "130.5900",
                  "2. high": "132.3000",
                  "3. low": "129.6200",
                  "4. close": "130.6000",
                  "5. volume": "81482"
              },
              "2023-12-18": {
                  "1. open": "133.9500",
                  "2. high": "133.9500",
                  "3. low": "130.1300",
                  "4. close": "130.1400",
                  "5. volume": "106819"
              },
              "2023-12-15": {
                  "1. open": "133.8100",
                  "2. high": "134.0800",
                  "3. low": "131.6700",
                  "4. close": "133.7400",
                  "5. volume": "689074"
              },
              "2023-12-14": {
                  "1. open": "129.0400",
                  "2. high": "134.0000",
                  "3. low": "129.0400",
                  "4. close": "133.6500",
                  "5. volume": "128621"
              },
              "2023-12-13": {
                  "1. open": "122.0500",
                  "2. high": "129.7700",
                  "3. low": "122.0500",
                  "4. close": "128.2500",
                  "5. volume": "135175"
              },
              "2023-12-12": {
                  "1. open": "122.2700",
                  "2. high": "122.3250",
                  "3. low": "120.8350",
                  "4. close": "122.0100",
                  "5. volume": "85000"
              },
              "2023-12-11": {
                  "1. open": "121.1500",
                  "2. high": "122.8200",
                  "3. low": "120.5800",
                  "4. close": "122.4400",
                  "5. volume": "64520"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "NGS",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "22.7500",
                  "2. high": "22.7500",
                  "3. low": "22.3200",
                  "4. close": "22.3900",
                  "5. volume": "37702"
              },
              "2024-05-02": {
                  "1. open": "22.5500",
                  "2. high": "22.9300",
                  "3. low": "22.3500",
                  "4. close": "22.4400",
                  "5. volume": "45098"
              },
              "2024-05-01": {
                  "1. open": "22.1100",
                  "2. high": "22.7200",
                  "3. low": "21.8750",
                  "4. close": "22.4400",
                  "5. volume": "65104"
              },
              "2024-04-30": {
                  "1. open": "23.6000",
                  "2. high": "23.6500",
                  "3. low": "22.0800",
                  "4. close": "22.0800",
                  "5. volume": "95675"
              },
              "2024-04-29": {
                  "1. open": "23.6700",
                  "2. high": "24.2199",
                  "3. low": "23.4400",
                  "4. close": "23.6500",
                  "5. volume": "93279"
              },
              "2024-04-26": {
                  "1. open": "24.0000",
                  "2. high": "24.0600",
                  "3. low": "23.1300",
                  "4. close": "23.7900",
                  "5. volume": "101529"
              },
              "2024-04-25": {
                  "1. open": "24.2500",
                  "2. high": "24.2800",
                  "3. low": "23.9300",
                  "4. close": "24.1700",
                  "5. volume": "47213"
              },
              "2024-04-24": {
                  "1. open": "24.3800",
                  "2. high": "24.9000",
                  "3. low": "23.8900",
                  "4. close": "24.2700",
                  "5. volume": "103675"
              },
              "2024-04-23": {
                  "1. open": "23.9400",
                  "2. high": "24.4500",
                  "3. low": "23.7900",
                  "4. close": "24.2100",
                  "5. volume": "85188"
              },
              "2024-04-22": {
                  "1. open": "23.0800",
                  "2. high": "24.1400",
                  "3. low": "22.9500",
                  "4. close": "23.7300",
                  "5. volume": "86197"
              },
              "2024-04-19": {
                  "1. open": "23.1400",
                  "2. high": "23.8300",
                  "3. low": "23.1155",
                  "4. close": "23.3900",
                  "5. volume": "62269"
              },
              "2024-04-18": {
                  "1. open": "23.3500",
                  "2. high": "23.8978",
                  "3. low": "22.6501",
                  "4. close": "23.3800",
                  "5. volume": "131581"
              },
              "2024-04-17": {
                  "1. open": "23.3300",
                  "2. high": "23.7500",
                  "3. low": "22.6900",
                  "4. close": "23.1800",
                  "5. volume": "78800"
              },
              "2024-04-16": {
                  "1. open": "24.0100",
                  "2. high": "24.0965",
                  "3. low": "22.5201",
                  "4. close": "23.4200",
                  "5. volume": "144182"
              },
              "2024-04-15": {
                  "1. open": "23.7300",
                  "2. high": "24.2400",
                  "3. low": "23.3250",
                  "4. close": "23.9600",
                  "5. volume": "119335"
              },
              "2024-04-12": {
                  "1. open": "23.5700",
                  "2. high": "23.7800",
                  "3. low": "23.3200",
                  "4. close": "23.5200",
                  "5. volume": "86206"
              },
              "2024-04-11": {
                  "1. open": "22.7900",
                  "2. high": "23.5100",
                  "3. low": "22.7900",
                  "4. close": "23.3900",
                  "5. volume": "58170"
              },
              "2024-04-10": {
                  "1. open": "22.8700",
                  "2. high": "23.2100",
                  "3. low": "22.2200",
                  "4. close": "22.8600",
                  "5. volume": "77615"
              },
              "2024-04-09": {
                  "1. open": "23.3400",
                  "2. high": "23.4200",
                  "3. low": "22.7051",
                  "4. close": "23.1200",
                  "5. volume": "96248"
              },
              "2024-04-08": {
                  "1. open": "23.6400",
                  "2. high": "23.8100",
                  "3. low": "23.0600",
                  "4. close": "23.4600",
                  "5. volume": "131167"
              },
              "2024-04-05": {
                  "1. open": "23.9900",
                  "2. high": "24.3900",
                  "3. low": "23.0100",
                  "4. close": "23.6200",
                  "5. volume": "127919"
              },
              "2024-04-04": {
                  "1. open": "23.2500",
                  "2. high": "24.0700",
                  "3. low": "23.0000",
                  "4. close": "23.5500",
                  "5. volume": "142646"
              },
              "2024-04-03": {
                  "1. open": "23.0000",
                  "2. high": "23.9700",
                  "3. low": "22.5700",
                  "4. close": "23.1400",
                  "5. volume": "257820"
              },
              "2024-04-02": {
                  "1. open": "20.5000",
                  "2. high": "22.8400",
                  "3. low": "20.4850",
                  "4. close": "22.7700",
                  "5. volume": "230160"
              },
              "2024-04-01": {
                  "1. open": "19.6200",
                  "2. high": "20.3550",
                  "3. low": "19.3400",
                  "4. close": "20.2500",
                  "5. volume": "179614"
              },
              "2024-03-28": {
                  "1. open": "19.8100",
                  "2. high": "19.9221",
                  "3. low": "19.1750",
                  "4. close": "19.4300",
                  "5. volume": "52930"
              },
              "2024-03-27": {
                  "1. open": "19.6800",
                  "2. high": "20.1500",
                  "3. low": "19.2250",
                  "4. close": "19.7600",
                  "5. volume": "55228"
              },
              "2024-03-26": {
                  "1. open": "19.4600",
                  "2. high": "19.7100",
                  "3. low": "19.0000",
                  "4. close": "19.6800",
                  "5. volume": "91588"
              },
              "2024-03-25": {
                  "1. open": "18.6800",
                  "2. high": "19.6400",
                  "3. low": "18.2510",
                  "4. close": "19.3500",
                  "5. volume": "109555"
              },
              "2024-03-22": {
                  "1. open": "18.4000",
                  "2. high": "18.7200",
                  "3. low": "18.2500",
                  "4. close": "18.5900",
                  "5. volume": "39363"
              },
              "2024-03-21": {
                  "1. open": "18.3900",
                  "2. high": "18.3900",
                  "3. low": "17.9150",
                  "4. close": "18.3200",
                  "5. volume": "37043"
              },
              "2024-03-20": {
                  "1. open": "17.7600",
                  "2. high": "18.1700",
                  "3. low": "17.4600",
                  "4. close": "18.1700",
                  "5. volume": "54563"
              },
              "2024-03-19": {
                  "1. open": "16.8700",
                  "2. high": "17.8100",
                  "3. low": "16.8700",
                  "4. close": "17.7700",
                  "5. volume": "45536"
              },
              "2024-03-18": {
                  "1. open": "17.6000",
                  "2. high": "17.6700",
                  "3. low": "16.9300",
                  "4. close": "16.9300",
                  "5. volume": "47644"
              },
              "2024-03-15": {
                  "1. open": "17.9100",
                  "2. high": "18.1550",
                  "3. low": "17.4500",
                  "4. close": "17.5900",
                  "5. volume": "89530"
              },
              "2024-03-14": {
                  "1. open": "17.8200",
                  "2. high": "17.9800",
                  "3. low": "17.5900",
                  "4. close": "17.7400",
                  "5. volume": "38340"
              },
              "2024-03-13": {
                  "1. open": "17.6800",
                  "2. high": "18.0280",
                  "3. low": "17.4900",
                  "4. close": "17.8000",
                  "5. volume": "39201"
              },
              "2024-03-12": {
                  "1. open": "17.0500",
                  "2. high": "17.5900",
                  "3. low": "17.0500",
                  "4. close": "17.3600",
                  "5. volume": "42165"
              },
              "2024-03-11": {
                  "1. open": "17.2500",
                  "2. high": "17.5800",
                  "3. low": "16.8900",
                  "4. close": "17.2500",
                  "5. volume": "42680"
              },
              "2024-03-08": {
                  "1. open": "17.6700",
                  "2. high": "17.9350",
                  "3. low": "17.1600",
                  "4. close": "17.4300",
                  "5. volume": "39817"
              },
              "2024-03-07": {
                  "1. open": "17.7800",
                  "2. high": "17.9600",
                  "3. low": "17.6100",
                  "4. close": "17.6800",
                  "5. volume": "40561"
              },
              "2024-03-06": {
                  "1. open": "17.8700",
                  "2. high": "18.3550",
                  "3. low": "17.7200",
                  "4. close": "17.7800",
                  "5. volume": "76387"
              },
              "2024-03-05": {
                  "1. open": "17.7700",
                  "2. high": "17.9900",
                  "3. low": "17.5539",
                  "4. close": "17.7300",
                  "5. volume": "47842"
              },
              "2024-03-04": {
                  "1. open": "17.3200",
                  "2. high": "18.0000",
                  "3. low": "17.2900",
                  "4. close": "17.7100",
                  "5. volume": "69032"
              },
              "2024-03-01": {
                  "1. open": "16.7000",
                  "2. high": "17.4700",
                  "3. low": "16.7000",
                  "4. close": "17.2100",
                  "5. volume": "38162"
              },
              "2024-02-29": {
                  "1. open": "16.4700",
                  "2. high": "16.8950",
                  "3. low": "16.4200",
                  "4. close": "16.7300",
                  "5. volume": "27588"
              },
              "2024-02-28": {
                  "1. open": "16.4000",
                  "2. high": "16.8700",
                  "3. low": "16.3200",
                  "4. close": "16.3900",
                  "5. volume": "43248"
              },
              "2024-02-27": {
                  "1. open": "16.1000",
                  "2. high": "16.6100",
                  "3. low": "15.8800",
                  "4. close": "16.5500",
                  "5. volume": "34752"
              },
              "2024-02-26": {
                  "1. open": "15.7400",
                  "2. high": "16.2900",
                  "3. low": "15.5900",
                  "4. close": "16.0000",
                  "5. volume": "38040"
              },
              "2024-02-23": {
                  "1. open": "15.3700",
                  "2. high": "15.9400",
                  "3. low": "15.3100",
                  "4. close": "15.9400",
                  "5. volume": "25800"
              },
              "2024-02-22": {
                  "1. open": "16.0000",
                  "2. high": "16.0000",
                  "3. low": "15.1401",
                  "4. close": "15.5800",
                  "5. volume": "43117"
              },
              "2024-02-21": {
                  "1. open": "15.4700",
                  "2. high": "16.4100",
                  "3. low": "15.3700",
                  "4. close": "16.0500",
                  "5. volume": "39868"
              },
              "2024-02-20": {
                  "1. open": "15.2700",
                  "2. high": "15.8899",
                  "3. low": "15.2000",
                  "4. close": "15.6000",
                  "5. volume": "48662"
              },
              "2024-02-16": {
                  "1. open": "15.2200",
                  "2. high": "15.5800",
                  "3. low": "15.0200",
                  "4. close": "15.4500",
                  "5. volume": "36114"
              },
              "2024-02-15": {
                  "1. open": "14.6900",
                  "2. high": "15.3000",
                  "3. low": "14.6900",
                  "4. close": "15.2600",
                  "5. volume": "20009"
              },
              "2024-02-14": {
                  "1. open": "14.6300",
                  "2. high": "14.7900",
                  "3. low": "14.3756",
                  "4. close": "14.7900",
                  "5. volume": "31917"
              },
              "2024-02-13": {
                  "1. open": "15.7799",
                  "2. high": "15.7800",
                  "3. low": "14.4200",
                  "4. close": "14.7300",
                  "5. volume": "50055"
              },
              "2024-02-12": {
                  "1. open": "14.7800",
                  "2. high": "15.4200",
                  "3. low": "14.7800",
                  "4. close": "15.2400",
                  "5. volume": "35802"
              },
              "2024-02-09": {
                  "1. open": "14.8800",
                  "2. high": "14.9899",
                  "3. low": "14.5400",
                  "4. close": "14.8500",
                  "5. volume": "31765"
              },
              "2024-02-08": {
                  "1. open": "14.3300",
                  "2. high": "15.0000",
                  "3. low": "14.3200",
                  "4. close": "14.9000",
                  "5. volume": "20596"
              },
              "2024-02-07": {
                  "1. open": "14.3100",
                  "2. high": "14.5400",
                  "3. low": "14.0890",
                  "4. close": "14.3000",
                  "5. volume": "20990"
              },
              "2024-02-06": {
                  "1. open": "14.5900",
                  "2. high": "14.7800",
                  "3. low": "14.3000",
                  "4. close": "14.5100",
                  "5. volume": "29373"
              },
              "2024-02-05": {
                  "1. open": "14.5000",
                  "2. high": "14.5399",
                  "3. low": "14.3900",
                  "4. close": "14.4300",
                  "5. volume": "27503"
              },
              "2024-02-02": {
                  "1. open": "14.6700",
                  "2. high": "14.8100",
                  "3. low": "14.2600",
                  "4. close": "14.6800",
                  "5. volume": "33577"
              },
              "2024-02-01": {
                  "1. open": "14.6500",
                  "2. high": "14.9250",
                  "3. low": "14.2700",
                  "4. close": "14.8500",
                  "5. volume": "43747"
              },
              "2024-01-31": {
                  "1. open": "15.1150",
                  "2. high": "15.1150",
                  "3. low": "14.5100",
                  "4. close": "14.6200",
                  "5. volume": "49575"
              },
              "2024-01-30": {
                  "1. open": "15.1900",
                  "2. high": "15.4700",
                  "3. low": "15.0300",
                  "4. close": "15.1400",
                  "5. volume": "16732"
              },
              "2024-01-29": {
                  "1. open": "15.6000",
                  "2. high": "15.6000",
                  "3. low": "15.1694",
                  "4. close": "15.4000",
                  "5. volume": "18076"
              },
              "2024-01-26": {
                  "1. open": "15.4700",
                  "2. high": "15.5300",
                  "3. low": "14.9200",
                  "4. close": "15.5300",
                  "5. volume": "25433"
              },
              "2024-01-25": {
                  "1. open": "15.2400",
                  "2. high": "15.5800",
                  "3. low": "14.8001",
                  "4. close": "15.5800",
                  "5. volume": "23367"
              },
              "2024-01-24": {
                  "1. open": "14.8700",
                  "2. high": "15.0200",
                  "3. low": "14.6100",
                  "4. close": "15.0200",
                  "5. volume": "20617"
              },
              "2024-01-23": {
                  "1. open": "15.0500",
                  "2. high": "15.3550",
                  "3. low": "14.8900",
                  "4. close": "14.9000",
                  "5. volume": "37807"
              },
              "2024-01-22": {
                  "1. open": "14.8700",
                  "2. high": "15.3400",
                  "3. low": "14.6200",
                  "4. close": "15.1800",
                  "5. volume": "39093"
              },
              "2024-01-19": {
                  "1. open": "14.4000",
                  "2. high": "14.8600",
                  "3. low": "14.3705",
                  "4. close": "14.7600",
                  "5. volume": "42242"
              },
              "2024-01-18": {
                  "1. open": "13.7800",
                  "2. high": "14.2600",
                  "3. low": "13.7800",
                  "4. close": "14.2400",
                  "5. volume": "30561"
              },
              "2024-01-17": {
                  "1. open": "13.8200",
                  "2. high": "13.9900",
                  "3. low": "13.6957",
                  "4. close": "13.8800",
                  "5. volume": "38764"
              },
              "2024-01-16": {
                  "1. open": "14.1000",
                  "2. high": "14.2725",
                  "3. low": "13.7400",
                  "4. close": "14.0600",
                  "5. volume": "51633"
              },
              "2024-01-12": {
                  "1. open": "14.3600",
                  "2. high": "14.5700",
                  "3. low": "13.9200",
                  "4. close": "14.0500",
                  "5. volume": "81785"
              },
              "2024-01-11": {
                  "1. open": "14.7300",
                  "2. high": "14.7300",
                  "3. low": "14.1600",
                  "4. close": "14.2900",
                  "5. volume": "57746"
              },
              "2024-01-10": {
                  "1. open": "15.1500",
                  "2. high": "15.1700",
                  "3. low": "14.5600",
                  "4. close": "14.6700",
                  "5. volume": "30488"
              },
              "2024-01-09": {
                  "1. open": "15.5700",
                  "2. high": "15.5700",
                  "3. low": "14.9650",
                  "4. close": "15.1500",
                  "5. volume": "44865"
              },
              "2024-01-08": {
                  "1. open": "15.7900",
                  "2. high": "15.7900",
                  "3. low": "15.3100",
                  "4. close": "15.4900",
                  "5. volume": "49857"
              },
              "2024-01-05": {
                  "1. open": "15.6600",
                  "2. high": "16.1300",
                  "3. low": "15.2000",
                  "4. close": "15.9300",
                  "5. volume": "67235"
              },
              "2024-01-04": {
                  "1. open": "15.4200",
                  "2. high": "15.7100",
                  "3. low": "15.0200",
                  "4. close": "15.4200",
                  "5. volume": "55253"
              },
              "2024-01-03": {
                  "1. open": "15.6306",
                  "2. high": "15.6306",
                  "3. low": "15.0100",
                  "4. close": "15.2200",
                  "5. volume": "58710"
              },
              "2024-01-02": {
                  "1. open": "16.0800",
                  "2. high": "16.0800",
                  "3. low": "15.2800",
                  "4. close": "15.6600",
                  "5. volume": "62791"
              },
              "2023-12-29": {
                  "1. open": "16.1300",
                  "2. high": "16.4400",
                  "3. low": "15.7500",
                  "4. close": "16.0800",
                  "5. volume": "66130"
              },
              "2023-12-28": {
                  "1. open": "15.7900",
                  "2. high": "16.1850",
                  "3. low": "15.5400",
                  "4. close": "15.9500",
                  "5. volume": "62050"
              },
              "2023-12-27": {
                  "1. open": "14.7700",
                  "2. high": "15.9200",
                  "3. low": "14.5500",
                  "4. close": "15.8000",
                  "5. volume": "90528"
              },
              "2023-12-26": {
                  "1. open": "14.5200",
                  "2. high": "14.8000",
                  "3. low": "14.3300",
                  "4. close": "14.7700",
                  "5. volume": "45724"
              },
              "2023-12-22": {
                  "1. open": "14.6100",
                  "2. high": "14.8400",
                  "3. low": "14.3400",
                  "4. close": "14.5800",
                  "5. volume": "35539"
              },
              "2023-12-21": {
                  "1. open": "14.0300",
                  "2. high": "14.7550",
                  "3. low": "14.0300",
                  "4. close": "14.6200",
                  "5. volume": "27317"
              },
              "2023-12-20": {
                  "1. open": "14.9300",
                  "2. high": "14.9300",
                  "3. low": "14.0100",
                  "4. close": "14.0300",
                  "5. volume": "100118"
              },
              "2023-12-19": {
                  "1. open": "14.0000",
                  "2. high": "14.5060",
                  "3. low": "13.6500",
                  "4. close": "14.1000",
                  "5. volume": "87458"
              },
              "2023-12-18": {
                  "1. open": "12.8900",
                  "2. high": "14.1000",
                  "3. low": "12.7600",
                  "4. close": "13.8100",
                  "5. volume": "71936"
              },
              "2023-12-15": {
                  "1. open": "12.9700",
                  "2. high": "13.5050",
                  "3. low": "12.7500",
                  "4. close": "12.8900",
                  "5. volume": "93467"
              },
              "2023-12-14": {
                  "1. open": "13.3300",
                  "2. high": "13.7000",
                  "3. low": "12.9500",
                  "4. close": "12.9800",
                  "5. volume": "113164"
              },
              "2023-12-13": {
                  "1. open": "12.8300",
                  "2. high": "13.6300",
                  "3. low": "12.8300",
                  "4. close": "13.4400",
                  "5. volume": "61592"
              },
              "2023-12-12": {
                  "1. open": "13.2000",
                  "2. high": "13.6000",
                  "3. low": "12.7500",
                  "4. close": "12.9300",
                  "5. volume": "86484"
              },
              "2023-12-11": {
                  "1. open": "13.4400",
                  "2. high": "13.9686",
                  "3. low": "13.1000",
                  "4. close": "13.4300",
                  "5. volume": "56384"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "ORGO",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "2.4800",
                  "2. high": "2.6400",
                  "3. low": "2.4550",
                  "4. close": "2.4900",
                  "5. volume": "895051"
              },
              "2024-05-02": {
                  "1. open": "2.6800",
                  "2. high": "2.9200",
                  "3. low": "2.4200",
                  "4. close": "2.4900",
                  "5. volume": "3006636"
              },
              "2024-05-01": {
                  "1. open": "2.3800",
                  "2. high": "2.5700",
                  "3. low": "2.3550",
                  "4. close": "2.5100",
                  "5. volume": "462786"
              },
              "2024-04-30": {
                  "1. open": "2.4100",
                  "2. high": "2.4383",
                  "3. low": "2.3500",
                  "4. close": "2.3500",
                  "5. volume": "263990"
              },
              "2024-04-29": {
                  "1. open": "2.3500",
                  "2. high": "2.4850",
                  "3. low": "2.3208",
                  "4. close": "2.4550",
                  "5. volume": "1037126"
              },
              "2024-04-26": {
                  "1. open": "2.2900",
                  "2. high": "2.3899",
                  "3. low": "2.2600",
                  "4. close": "2.3500",
                  "5. volume": "903642"
              },
              "2024-04-25": {
                  "1. open": "2.9500",
                  "2. high": "2.9500",
                  "3. low": "2.1650",
                  "4. close": "2.2850",
                  "5. volume": "2555483"
              },
              "2024-04-24": {
                  "1. open": "2.9500",
                  "2. high": "3.0400",
                  "3. low": "2.9300",
                  "4. close": "2.9800",
                  "5. volume": "2973406"
              },
              "2024-04-23": {
                  "1. open": "2.9800",
                  "2. high": "3.0650",
                  "3. low": "2.9400",
                  "4. close": "2.9800",
                  "5. volume": "631653"
              },
              "2024-04-22": {
                  "1. open": "2.9400",
                  "2. high": "3.0400",
                  "3. low": "2.9000",
                  "4. close": "2.9700",
                  "5. volume": "1737377"
              },
              "2024-04-19": {
                  "1. open": "2.8200",
                  "2. high": "2.9100",
                  "3. low": "2.8100",
                  "4. close": "2.9000",
                  "5. volume": "421209"
              },
              "2024-04-18": {
                  "1. open": "2.8100",
                  "2. high": "2.8800",
                  "3. low": "2.7700",
                  "4. close": "2.8600",
                  "5. volume": "787668"
              },
              "2024-04-17": {
                  "1. open": "2.8800",
                  "2. high": "2.9200",
                  "3. low": "2.7700",
                  "4. close": "2.7900",
                  "5. volume": "796312"
              },
              "2024-04-16": {
                  "1. open": "2.7600",
                  "2. high": "2.9000",
                  "3. low": "2.7500",
                  "4. close": "2.8600",
                  "5. volume": "950631"
              },
              "2024-04-15": {
                  "1. open": "2.9100",
                  "2. high": "2.9150",
                  "3. low": "2.7600",
                  "4. close": "2.7600",
                  "5. volume": "722323"
              },
              "2024-04-12": {
                  "1. open": "2.9700",
                  "2. high": "3.0200",
                  "3. low": "2.7900",
                  "4. close": "2.8800",
                  "5. volume": "404580"
              },
              "2024-04-11": {
                  "1. open": "2.9500",
                  "2. high": "3.0300",
                  "3. low": "2.9350",
                  "4. close": "3.0000",
                  "5. volume": "312228"
              },
              "2024-04-10": {
                  "1. open": "2.7700",
                  "2. high": "2.9700",
                  "3. low": "2.7500",
                  "4. close": "2.9500",
                  "5. volume": "1073430"
              },
              "2024-04-09": {
                  "1. open": "2.9800",
                  "2. high": "3.0650",
                  "3. low": "2.8900",
                  "4. close": "2.9200",
                  "5. volume": "419812"
              },
              "2024-04-08": {
                  "1. open": "2.8500",
                  "2. high": "3.0300",
                  "3. low": "2.8500",
                  "4. close": "2.9700",
                  "5. volume": "2369223"
              },
              "2024-04-05": {
                  "1. open": "2.7800",
                  "2. high": "2.9000",
                  "3. low": "2.7400",
                  "4. close": "2.8300",
                  "5. volume": "5333944"
              },
              "2024-04-04": {
                  "1. open": "2.8100",
                  "2. high": "2.9150",
                  "3. low": "2.7100",
                  "4. close": "2.8000",
                  "5. volume": "709159"
              },
              "2024-04-03": {
                  "1. open": "2.5900",
                  "2. high": "2.7900",
                  "3. low": "2.5600",
                  "4. close": "2.7700",
                  "5. volume": "894142"
              },
              "2024-04-02": {
                  "1. open": "2.8400",
                  "2. high": "2.8400",
                  "3. low": "2.5400",
                  "4. close": "2.6100",
                  "5. volume": "749744"
              },
              "2024-04-01": {
                  "1. open": "2.8600",
                  "2. high": "2.9006",
                  "3. low": "2.7200",
                  "4. close": "2.8000",
                  "5. volume": "253844"
              },
              "2024-03-28": {
                  "1. open": "2.7400",
                  "2. high": "2.8650",
                  "3. low": "2.7200",
                  "4. close": "2.8400",
                  "5. volume": "253053"
              },
              "2024-03-27": {
                  "1. open": "2.6600",
                  "2. high": "2.7800",
                  "3. low": "2.6000",
                  "4. close": "2.7600",
                  "5. volume": "406976"
              },
              "2024-03-26": {
                  "1. open": "2.6600",
                  "2. high": "2.6850",
                  "3. low": "2.6100",
                  "4. close": "2.6200",
                  "5. volume": "381010"
              },
              "2024-03-25": {
                  "1. open": "2.6300",
                  "2. high": "2.6850",
                  "3. low": "2.5850",
                  "4. close": "2.6200",
                  "5. volume": "377949"
              },
              "2024-03-22": {
                  "1. open": "2.6800",
                  "2. high": "2.7000",
                  "3. low": "2.5500",
                  "4. close": "2.6100",
                  "5. volume": "603241"
              },
              "2024-03-21": {
                  "1. open": "2.8100",
                  "2. high": "2.8500",
                  "3. low": "2.6400",
                  "4. close": "2.6600",
                  "5. volume": "411840"
              },
              "2024-03-20": {
                  "1. open": "2.6600",
                  "2. high": "2.8700",
                  "3. low": "2.6500",
                  "4. close": "2.8000",
                  "5. volume": "629707"
              },
              "2024-03-19": {
                  "1. open": "2.7900",
                  "2. high": "2.8100",
                  "3. low": "2.7150",
                  "4. close": "2.7500",
                  "5. volume": "877486"
              },
              "2024-03-18": {
                  "1. open": "2.8700",
                  "2. high": "2.9750",
                  "3. low": "2.7300",
                  "4. close": "2.7500",
                  "5. volume": "830085"
              },
              "2024-03-15": {
                  "1. open": "2.8200",
                  "2. high": "2.8900",
                  "3. low": "2.7700",
                  "4. close": "2.8500",
                  "5. volume": "1190637"
              },
              "2024-03-14": {
                  "1. open": "3.0000",
                  "2. high": "3.0400",
                  "3. low": "2.8200",
                  "4. close": "2.8400",
                  "5. volume": "1365371"
              },
              "2024-03-13": {
                  "1. open": "2.9300",
                  "2. high": "3.0450",
                  "3. low": "2.9100",
                  "4. close": "3.0000",
                  "5. volume": "766471"
              },
              "2024-03-12": {
                  "1. open": "3.0400",
                  "2. high": "3.0400",
                  "3. low": "2.8500",
                  "4. close": "2.9400",
                  "5. volume": "357443"
              },
              "2024-03-11": {
                  "1. open": "3.1100",
                  "2. high": "3.1200",
                  "3. low": "2.9350",
                  "4. close": "2.9800",
                  "5. volume": "454994"
              },
              "2024-03-08": {
                  "1. open": "3.2000",
                  "2. high": "3.2850",
                  "3. low": "3.0600",
                  "4. close": "3.1100",
                  "5. volume": "413990"
              },
              "2024-03-07": {
                  "1. open": "2.9000",
                  "2. high": "3.1650",
                  "3. low": "2.8700",
                  "4. close": "3.1300",
                  "5. volume": "1178156"
              },
              "2024-03-06": {
                  "1. open": "2.8400",
                  "2. high": "2.9300",
                  "3. low": "2.7000",
                  "4. close": "2.8500",
                  "5. volume": "853447"
              },
              "2024-03-05": {
                  "1. open": "2.8400",
                  "2. high": "2.8800",
                  "3. low": "2.7500",
                  "4. close": "2.7800",
                  "5. volume": "797936"
              },
              "2024-03-04": {
                  "1. open": "2.9400",
                  "2. high": "3.0100",
                  "3. low": "2.6500",
                  "4. close": "2.8800",
                  "5. volume": "1384343"
              },
              "2024-03-01": {
                  "1. open": "3.0900",
                  "2. high": "3.3900",
                  "3. low": "2.5200",
                  "4. close": "2.9200",
                  "5. volume": "2456535"
              },
              "2024-02-29": {
                  "1. open": "3.6200",
                  "2. high": "3.6500",
                  "3. low": "3.5350",
                  "4. close": "3.5700",
                  "5. volume": "568959"
              },
              "2024-02-28": {
                  "1. open": "3.5800",
                  "2. high": "3.5800",
                  "3. low": "3.4400",
                  "4. close": "3.4900",
                  "5. volume": "510961"
              },
              "2024-02-27": {
                  "1. open": "3.5300",
                  "2. high": "3.6500",
                  "3. low": "3.5100",
                  "4. close": "3.5800",
                  "5. volume": "461665"
              },
              "2024-02-26": {
                  "1. open": "3.4300",
                  "2. high": "3.5250",
                  "3. low": "3.3700",
                  "4. close": "3.4900",
                  "5. volume": "364078"
              },
              "2024-02-23": {
                  "1. open": "3.4000",
                  "2. high": "3.4750",
                  "3. low": "3.3000",
                  "4. close": "3.4600",
                  "5. volume": "414769"
              },
              "2024-02-22": {
                  "1. open": "3.4300",
                  "2. high": "3.4550",
                  "3. low": "3.3550",
                  "4. close": "3.3900",
                  "5. volume": "540600"
              },
              "2024-02-21": {
                  "1. open": "3.4000",
                  "2. high": "3.5600",
                  "3. low": "3.3600",
                  "4. close": "3.4300",
                  "5. volume": "366043"
              },
              "2024-02-20": {
                  "1. open": "3.4900",
                  "2. high": "3.5400",
                  "3. low": "3.3400",
                  "4. close": "3.4200",
                  "5. volume": "591644"
              },
              "2024-02-16": {
                  "1. open": "3.6400",
                  "2. high": "3.6700",
                  "3. low": "3.4800",
                  "4. close": "3.4800",
                  "5. volume": "379937"
              },
              "2024-02-15": {
                  "1. open": "3.7200",
                  "2. high": "3.7600",
                  "3. low": "3.5995",
                  "4. close": "3.6800",
                  "5. volume": "649391"
              },
              "2024-02-14": {
                  "1. open": "3.6200",
                  "2. high": "3.7450",
                  "3. low": "3.5300",
                  "4. close": "3.6750",
                  "5. volume": "282442"
              },
              "2024-02-13": {
                  "1. open": "3.6300",
                  "2. high": "3.8000",
                  "3. low": "3.4500",
                  "4. close": "3.5300",
                  "5. volume": "519977"
              },
              "2024-02-12": {
                  "1. open": "3.6200",
                  "2. high": "3.8600",
                  "3. low": "3.5800",
                  "4. close": "3.8400",
                  "5. volume": "1123279"
              },
              "2024-02-09": {
                  "1. open": "3.6400",
                  "2. high": "3.6600",
                  "3. low": "3.5800",
                  "4. close": "3.6500",
                  "5. volume": "299369"
              },
              "2024-02-08": {
                  "1. open": "3.5700",
                  "2. high": "3.6800",
                  "3. low": "3.5050",
                  "4. close": "3.6200",
                  "5. volume": "450122"
              },
              "2024-02-07": {
                  "1. open": "3.5000",
                  "2. high": "3.6600",
                  "3. low": "3.4350",
                  "4. close": "3.5600",
                  "5. volume": "664910"
              },
              "2024-02-06": {
                  "1. open": "3.2000",
                  "2. high": "3.4300",
                  "3. low": "3.1900",
                  "4. close": "3.4300",
                  "5. volume": "434049"
              },
              "2024-02-05": {
                  "1. open": "3.2500",
                  "2. high": "3.3250",
                  "3. low": "3.1800",
                  "4. close": "3.2000",
                  "5. volume": "449919"
              },
              "2024-02-02": {
                  "1. open": "3.4500",
                  "2. high": "3.4500",
                  "3. low": "3.2200",
                  "4. close": "3.3300",
                  "5. volume": "355735"
              },
              "2024-02-01": {
                  "1. open": "3.3300",
                  "2. high": "3.4500",
                  "3. low": "3.3050",
                  "4. close": "3.4300",
                  "5. volume": "474994"
              },
              "2024-01-31": {
                  "1. open": "3.4800",
                  "2. high": "3.5100",
                  "3. low": "3.2900",
                  "4. close": "3.3000",
                  "5. volume": "527115"
              },
              "2024-01-30": {
                  "1. open": "3.5900",
                  "2. high": "3.5906",
                  "3. low": "3.4250",
                  "4. close": "3.4900",
                  "5. volume": "446984"
              },
              "2024-01-29": {
                  "1. open": "3.5000",
                  "2. high": "3.7300",
                  "3. low": "3.4500",
                  "4. close": "3.6400",
                  "5. volume": "474906"
              },
              "2024-01-26": {
                  "1. open": "3.6800",
                  "2. high": "3.6850",
                  "3. low": "3.4650",
                  "4. close": "3.5100",
                  "5. volume": "340638"
              },
              "2024-01-25": {
                  "1. open": "3.6000",
                  "2. high": "3.6800",
                  "3. low": "3.5800",
                  "4. close": "3.6500",
                  "5. volume": "396600"
              },
              "2024-01-24": {
                  "1. open": "3.7400",
                  "2. high": "3.7400",
                  "3. low": "3.5250",
                  "4. close": "3.5500",
                  "5. volume": "467262"
              },
              "2024-01-23": {
                  "1. open": "3.8400",
                  "2. high": "3.8400",
                  "3. low": "3.6550",
                  "4. close": "3.6650",
                  "5. volume": "681276"
              },
              "2024-01-22": {
                  "1. open": "3.8200",
                  "2. high": "3.8700",
                  "3. low": "3.6900",
                  "4. close": "3.7700",
                  "5. volume": "575200"
              },
              "2024-01-19": {
                  "1. open": "3.8400",
                  "2. high": "3.8400",
                  "3. low": "3.6600",
                  "4. close": "3.7400",
                  "5. volume": "453765"
              },
              "2024-01-18": {
                  "1. open": "3.9000",
                  "2. high": "3.9150",
                  "3. low": "3.6850",
                  "4. close": "3.7900",
                  "5. volume": "562387"
              },
              "2024-01-17": {
                  "1. open": "3.7000",
                  "2. high": "3.8700",
                  "3. low": "3.6100",
                  "4. close": "3.8700",
                  "5. volume": "709633"
              },
              "2024-01-16": {
                  "1. open": "3.8500",
                  "2. high": "3.8500",
                  "3. low": "3.6700",
                  "4. close": "3.8000",
                  "5. volume": "749471"
              },
              "2024-01-12": {
                  "1. open": "4.0100",
                  "2. high": "4.1150",
                  "3. low": "3.8850",
                  "4. close": "3.9150",
                  "5. volume": "462433"
              },
              "2024-01-11": {
                  "1. open": "4.0800",
                  "2. high": "4.1875",
                  "3. low": "3.8900",
                  "4. close": "4.0200",
                  "5. volume": "513090"
              },
              "2024-01-10": {
                  "1. open": "4.3000",
                  "2. high": "4.3600",
                  "3. low": "4.0200",
                  "4. close": "4.0800",
                  "5. volume": "1378500"
              },
              "2024-01-09": {
                  "1. open": "4.3700",
                  "2. high": "4.5250",
                  "3. low": "4.3000",
                  "4. close": "4.3300",
                  "5. volume": "1001180"
              },
              "2024-01-08": {
                  "1. open": "4.2200",
                  "2. high": "4.7050",
                  "3. low": "4.2100",
                  "4. close": "4.4900",
                  "5. volume": "1705001"
              },
              "2024-01-05": {
                  "1. open": "3.8900",
                  "2. high": "4.2700",
                  "3. low": "3.7500",
                  "4. close": "4.2100",
                  "5. volume": "1377906"
              },
              "2024-01-04": {
                  "1. open": "3.7400",
                  "2. high": "3.8000",
                  "3. low": "3.6600",
                  "4. close": "3.7300",
                  "5. volume": "420439"
              },
              "2024-01-03": {
                  "1. open": "4.0200",
                  "2. high": "4.0200",
                  "3. low": "3.6750",
                  "4. close": "3.7100",
                  "5. volume": "656705"
              },
              "2024-01-02": {
                  "1. open": "4.0400",
                  "2. high": "4.1700",
                  "3. low": "3.9250",
                  "4. close": "4.0800",
                  "5. volume": "673255"
              },
              "2023-12-29": {
                  "1. open": "4.2000",
                  "2. high": "4.2400",
                  "3. low": "4.0600",
                  "4. close": "4.0900",
                  "5. volume": "1446067"
              },
              "2023-12-28": {
                  "1. open": "4.2700",
                  "2. high": "4.3200",
                  "3. low": "4.1100",
                  "4. close": "4.1900",
                  "5. volume": "1001831"
              },
              "2023-12-27": {
                  "1. open": "4.1500",
                  "2. high": "4.4850",
                  "3. low": "4.1500",
                  "4. close": "4.2100",
                  "5. volume": "1004429"
              },
              "2023-12-26": {
                  "1. open": "3.9900",
                  "2. high": "4.0167",
                  "3. low": "3.9200",
                  "4. close": "3.9700",
                  "5. volume": "387568"
              },
              "2023-12-22": {
                  "1. open": "3.8800",
                  "2. high": "4.0400",
                  "3. low": "3.8800",
                  "4. close": "3.9600",
                  "5. volume": "477955"
              },
              "2023-12-21": {
                  "1. open": "3.9200",
                  "2. high": "3.9600",
                  "3. low": "3.8350",
                  "4. close": "3.8800",
                  "5. volume": "607224"
              },
              "2023-12-20": {
                  "1. open": "4.0000",
                  "2. high": "4.1900",
                  "3. low": "3.8400",
                  "4. close": "3.8400",
                  "5. volume": "836436"
              },
              "2023-12-19": {
                  "1. open": "3.8200",
                  "2. high": "4.0100",
                  "3. low": "3.7700",
                  "4. close": "4.0100",
                  "5. volume": "1079164"
              },
              "2023-12-18": {
                  "1. open": "3.7100",
                  "2. high": "3.7950",
                  "3. low": "3.6400",
                  "4. close": "3.7500",
                  "5. volume": "1125110"
              },
              "2023-12-15": {
                  "1. open": "3.8000",
                  "2. high": "3.8200",
                  "3. low": "3.6001",
                  "4. close": "3.7500",
                  "5. volume": "1345926"
              },
              "2023-12-14": {
                  "1. open": "3.6300",
                  "2. high": "3.7609",
                  "3. low": "3.5400",
                  "4. close": "3.7300",
                  "5. volume": "1120314"
              },
              "2023-12-13": {
                  "1. open": "3.3000",
                  "2. high": "3.5600",
                  "3. low": "3.1850",
                  "4. close": "3.5200",
                  "5. volume": "1222606"
              },
              "2023-12-12": {
                  "1. open": "3.2500",
                  "2. high": "3.2900",
                  "3. low": "3.1800",
                  "4. close": "3.2700",
                  "5. volume": "415363"
              },
              "2023-12-11": {
                  "1. open": "3.3900",
                  "2. high": "3.4000",
                  "3. low": "3.1900",
                  "4. close": "3.2300",
                  "5. volume": "823118"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "PARA",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "14.3450",
                  "2. high": "14.5400",
                  "3. low": "12.8600",
                  "4. close": "12.8900",
                  "5. volume": "67049331"
              },
              "2024-05-02": {
                  "1. open": "12.2700",
                  "2. high": "13.9950",
                  "3. low": "12.0600",
                  "4. close": "13.8600",
                  "5. volume": "64803781"
              },
              "2024-05-01": {
                  "1. open": "11.4700",
                  "2. high": "12.3200",
                  "3. low": "11.4600",
                  "4. close": "12.2600",
                  "5. volume": "18519510"
              },
              "2024-04-30": {
                  "1. open": "12.1000",
                  "2. high": "12.1200",
                  "3. low": "11.3300",
                  "4. close": "11.3900",
                  "5. volume": "23834623"
              },
              "2024-04-29": {
                  "1. open": "12.5000",
                  "2. high": "12.7500",
                  "3. low": "12.1600",
                  "4. close": "12.2500",
                  "5. volume": "26501567"
              },
              "2024-04-26": {
                  "1. open": "11.8900",
                  "2. high": "12.2299",
                  "3. low": "11.8200",
                  "4. close": "11.9100",
                  "5. volume": "15347016"
              },
              "2024-04-25": {
                  "1. open": "12.5300",
                  "2. high": "12.7300",
                  "3. low": "12.0800",
                  "4. close": "12.1800",
                  "5. volume": "18338195"
              },
              "2024-04-24": {
                  "1. open": "12.6500",
                  "2. high": "12.8100",
                  "3. low": "12.4000",
                  "4. close": "12.6800",
                  "5. volume": "9629315"
              },
              "2024-04-23": {
                  "1. open": "12.2100",
                  "2. high": "12.9800",
                  "3. low": "12.2000",
                  "4. close": "12.7400",
                  "5. volume": "15385710"
              },
              "2024-04-22": {
                  "1. open": "12.4600",
                  "2. high": "12.5300",
                  "3. low": "11.9300",
                  "4. close": "12.3800",
                  "5. volume": "19616751"
              },
              "2024-04-19": {
                  "1. open": "11.9400",
                  "2. high": "12.5800",
                  "3. low": "11.6700",
                  "4. close": "12.4400",
                  "5. volume": "45625404"
              },
              "2024-04-18": {
                  "1. open": "10.7900",
                  "2. high": "11.1800",
                  "3. low": "10.7600",
                  "4. close": "10.9700",
                  "5. volume": "11669369"
              },
              "2024-04-17": {
                  "1. open": "10.5000",
                  "2. high": "10.9000",
                  "3. low": "10.4900",
                  "4. close": "10.8100",
                  "5. volume": "11543058"
              },
              "2024-04-16": {
                  "1. open": "10.7000",
                  "2. high": "10.8250",
                  "3. low": "10.3650",
                  "4. close": "10.4300",
                  "5. volume": "14883056"
              },
              "2024-04-15": {
                  "1. open": "10.9300",
                  "2. high": "11.0900",
                  "3. low": "10.7500",
                  "4. close": "10.9000",
                  "5. volume": "18417043"
              },
              "2024-04-12": {
                  "1. open": "11.1100",
                  "2. high": "11.2400",
                  "3. low": "10.9000",
                  "4. close": "10.9600",
                  "5. volume": "14768834"
              },
              "2024-04-11": {
                  "1. open": "10.6000",
                  "2. high": "11.3800",
                  "3. low": "10.5800",
                  "4. close": "11.2700",
                  "5. volume": "27581192"
              },
              "2024-04-10": {
                  "1. open": "10.7000",
                  "2. high": "10.9800",
                  "3. low": "10.1200",
                  "4. close": "10.5000",
                  "5. volume": "35124904"
              },
              "2024-04-09": {
                  "1. open": "11.0100",
                  "2. high": "11.2450",
                  "3. low": "10.8900",
                  "4. close": "10.9700",
                  "5. volume": "17418832"
              },
              "2024-04-08": {
                  "1. open": "11.8300",
                  "2. high": "11.8400",
                  "3. low": "11.0550",
                  "4. close": "11.0600",
                  "5. volume": "36721506"
              },
              "2024-04-05": {
                  "1. open": "12.5100",
                  "2. high": "12.7900",
                  "3. low": "11.6800",
                  "4. close": "11.9700",
                  "5. volume": "30855152"
              },
              "2024-04-04": {
                  "1. open": "12.3900",
                  "2. high": "13.5200",
                  "3. low": "12.1000",
                  "4. close": "12.3700",
                  "5. volume": "50943913"
              },
              "2024-04-03": {
                  "1. open": "11.8600",
                  "2. high": "13.8000",
                  "3. low": "11.3200",
                  "4. close": "13.5200",
                  "5. volume": "60770018"
              },
              "2024-04-02": {
                  "1. open": "11.5900",
                  "2. high": "11.7800",
                  "3. low": "11.4750",
                  "4. close": "11.7600",
                  "5. volume": "9967495"
              },
              "2024-04-01": {
                  "1. open": "11.8100",
                  "2. high": "11.8377",
                  "3. low": "11.5600",
                  "4. close": "11.7500",
                  "5. volume": "9523829"
              },
              "2024-03-28": {
                  "1. open": "11.6200",
                  "2. high": "11.9100",
                  "3. low": "11.6100",
                  "4. close": "11.7700",
                  "5. volume": "9850389"
              },
              "2024-03-27": {
                  "1. open": "11.3900",
                  "2. high": "11.7400",
                  "3. low": "11.2800",
                  "4. close": "11.7000",
                  "5. volume": "17754472"
              },
              "2024-03-26": {
                  "1. open": "11.5300",
                  "2. high": "11.6300",
                  "3. low": "11.3000",
                  "4. close": "11.3700",
                  "5. volume": "8956526"
              },
              "2024-03-25": {
                  "1. open": "11.3500",
                  "2. high": "11.4700",
                  "3. low": "11.1900",
                  "4. close": "11.4500",
                  "5. volume": "9294799"
              },
              "2024-03-22": {
                  "1. open": "11.8400",
                  "2. high": "11.8400",
                  "3. low": "11.2350",
                  "4. close": "11.2500",
                  "5. volume": "16685686"
              },
              "2024-03-21": {
                  "1. open": "12.5700",
                  "2. high": "12.7100",
                  "3. low": "11.7700",
                  "4. close": "11.8200",
                  "5. volume": "25037458"
              },
              "2024-03-20": {
                  "1. open": "11.1600",
                  "2. high": "12.5600",
                  "3. low": "11.0660",
                  "4. close": "12.5100",
                  "5. volume": "40555854"
              },
              "2024-03-19": {
                  "1. open": "11.1000",
                  "2. high": "11.3700",
                  "3. low": "11.0800",
                  "4. close": "11.1900",
                  "5. volume": "10960224"
              },
              "2024-03-18": {
                  "1. open": "11.2300",
                  "2. high": "11.2600",
                  "3. low": "11.0300",
                  "4. close": "11.2000",
                  "5. volume": "9527244"
              },
              "2024-03-15": {
                  "1. open": "11.2600",
                  "2. high": "11.3700",
                  "3. low": "11.1400",
                  "4. close": "11.2100",
                  "5. volume": "35215216"
              },
              "2024-03-14": {
                  "1. open": "11.6500",
                  "2. high": "11.6500",
                  "3. low": "11.1300",
                  "4. close": "11.2600",
                  "5. volume": "14542852"
              },
              "2024-03-13": {
                  "1. open": "11.5500",
                  "2. high": "11.8800",
                  "3. low": "11.5500",
                  "4. close": "11.6800",
                  "5. volume": "9656415"
              },
              "2024-03-12": {
                  "1. open": "12.2000",
                  "2. high": "12.2100",
                  "3. low": "11.4600",
                  "4. close": "11.5900",
                  "5. volume": "18965240"
              },
              "2024-03-11": {
                  "1. open": "10.9200",
                  "2. high": "11.6900",
                  "3. low": "10.8500",
                  "4. close": "11.6200",
                  "5. volume": "18233354"
              },
              "2024-03-08": {
                  "1. open": "10.9000",
                  "2. high": "11.0271",
                  "3. low": "10.7900",
                  "4. close": "10.9300",
                  "5. volume": "12173605"
              },
              "2024-03-07": {
                  "1. open": "10.5300",
                  "2. high": "10.9900",
                  "3. low": "10.5200",
                  "4. close": "10.8000",
                  "5. volume": "15283611"
              },
              "2024-03-06": {
                  "1. open": "10.2700",
                  "2. high": "10.6300",
                  "3. low": "10.2145",
                  "4. close": "10.5000",
                  "5. volume": "14075027"
              },
              "2024-03-05": {
                  "1. open": "10.2500",
                  "2. high": "10.3900",
                  "3. low": "10.1600",
                  "4. close": "10.2100",
                  "5. volume": "11957212"
              },
              "2024-03-04": {
                  "1. open": "10.8500",
                  "2. high": "10.9000",
                  "3. low": "10.2000",
                  "4. close": "10.3000",
                  "5. volume": "25771167"
              },
              "2024-03-01": {
                  "1. open": "11.0500",
                  "2. high": "11.0710",
                  "3. low": "10.8100",
                  "4. close": "10.9500",
                  "5. volume": "15587045"
              },
              "2024-02-29": {
                  "1. open": "11.3800",
                  "2. high": "11.9800",
                  "3. low": "11.0000",
                  "4. close": "11.0400",
                  "5. volume": "38590989"
              },
              "2024-02-28": {
                  "1. open": "11.0800",
                  "2. high": "11.3700",
                  "3. low": "10.9300",
                  "4. close": "11.0600",
                  "5. volume": "28898457"
              },
              "2024-02-27": {
                  "1. open": "11.1200",
                  "2. high": "11.3400",
                  "3. low": "10.9000",
                  "4. close": "11.2500",
                  "5. volume": "25111189"
              },
              "2024-02-26": {
                  "1. open": "11.2000",
                  "2. high": "11.3900",
                  "3. low": "11.0200",
                  "4. close": "11.0900",
                  "5. volume": "19461427"
              },
              "2024-02-23": {
                  "1. open": "11.3500",
                  "2. high": "11.5112",
                  "3. low": "10.9900",
                  "4. close": "11.2100",
                  "5. volume": "23106611"
              },
              "2024-02-22": {
                  "1. open": "11.9200",
                  "2. high": "11.9400",
                  "3. low": "11.6900",
                  "4. close": "11.7100",
                  "5. volume": "11178612"
              },
              "2024-02-21": {
                  "1. open": "11.8300",
                  "2. high": "11.8900",
                  "3. low": "11.7000",
                  "4. close": "11.8000",
                  "5. volume": "10276344"
              },
              "2024-02-20": {
                  "1. open": "11.9400",
                  "2. high": "12.1600",
                  "3. low": "11.8400",
                  "4. close": "11.9500",
                  "5. volume": "13026958"
              },
              "2024-02-16": {
                  "1. open": "12.4600",
                  "2. high": "12.5400",
                  "3. low": "12.0000",
                  "4. close": "12.0000",
                  "5. volume": "21617216"
              },
              "2024-02-15": {
                  "1. open": "12.6600",
                  "2. high": "13.1200",
                  "3. low": "12.3500",
                  "4. close": "12.5900",
                  "5. volume": "20832818"
              },
              "2024-02-14": {
                  "1. open": "13.1600",
                  "2. high": "13.2400",
                  "3. low": "12.9800",
                  "4. close": "13.1900",
                  "5. volume": "12184192"
              },
              "2024-02-13": {
                  "1. open": "13.1000",
                  "2. high": "13.1500",
                  "3. low": "12.7680",
                  "4. close": "13.0000",
                  "5. volume": "15176468"
              },
              "2024-02-12": {
                  "1. open": "12.9500",
                  "2. high": "13.6100",
                  "3. low": "12.8750",
                  "4. close": "13.4100",
                  "5. volume": "18549887"
              },
              "2024-02-09": {
                  "1. open": "13.0600",
                  "2. high": "13.1700",
                  "3. low": "12.8400",
                  "4. close": "12.9000",
                  "5. volume": "9780277"
              },
              "2024-02-08": {
                  "1. open": "13.0000",
                  "2. high": "13.1250",
                  "3. low": "12.6608",
                  "4. close": "13.0100",
                  "5. volume": "12737767"
              },
              "2024-02-07": {
                  "1. open": "13.9000",
                  "2. high": "13.9100",
                  "3. low": "12.8000",
                  "4. close": "12.8500",
                  "5. volume": "27707064"
              },
              "2024-02-06": {
                  "1. open": "14.0000",
                  "2. high": "14.1700",
                  "3. low": "13.9300",
                  "4. close": "13.9900",
                  "5. volume": "11769786"
              },
              "2024-02-05": {
                  "1. open": "14.3500",
                  "2. high": "14.3800",
                  "3. low": "13.8900",
                  "4. close": "14.0200",
                  "5. volume": "13217619"
              },
              "2024-02-02": {
                  "1. open": "14.5200",
                  "2. high": "14.5500",
                  "3. low": "14.2600",
                  "4. close": "14.4300",
                  "5. volume": "14524382"
              },
              "2024-02-01": {
                  "1. open": "14.9000",
                  "2. high": "15.0000",
                  "3. low": "14.4250",
                  "4. close": "14.6800",
                  "5. volume": "16944291"
              },
              "2024-01-31": {
                  "1. open": "15.6600",
                  "2. high": "15.7000",
                  "3. low": "14.5700",
                  "4. close": "14.5900",
                  "5. volume": "71655797"
              },
              "2024-01-30": {
                  "1. open": "13.5500",
                  "2. high": "13.9050",
                  "3. low": "13.4850",
                  "4. close": "13.6800",
                  "5. volume": "8704142"
              },
              "2024-01-29": {
                  "1. open": "13.7500",
                  "2. high": "13.8400",
                  "3. low": "13.4600",
                  "4. close": "13.7500",
                  "5. volume": "8470086"
              },
              "2024-01-26": {
                  "1. open": "13.9800",
                  "2. high": "14.0100",
                  "3. low": "13.7300",
                  "4. close": "13.8000",
                  "5. volume": "8992563"
              },
              "2024-01-25": {
                  "1. open": "13.9600",
                  "2. high": "14.5300",
                  "3. low": "13.4945",
                  "4. close": "13.9600",
                  "5. volume": "30678913"
              },
              "2024-01-24": {
                  "1. open": "13.8200",
                  "2. high": "13.8301",
                  "3. low": "13.0750",
                  "4. close": "13.3600",
                  "5. volume": "17238028"
              },
              "2024-01-23": {
                  "1. open": "13.9000",
                  "2. high": "13.9800",
                  "3. low": "13.6500",
                  "4. close": "13.6800",
                  "5. volume": "9361545"
              },
              "2024-01-22": {
                  "1. open": "13.4300",
                  "2. high": "14.0500",
                  "3. low": "13.4100",
                  "4. close": "13.7500",
                  "5. volume": "11615860"
              },
              "2024-01-19": {
                  "1. open": "13.0500",
                  "2. high": "13.4597",
                  "3. low": "12.8550",
                  "4. close": "13.4000",
                  "5. volume": "13799746"
              },
              "2024-01-18": {
                  "1. open": "13.1400",
                  "2. high": "13.1850",
                  "3. low": "12.9050",
                  "4. close": "13.1100",
                  "5. volume": "7927904"
              },
              "2024-01-17": {
                  "1. open": "13.0800",
                  "2. high": "13.1980",
                  "3. low": "12.8400",
                  "4. close": "13.0000",
                  "5. volume": "10282927"
              },
              "2024-01-16": {
                  "1. open": "13.1900",
                  "2. high": "13.5100",
                  "3. low": "13.1200",
                  "4. close": "13.2300",
                  "5. volume": "11028783"
              },
              "2024-01-12": {
                  "1. open": "13.3050",
                  "2. high": "13.6650",
                  "3. low": "13.2400",
                  "4. close": "13.3300",
                  "5. volume": "12371292"
              },
              "2024-01-11": {
                  "1. open": "13.8800",
                  "2. high": "13.9000",
                  "3. low": "13.1550",
                  "4. close": "13.3500",
                  "5. volume": "19492099"
              },
              "2024-01-10": {
                  "1. open": "14.1300",
                  "2. high": "14.5550",
                  "3. low": "13.9200",
                  "4. close": "14.1200",
                  "5. volume": "21357340"
              },
              "2024-01-09": {
                  "1. open": "14.5300",
                  "2. high": "14.5590",
                  "3. low": "14.1900",
                  "4. close": "14.2300",
                  "5. volume": "10562049"
              },
              "2024-01-08": {
                  "1. open": "14.5600",
                  "2. high": "14.9550",
                  "3. low": "14.4800",
                  "4. close": "14.6900",
                  "5. volume": "12360827"
              },
              "2024-01-05": {
                  "1. open": "14.3900",
                  "2. high": "15.0400",
                  "3. low": "14.3100",
                  "4. close": "14.6500",
                  "5. volume": "12681139"
              },
              "2024-01-04": {
                  "1. open": "14.1900",
                  "2. high": "14.5300",
                  "3. low": "14.0100",
                  "4. close": "14.4900",
                  "5. volume": "10727565"
              },
              "2024-01-03": {
                  "1. open": "14.1300",
                  "2. high": "14.3200",
                  "3. low": "13.7800",
                  "4. close": "14.1900",
                  "5. volume": "14447356"
              },
              "2024-01-02": {
                  "1. open": "14.6900",
                  "2. high": "14.7500",
                  "3. low": "14.3350",
                  "4. close": "14.4000",
                  "5. volume": "14285905"
              },
              "2023-12-29": {
                  "1. open": "15.0000",
                  "2. high": "15.1450",
                  "3. low": "14.7500",
                  "4. close": "14.7900",
                  "5. volume": "12177857"
              },
              "2023-12-28": {
                  "1. open": "14.9800",
                  "2. high": "15.3800",
                  "3. low": "14.9000",
                  "4. close": "15.1500",
                  "5. volume": "21671706"
              },
              "2023-12-27": {
                  "1. open": "14.9800",
                  "2. high": "15.0000",
                  "3. low": "14.7200",
                  "4. close": "14.9900",
                  "5. volume": "9077479"
              },
              "2023-12-26": {
                  "1. open": "15.0000",
                  "2. high": "15.1500",
                  "3. low": "14.8850",
                  "4. close": "15.0200",
                  "5. volume": "12556546"
              },
              "2023-12-22": {
                  "1. open": "15.1100",
                  "2. high": "15.3000",
                  "3. low": "14.9450",
                  "4. close": "15.0000",
                  "5. volume": "17818959"
              },
              "2023-12-21": {
                  "1. open": "15.2100",
                  "2. high": "15.5000",
                  "3. low": "14.7900",
                  "4. close": "15.0700",
                  "5. volume": "30003130"
              },
              "2023-12-20": {
                  "1. open": "16.0100",
                  "2. high": "16.2800",
                  "3. low": "15.1650",
                  "4. close": "15.5000",
                  "5. volume": "36752802"
              },
              "2023-12-19": {
                  "1. open": "15.5500",
                  "2. high": "15.9300",
                  "3. low": "15.4000",
                  "4. close": "15.8200",
                  "5. volume": "14738524"
              },
              "2023-12-18": {
                  "1. open": "16.0700",
                  "2. high": "16.3000",
                  "3. low": "15.4500",
                  "4. close": "15.5100",
                  "5. volume": "14119803"
              },
              "2023-12-15": {
                  "1. open": "16.5900",
                  "2. high": "16.6300",
                  "3. low": "15.9800",
                  "4. close": "16.2700",
                  "5. volume": "24281289"
              },
              "2023-12-14": {
                  "1. open": "16.1600",
                  "2. high": "16.8300",
                  "3. low": "16.1600",
                  "4. close": "16.7100",
                  "5. volume": "20096024"
              },
              "2023-12-13": {
                  "1. open": "15.0600",
                  "2. high": "15.8800",
                  "3. low": "14.6700",
                  "4. close": "15.7300",
                  "5. volume": "26230031"
              },
              "2023-12-12": {
                  "1. open": "16.2200",
                  "2. high": "16.2800",
                  "3. low": "15.2300",
                  "4. close": "15.2700",
                  "5. volume": "19420904"
              },
              "2023-12-11": {
                  "1. open": "17.3900",
                  "2. high": "17.5000",
                  "3. low": "16.1200",
                  "4. close": "16.2400",
                  "5. volume": "26904145"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "SHOP",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "73.7800",
                  "2. high": "74.8800",
                  "3. low": "73.0600",
                  "4. close": "74.4600",
                  "5. volume": "7346442"
              },
              "2024-05-02": {
                  "1. open": "71.9900",
                  "2. high": "72.7200",
                  "3. low": "70.2300",
                  "4. close": "72.0000",
                  "5. volume": "5387070"
              },
              "2024-05-01": {
                  "1. open": "70.2100",
                  "2. high": "72.0800",
                  "3. low": "68.8800",
                  "4. close": "70.4000",
                  "5. volume": "7436748"
              },
              "2024-04-30": {
                  "1. open": "72.4000",
                  "2. high": "74.4800",
                  "3. low": "70.1800",
                  "4. close": "70.2000",
                  "5. volume": "8246161"
              },
              "2024-04-29": {
                  "1. open": "73.8100",
                  "2. high": "74.0400",
                  "3. low": "71.3800",
                  "4. close": "72.4800",
                  "5. volume": "10108810"
              },
              "2024-04-26": {
                  "1. open": "71.3200",
                  "2. high": "71.8300",
                  "3. low": "70.7350",
                  "4. close": "71.3300",
                  "5. volume": "4611766"
              },
              "2024-04-25": {
                  "1. open": "70.4300",
                  "2. high": "71.3600",
                  "3. low": "69.5692",
                  "4. close": "70.5500",
                  "5. volume": "6770470"
              },
              "2024-04-24": {
                  "1. open": "74.4000",
                  "2. high": "74.7160",
                  "3. low": "71.6500",
                  "4. close": "72.2600",
                  "5. volume": "6086539"
              },
              "2024-04-23": {
                  "1. open": "71.2800",
                  "2. high": "74.5900",
                  "3. low": "71.2200",
                  "4. close": "74.0100",
                  "5. volume": "9517493"
              },
              "2024-04-22": {
                  "1. open": "70.0500",
                  "2. high": "71.2700",
                  "3. low": "69.3200",
                  "4. close": "70.5500",
                  "5. volume": "5908214"
              },
              "2024-04-19": {
                  "1. open": "71.0000",
                  "2. high": "71.6300",
                  "3. low": "68.7900",
                  "4. close": "69.6700",
                  "5. volume": "11077726"
              },
              "2024-04-18": {
                  "1. open": "69.3300",
                  "2. high": "70.9500",
                  "3. low": "68.1500",
                  "4. close": "69.5100",
                  "5. volume": "7360491"
              },
              "2024-04-17": {
                  "1. open": "69.5000",
                  "2. high": "71.0000",
                  "3. low": "68.9700",
                  "4. close": "69.4100",
                  "5. volume": "8373238"
              },
              "2024-04-16": {
                  "1. open": "68.4700",
                  "2. high": "69.3400",
                  "3. low": "68.0150",
                  "4. close": "68.7000",
                  "5. volume": "9249204"
              },
              "2024-04-15": {
                  "1. open": "70.0000",
                  "2. high": "70.4100",
                  "3. low": "68.3900",
                  "4. close": "68.5700",
                  "5. volume": "8733162"
              },
              "2024-04-12": {
                  "1. open": "70.8900",
                  "2. high": "71.1900",
                  "3. low": "69.1900",
                  "4. close": "70.0000",
                  "5. volume": "11042554"
              },
              "2024-04-11": {
                  "1. open": "71.9800",
                  "2. high": "72.2700",
                  "3. low": "70.4900",
                  "4. close": "71.5700",
                  "5. volume": "11728025"
              },
              "2024-04-10": {
                  "1. open": "72.8000",
                  "2. high": "73.1200",
                  "3. low": "71.5900",
                  "4. close": "71.9800",
                  "5. volume": "8018265"
              },
              "2024-04-09": {
                  "1. open": "74.3600",
                  "2. high": "75.0800",
                  "3. low": "73.5000",
                  "4. close": "74.9200",
                  "5. volume": "4249302"
              },
              "2024-04-08": {
                  "1. open": "75.2100",
                  "2. high": "75.4600",
                  "3. low": "73.3200",
                  "4. close": "74.3800",
                  "5. volume": "6938661"
              },
              "2024-04-05": {
                  "1. open": "74.6000",
                  "2. high": "75.9916",
                  "3. low": "73.6900",
                  "4. close": "75.2800",
                  "5. volume": "6567938"
              },
              "2024-04-04": {
                  "1. open": "75.6100",
                  "2. high": "77.0700",
                  "3. low": "74.5600",
                  "4. close": "74.8100",
                  "5. volume": "8417836"
              },
              "2024-04-03": {
                  "1. open": "78.2800",
                  "2. high": "79.2900",
                  "3. low": "75.1300",
                  "4. close": "75.6400",
                  "5. volume": "9731380"
              },
              "2024-04-02": {
                  "1. open": "76.6100",
                  "2. high": "78.6000",
                  "3. low": "75.9500",
                  "4. close": "78.1200",
                  "5. volume": "6577996"
              },
              "2024-04-01": {
                  "1. open": "77.3500",
                  "2. high": "78.6300",
                  "3. low": "76.2800",
                  "4. close": "78.1900",
                  "5. volume": "6514045"
              },
              "2024-03-28": {
                  "1. open": "78.8000",
                  "2. high": "79.1950",
                  "3. low": "77.0000",
                  "4. close": "77.1700",
                  "5. volume": "4260950"
              },
              "2024-03-27": {
                  "1. open": "79.3500",
                  "2. high": "79.3800",
                  "3. low": "77.4600",
                  "4. close": "78.6200",
                  "5. volume": "4399727"
              },
              "2024-03-26": {
                  "1. open": "79.0400",
                  "2. high": "79.7500",
                  "3. low": "77.7500",
                  "4. close": "78.5300",
                  "5. volume": "4442210"
              },
              "2024-03-25": {
                  "1. open": "78.1000",
                  "2. high": "79.5600",
                  "3. low": "77.7350",
                  "4. close": "78.4200",
                  "5. volume": "4596006"
              },
              "2024-03-22": {
                  "1. open": "78.8900",
                  "2. high": "80.3700",
                  "3. low": "78.3800",
                  "4. close": "78.7200",
                  "5. volume": "4561270"
              },
              "2024-03-21": {
                  "1. open": "81.6600",
                  "2. high": "83.3900",
                  "3. low": "79.5600",
                  "4. close": "79.5900",
                  "5. volume": "11345850"
              },
              "2024-03-20": {
                  "1. open": "77.5300",
                  "2. high": "81.6200",
                  "3. low": "77.2850",
                  "4. close": "81.3300",
                  "5. volume": "6793695"
              },
              "2024-03-19": {
                  "1. open": "76.7300",
                  "2. high": "78.5300",
                  "3. low": "75.3000",
                  "4. close": "77.5300",
                  "5. volume": "5736507"
              },
              "2024-03-18": {
                  "1. open": "78.0000",
                  "2. high": "78.0000",
                  "3. low": "76.2600",
                  "4. close": "77.5200",
                  "5. volume": "5440735"
              },
              "2024-03-15": {
                  "1. open": "78.2300",
                  "2. high": "79.0700",
                  "3. low": "76.7600",
                  "4. close": "77.1500",
                  "5. volume": "5821640"
              },
              "2024-03-14": {
                  "1. open": "78.5300",
                  "2. high": "79.8000",
                  "3. low": "77.3600",
                  "4. close": "78.4200",
                  "5. volume": "7136794"
              },
              "2024-03-13": {
                  "1. open": "76.1900",
                  "2. high": "79.4000",
                  "3. low": "76.1000",
                  "4. close": "78.6800",
                  "5. volume": "10823464"
              },
              "2024-03-12": {
                  "1. open": "75.9500",
                  "2. high": "76.6900",
                  "3. low": "74.5810",
                  "4. close": "76.3600",
                  "5. volume": "5624156"
              },
              "2024-03-11": {
                  "1. open": "75.6000",
                  "2. high": "76.2900",
                  "3. low": "74.4400",
                  "4. close": "74.9700",
                  "5. volume": "5175144"
              },
              "2024-03-08": {
                  "1. open": "76.0800",
                  "2. high": "79.5800",
                  "3. low": "76.0800",
                  "4. close": "76.1600",
                  "5. volume": "10444348"
              },
              "2024-03-07": {
                  "1. open": "74.2600",
                  "2. high": "75.9600",
                  "3. low": "73.2000",
                  "4. close": "75.3300",
                  "5. volume": "7592502"
              },
              "2024-03-06": {
                  "1. open": "74.1800",
                  "2. high": "74.8500",
                  "3. low": "72.9150",
                  "4. close": "74.0100",
                  "5. volume": "5757307"
              },
              "2024-03-05": {
                  "1. open": "74.8000",
                  "2. high": "74.9300",
                  "3. low": "72.6400",
                  "4. close": "73.4700",
                  "5. volume": "8691164"
              },
              "2024-03-04": {
                  "1. open": "76.4700",
                  "2. high": "76.5300",
                  "3. low": "73.9900",
                  "4. close": "75.7700",
                  "5. volume": "7394983"
              },
              "2024-03-01": {
                  "1. open": "77.1100",
                  "2. high": "78.6600",
                  "3. low": "76.3101",
                  "4. close": "76.5900",
                  "5. volume": "7800949"
              },
              "2024-02-29": {
                  "1. open": "76.2700",
                  "2. high": "77.1400",
                  "3. low": "75.0300",
                  "4. close": "76.3700",
                  "5. volume": "6693422"
              },
              "2024-02-28": {
                  "1. open": "75.5600",
                  "2. high": "76.1900",
                  "3. low": "74.7270",
                  "4. close": "75.5600",
                  "5. volume": "5208536"
              },
              "2024-02-27": {
                  "1. open": "77.5600",
                  "2. high": "77.6300",
                  "3. low": "75.9000",
                  "4. close": "76.6300",
                  "5. volume": "7449297"
              },
              "2024-02-26": {
                  "1. open": "76.3100",
                  "2. high": "78.2500",
                  "3. low": "76.2100",
                  "4. close": "77.5600",
                  "5. volume": "8935157"
              },
              "2024-02-23": {
                  "1. open": "75.0500",
                  "2. high": "76.8000",
                  "3. low": "73.8500",
                  "4. close": "76.2400",
                  "5. volume": "10235565"
              },
              "2024-02-22": {
                  "1. open": "78.2800",
                  "2. high": "78.8300",
                  "3. low": "74.8700",
                  "4. close": "75.0300",
                  "5. volume": "11326774"
              },
              "2024-02-21": {
                  "1. open": "77.0000",
                  "2. high": "78.0600",
                  "3. low": "74.6702",
                  "4. close": "75.5900",
                  "5. volume": "10553404"
              },
              "2024-02-20": {
                  "1. open": "79.9500",
                  "2. high": "80.5800",
                  "3. low": "77.7200",
                  "4. close": "78.6200",
                  "5. volume": "10349288"
              },
              "2024-02-16": {
                  "1. open": "82.2500",
                  "2. high": "83.6700",
                  "3. low": "80.3500",
                  "4. close": "81.2900",
                  "5. volume": "13711902"
              },
              "2024-02-15": {
                  "1. open": "80.2400",
                  "2. high": "84.0500",
                  "3. low": "79.6000",
                  "4. close": "84.0000",
                  "5. volume": "15483180"
              },
              "2024-02-14": {
                  "1. open": "79.1100",
                  "2. high": "80.7000",
                  "3. low": "77.4800",
                  "4. close": "80.6700",
                  "5. volume": "18016714"
              },
              "2024-02-13": {
                  "1. open": "77.8000",
                  "2. high": "83.4900",
                  "3. low": "77.0100",
                  "4. close": "77.1800",
                  "5. volume": "40164862"
              },
              "2024-02-12": {
                  "1. open": "91.4000",
                  "2. high": "91.5700",
                  "3. low": "88.9800",
                  "4. close": "89.1200",
                  "5. volume": "17188824"
              },
              "2024-02-09": {
                  "1. open": "90.0000",
                  "2. high": "91.2100",
                  "3. low": "88.9200",
                  "4. close": "90.7200",
                  "5. volume": "11356926"
              },
              "2024-02-08": {
                  "1. open": "85.0300",
                  "2. high": "91.4400",
                  "3. low": "84.9000",
                  "4. close": "87.8700",
                  "5. volume": "20834827"
              },
              "2024-02-07": {
                  "1. open": "82.1000",
                  "2. high": "85.4600",
                  "3. low": "81.8000",
                  "4. close": "85.1700",
                  "5. volume": "13242633"
              },
              "2024-02-06": {
                  "1. open": "81.4000",
                  "2. high": "82.0380",
                  "3. low": "79.7700",
                  "4. close": "81.5600",
                  "5. volume": "5563356"
              },
              "2024-02-05": {
                  "1. open": "82.4400",
                  "2. high": "82.8000",
                  "3. low": "80.0300",
                  "4. close": "81.4000",
                  "5. volume": "8558325"
              },
              "2024-02-02": {
                  "1. open": "81.0000",
                  "2. high": "83.0300",
                  "3. low": "79.3300",
                  "4. close": "82.9300",
                  "5. volume": "17659228"
              },
              "2024-02-01": {
                  "1. open": "79.3700",
                  "2. high": "79.5800",
                  "3. low": "75.8200",
                  "4. close": "76.7200",
                  "5. volume": "14190042"
              },
              "2024-01-31": {
                  "1. open": "81.3000",
                  "2. high": "82.2200",
                  "3. low": "79.9600",
                  "4. close": "80.0700",
                  "5. volume": "6749734"
              },
              "2024-01-30": {
                  "1. open": "82.7800",
                  "2. high": "83.2496",
                  "3. low": "81.6800",
                  "4. close": "82.3300",
                  "5. volume": "5528977"
              },
              "2024-01-29": {
                  "1. open": "81.7400",
                  "2. high": "83.5750",
                  "3. low": "81.4700",
                  "4. close": "83.5400",
                  "5. volume": "6478990"
              },
              "2024-01-26": {
                  "1. open": "80.5100",
                  "2. high": "82.8400",
                  "3. low": "80.4750",
                  "4. close": "81.5500",
                  "5. volume": "6839166"
              },
              "2024-01-25": {
                  "1. open": "81.2700",
                  "2. high": "81.7000",
                  "3. low": "79.1400",
                  "4. close": "80.4900",
                  "5. volume": "6926814"
              },
              "2024-01-24": {
                  "1. open": "82.2800",
                  "2. high": "83.3600",
                  "3. low": "80.6700",
                  "4. close": "80.7300",
                  "5. volume": "7641757"
              },
              "2024-01-23": {
                  "1. open": "80.7000",
                  "2. high": "81.6200",
                  "3. low": "79.5300",
                  "4. close": "81.1400",
                  "5. volume": "5700500"
              },
              "2024-01-22": {
                  "1. open": "80.9100",
                  "2. high": "82.8300",
                  "3. low": "79.6900",
                  "4. close": "80.2600",
                  "5. volume": "9011689"
              },
              "2024-01-19": {
                  "1. open": "77.3100",
                  "2. high": "80.1780",
                  "3. low": "76.3100",
                  "4. close": "80.0100",
                  "5. volume": "10263810"
              },
              "2024-01-18": {
                  "1. open": "80.0000",
                  "2. high": "81.0100",
                  "3. low": "77.2100",
                  "4. close": "77.5200",
                  "5. volume": "11221153"
              },
              "2024-01-17": {
                  "1. open": "80.0300",
                  "2. high": "80.4400",
                  "3. low": "77.5300",
                  "4. close": "80.3200",
                  "5. volume": "15898412"
              },
              "2024-01-16": {
                  "1. open": "80.2800",
                  "2. high": "82.1400",
                  "3. low": "79.6200",
                  "4. close": "81.3200",
                  "5. volume": "11659684"
              },
              "2024-01-12": {
                  "1. open": "81.1100",
                  "2. high": "83.1900",
                  "3. low": "81.0000",
                  "4. close": "81.4000",
                  "5. volume": "9264908"
              },
              "2024-01-11": {
                  "1. open": "81.1500",
                  "2. high": "82.6500",
                  "3. low": "79.1300",
                  "4. close": "81.3000",
                  "5. volume": "10641163"
              },
              "2024-01-10": {
                  "1. open": "80.6900",
                  "2. high": "81.3000",
                  "3. low": "79.3710",
                  "4. close": "81.1000",
                  "5. volume": "9866725"
              },
              "2024-01-09": {
                  "1. open": "77.2500",
                  "2. high": "80.2400",
                  "3. low": "76.9200",
                  "4. close": "80.1100",
                  "5. volume": "10835013"
              },
              "2024-01-08": {
                  "1. open": "74.7800",
                  "2. high": "77.9000",
                  "3. low": "74.7200",
                  "4. close": "77.6900",
                  "5. volume": "8231984"
              },
              "2024-01-05": {
                  "1. open": "73.3200",
                  "2. high": "75.9467",
                  "3. low": "73.0000",
                  "4. close": "74.5100",
                  "5. volume": "9759559"
              },
              "2024-01-04": {
                  "1. open": "71.6300",
                  "2. high": "74.0200",
                  "3. low": "70.6150",
                  "4. close": "73.4200",
                  "5. volume": "11927380"
              },
              "2024-01-03": {
                  "1. open": "72.0800",
                  "2. high": "72.9899",
                  "3. low": "71.1800",
                  "4. close": "71.8200",
                  "5. volume": "9649943"
              },
              "2024-01-02": {
                  "1. open": "76.4400",
                  "2. high": "76.6300",
                  "3. low": "72.9101",
                  "4. close": "73.8300",
                  "5. volume": "13134768"
              },
              "2023-12-29": {
                  "1. open": "79.1200",
                  "2. high": "79.7296",
                  "3. low": "77.2500",
                  "4. close": "77.9000",
                  "5. volume": "9527249"
              },
              "2023-12-28": {
                  "1. open": "78.2900",
                  "2. high": "79.2000",
                  "3. low": "77.4800",
                  "4. close": "79.1100",
                  "5. volume": "7608364"
              },
              "2023-12-27": {
                  "1. open": "78.1900",
                  "2. high": "78.6800",
                  "3. low": "77.3400",
                  "4. close": "78.3400",
                  "5. volume": "6028175"
              },
              "2023-12-26": {
                  "1. open": "76.8300",
                  "2. high": "78.4650",
                  "3. low": "76.4400",
                  "4. close": "78.2100",
                  "5. volume": "5251790"
              },
              "2023-12-22": {
                  "1. open": "76.4500",
                  "2. high": "77.1700",
                  "3. low": "76.1550",
                  "4. close": "76.8300",
                  "5. volume": "6078077"
              },
              "2023-12-21": {
                  "1. open": "76.7000",
                  "2. high": "77.3000",
                  "3. low": "75.5000",
                  "4. close": "76.1400",
                  "5. volume": "7496327"
              },
              "2023-12-20": {
                  "1. open": "78.1000",
                  "2. high": "78.7000",
                  "3. low": "75.1500",
                  "4. close": "75.4200",
                  "5. volume": "9983333"
              },
              "2023-12-19": {
                  "1. open": "77.2000",
                  "2. high": "79.9900",
                  "3. low": "77.1800",
                  "4. close": "78.3500",
                  "5. volume": "12422911"
              },
              "2023-12-18": {
                  "1. open": "75.7500",
                  "2. high": "77.4700",
                  "3. low": "75.6300",
                  "4. close": "77.1300",
                  "5. volume": "9501628"
              },
              "2023-12-15": {
                  "1. open": "77.7100",
                  "2. high": "77.9500",
                  "3. low": "76.3500",
                  "4. close": "76.8200",
                  "5. volume": "10430262"
              },
              "2023-12-14": {
                  "1. open": "75.3100",
                  "2. high": "77.6400",
                  "3. low": "74.8500",
                  "4. close": "77.5400",
                  "5. volume": "13242150"
              },
              "2023-12-13": {
                  "1. open": "72.5300",
                  "2. high": "74.0900",
                  "3. low": "71.1500",
                  "4. close": "73.8600",
                  "5. volume": "10910200"
              },
              "2023-12-12": {
                  "1. open": "72.0000",
                  "2. high": "72.6250",
                  "3. low": "71.0700",
                  "4. close": "72.5000",
                  "5. volume": "6415940"
              },
              "2023-12-11": {
                  "1. open": "72.4300",
                  "2. high": "73.6250",
                  "3. low": "72.1800",
                  "4. close": "72.8100",
                  "5. volume": "7101383"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "TREE",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "51.0000",
                  "2. high": "51.7200",
                  "3. low": "48.8930",
                  "4. close": "49.4100",
                  "5. volume": "238738"
              },
              "2024-05-02": {
                  "1. open": "49.2400",
                  "2. high": "50.1943",
                  "3. low": "47.0600",
                  "4. close": "49.3300",
                  "5. volume": "399245"
              },
              "2024-05-01": {
                  "1. open": "48.5000",
                  "2. high": "49.6179",
                  "3. low": "46.4565",
                  "4. close": "47.8900",
                  "5. volume": "384817"
              },
              "2024-04-30": {
                  "1. open": "43.0000",
                  "2. high": "49.6290",
                  "3. low": "41.6924",
                  "4. close": "48.2700",
                  "5. volume": "1461272"
              },
              "2024-04-29": {
                  "1. open": "38.2200",
                  "2. high": "38.5150",
                  "3. low": "36.2900",
                  "4. close": "37.3500",
                  "5. volume": "213970"
              },
              "2024-04-26": {
                  "1. open": "36.6900",
                  "2. high": "38.0000",
                  "3. low": "36.0501",
                  "4. close": "37.9000",
                  "5. volume": "113252"
              },
              "2024-04-25": {
                  "1. open": "36.3700",
                  "2. high": "36.5900",
                  "3. low": "35.1100",
                  "4. close": "36.4300",
                  "5. volume": "131892"
              },
              "2024-04-24": {
                  "1. open": "36.7400",
                  "2. high": "37.7100",
                  "3. low": "36.5900",
                  "4. close": "37.4900",
                  "5. volume": "187853"
              },
              "2024-04-23": {
                  "1. open": "35.4700",
                  "2. high": "37.9500",
                  "3. low": "35.0000",
                  "4. close": "37.3900",
                  "5. volume": "151699"
              },
              "2024-04-22": {
                  "1. open": "34.5600",
                  "2. high": "35.6600",
                  "3. low": "34.0750",
                  "4. close": "35.5300",
                  "5. volume": "176438"
              },
              "2024-04-19": {
                  "1. open": "34.0500",
                  "2. high": "35.2899",
                  "3. low": "33.5800",
                  "4. close": "34.1300",
                  "5. volume": "174928"
              },
              "2024-04-18": {
                  "1. open": "34.6600",
                  "2. high": "35.3100",
                  "3. low": "34.0101",
                  "4. close": "34.2800",
                  "5. volume": "131657"
              },
              "2024-04-17": {
                  "1. open": "35.4100",
                  "2. high": "35.5600",
                  "3. low": "34.0523",
                  "4. close": "34.4700",
                  "5. volume": "174947"
              },
              "2024-04-16": {
                  "1. open": "34.6600",
                  "2. high": "35.1950",
                  "3. low": "34.0200",
                  "4. close": "34.8500",
                  "5. volume": "160061"
              },
              "2024-04-15": {
                  "1. open": "37.7100",
                  "2. high": "38.0000",
                  "3. low": "34.8200",
                  "4. close": "35.3000",
                  "5. volume": "264447"
              },
              "2024-04-12": {
                  "1. open": "38.8100",
                  "2. high": "39.1465",
                  "3. low": "37.0600",
                  "4. close": "37.6300",
                  "5. volume": "113050"
              },
              "2024-04-11": {
                  "1. open": "39.3800",
                  "2. high": "39.5200",
                  "3. low": "37.8600",
                  "4. close": "39.2500",
                  "5. volume": "140941"
              },
              "2024-04-10": {
                  "1. open": "38.2700",
                  "2. high": "40.7200",
                  "3. low": "38.0700",
                  "4. close": "38.7400",
                  "5. volume": "269089"
              },
              "2024-04-09": {
                  "1. open": "41.3800",
                  "2. high": "41.9450",
                  "3. low": "40.3300",
                  "4. close": "41.0800",
                  "5. volume": "156220"
              },
              "2024-04-08": {
                  "1. open": "39.9600",
                  "2. high": "41.4600",
                  "3. low": "39.2624",
                  "4. close": "41.0600",
                  "5. volume": "131425"
              },
              "2024-04-05": {
                  "1. open": "38.1300",
                  "2. high": "39.6500",
                  "3. low": "38.1300",
                  "4. close": "39.4400",
                  "5. volume": "135027"
              },
              "2024-04-04": {
                  "1. open": "41.6100",
                  "2. high": "41.9100",
                  "3. low": "38.8200",
                  "4. close": "38.9400",
                  "5. volume": "134692"
              },
              "2024-04-03": {
                  "1. open": "39.2000",
                  "2. high": "40.7925",
                  "3. low": "38.6700",
                  "4. close": "40.5200",
                  "5. volume": "214138"
              },
              "2024-04-02": {
                  "1. open": "38.5800",
                  "2. high": "40.0000",
                  "3. low": "37.2801",
                  "4. close": "39.6700",
                  "5. volume": "386567"
              },
              "2024-04-01": {
                  "1. open": "42.1600",
                  "2. high": "42.5500",
                  "3. low": "41.3000",
                  "4. close": "41.6900",
                  "5. volume": "173639"
              },
              "2024-03-28": {
                  "1. open": "42.0900",
                  "2. high": "43.4700",
                  "3. low": "41.8400",
                  "4. close": "42.3400",
                  "5. volume": "272648"
              },
              "2024-03-27": {
                  "1. open": "40.7300",
                  "2. high": "41.7850",
                  "3. low": "40.3800",
                  "4. close": "40.9800",
                  "5. volume": "103554"
              },
              "2024-03-26": {
                  "1. open": "40.8700",
                  "2. high": "41.2100",
                  "3. low": "39.8000",
                  "4. close": "39.9900",
                  "5. volume": "107708"
              },
              "2024-03-25": {
                  "1. open": "41.6900",
                  "2. high": "42.6599",
                  "3. low": "40.4600",
                  "4. close": "40.8200",
                  "5. volume": "123672"
              },
              "2024-03-22": {
                  "1. open": "43.1500",
                  "2. high": "43.3507",
                  "3. low": "41.3000",
                  "4. close": "41.3200",
                  "5. volume": "137598"
              },
              "2024-03-21": {
                  "1. open": "41.7600",
                  "2. high": "44.3000",
                  "3. low": "41.4650",
                  "4. close": "43.3400",
                  "5. volume": "344327"
              },
              "2024-03-20": {
                  "1. open": "37.0000",
                  "2. high": "41.1100",
                  "3. low": "37.0000",
                  "4. close": "40.8600",
                  "5. volume": "210157"
              },
              "2024-03-19": {
                  "1. open": "36.0400",
                  "2. high": "37.9700",
                  "3. low": "35.7200",
                  "4. close": "37.3900",
                  "5. volume": "160569"
              },
              "2024-03-18": {
                  "1. open": "37.8800",
                  "2. high": "38.0200",
                  "3. low": "36.2401",
                  "4. close": "36.4600",
                  "5. volume": "262541"
              },
              "2024-03-15": {
                  "1. open": "38.2000",
                  "2. high": "39.5300",
                  "3. low": "37.5500",
                  "4. close": "37.9300",
                  "5. volume": "506744"
              },
              "2024-03-14": {
                  "1. open": "40.9200",
                  "2. high": "41.1400",
                  "3. low": "37.7400",
                  "4. close": "38.4900",
                  "5. volume": "345578"
              },
              "2024-03-13": {
                  "1. open": "42.1200",
                  "2. high": "44.5100",
                  "3. low": "40.9500",
                  "4. close": "41.3200",
                  "5. volume": "228647"
              },
              "2024-03-12": {
                  "1. open": "40.6100",
                  "2. high": "41.3900",
                  "3. low": "39.3534",
                  "4. close": "41.2600",
                  "5. volume": "166319"
              },
              "2024-03-11": {
                  "1. open": "41.1900",
                  "2. high": "41.7900",
                  "3. low": "39.1900",
                  "4. close": "40.4100",
                  "5. volume": "321288"
              },
              "2024-03-08": {
                  "1. open": "40.2500",
                  "2. high": "42.5116",
                  "3. low": "40.2500",
                  "4. close": "41.6250",
                  "5. volume": "294771"
              },
              "2024-03-07": {
                  "1. open": "39.8400",
                  "2. high": "40.6500",
                  "3. low": "38.7500",
                  "4. close": "40.2200",
                  "5. volume": "190757"
              },
              "2024-03-06": {
                  "1. open": "41.0000",
                  "2. high": "41.0000",
                  "3. low": "38.8900",
                  "4. close": "39.1000",
                  "5. volume": "258844"
              },
              "2024-03-05": {
                  "1. open": "38.7900",
                  "2. high": "40.4635",
                  "3. low": "38.5950",
                  "4. close": "40.2600",
                  "5. volume": "292683"
              },
              "2024-03-04": {
                  "1. open": "40.9000",
                  "2. high": "41.3500",
                  "3. low": "39.3900",
                  "4. close": "39.8500",
                  "5. volume": "308364"
              },
              "2024-03-01": {
                  "1. open": "40.0200",
                  "2. high": "40.5943",
                  "3. low": "37.6000",
                  "4. close": "39.9800",
                  "5. volume": "371322"
              },
              "2024-02-29": {
                  "1. open": "35.5900",
                  "2. high": "39.9700",
                  "3. low": "35.5900",
                  "4. close": "39.5700",
                  "5. volume": "803126"
              },
              "2024-02-28": {
                  "1. open": "33.5000",
                  "2. high": "37.2366",
                  "3. low": "33.0000",
                  "4. close": "35.3700",
                  "5. volume": "669320"
              },
              "2024-02-27": {
                  "1. open": "34.5600",
                  "2. high": "34.7400",
                  "3. low": "28.5000",
                  "4. close": "32.6200",
                  "5. volume": "679222"
              },
              "2024-02-26": {
                  "1. open": "33.9100",
                  "2. high": "34.9200",
                  "3. low": "33.5410",
                  "4. close": "34.2800",
                  "5. volume": "328008"
              },
              "2024-02-23": {
                  "1. open": "34.6100",
                  "2. high": "34.7450",
                  "3. low": "33.7700",
                  "4. close": "34.0900",
                  "5. volume": "160508"
              },
              "2024-02-22": {
                  "1. open": "35.2000",
                  "2. high": "36.7600",
                  "3. low": "33.8800",
                  "4. close": "34.5300",
                  "5. volume": "278333"
              },
              "2024-02-21": {
                  "1. open": "34.2600",
                  "2. high": "35.0500",
                  "3. low": "33.4300",
                  "4. close": "35.0200",
                  "5. volume": "350572"
              },
              "2024-02-20": {
                  "1. open": "35.2500",
                  "2. high": "35.2600",
                  "3. low": "34.0200",
                  "4. close": "34.2600",
                  "5. volume": "188375"
              },
              "2024-02-16": {
                  "1. open": "36.0000",
                  "2. high": "36.7000",
                  "3. low": "35.5100",
                  "4. close": "36.1100",
                  "5. volume": "228863"
              },
              "2024-02-15": {
                  "1. open": "36.0100",
                  "2. high": "36.9900",
                  "3. low": "35.4700",
                  "4. close": "36.5600",
                  "5. volume": "229638"
              },
              "2024-02-14": {
                  "1. open": "35.8100",
                  "2. high": "36.3500",
                  "3. low": "35.3600",
                  "4. close": "35.6000",
                  "5. volume": "194853"
              },
              "2024-02-13": {
                  "1. open": "34.5000",
                  "2. high": "35.0900",
                  "3. low": "32.6400",
                  "4. close": "34.5500",
                  "5. volume": "334241"
              },
              "2024-02-12": {
                  "1. open": "36.0800",
                  "2. high": "38.0044",
                  "3. low": "36.0800",
                  "4. close": "36.6900",
                  "5. volume": "204014"
              },
              "2024-02-09": {
                  "1. open": "34.4500",
                  "2. high": "36.6800",
                  "3. low": "34.0500",
                  "4. close": "35.9600",
                  "5. volume": "295815"
              },
              "2024-02-08": {
                  "1. open": "31.2200",
                  "2. high": "34.1700",
                  "3. low": "30.9250",
                  "4. close": "34.1200",
                  "5. volume": "300505"
              },
              "2024-02-07": {
                  "1. open": "30.4900",
                  "2. high": "31.5996",
                  "3. low": "28.8807",
                  "4. close": "30.9100",
                  "5. volume": "266542"
              },
              "2024-02-06": {
                  "1. open": "29.3000",
                  "2. high": "30.6400",
                  "3. low": "29.3000",
                  "4. close": "30.1000",
                  "5. volume": "262408"
              },
              "2024-02-05": {
                  "1. open": "30.8400",
                  "2. high": "31.1861",
                  "3. low": "29.5000",
                  "4. close": "29.6600",
                  "5. volume": "408894"
              },
              "2024-02-02": {
                  "1. open": "32.3000",
                  "2. high": "33.2299",
                  "3. low": "31.6000",
                  "4. close": "31.6600",
                  "5. volume": "227215"
              },
              "2024-02-01": {
                  "1. open": "32.7700",
                  "2. high": "33.7911",
                  "3. low": "30.6900",
                  "4. close": "33.4300",
                  "5. volume": "303757"
              },
              "2024-01-31": {
                  "1. open": "33.0700",
                  "2. high": "35.5500",
                  "3. low": "32.3000",
                  "4. close": "32.3400",
                  "5. volume": "319288"
              },
              "2024-01-30": {
                  "1. open": "34.4100",
                  "2. high": "34.9700",
                  "3. low": "33.7900",
                  "4. close": "33.8300",
                  "5. volume": "210120"
              },
              "2024-01-29": {
                  "1. open": "33.9800",
                  "2. high": "35.1290",
                  "3. low": "33.2300",
                  "4. close": "34.4900",
                  "5. volume": "227620"
              },
              "2024-01-26": {
                  "1. open": "33.6900",
                  "2. high": "34.8900",
                  "3. low": "33.3900",
                  "4. close": "33.6200",
                  "5. volume": "237756"
              },
              "2024-01-25": {
                  "1. open": "34.1100",
                  "2. high": "35.0700",
                  "3. low": "33.1020",
                  "4. close": "33.4000",
                  "5. volume": "311443"
              },
              "2024-01-24": {
                  "1. open": "31.9000",
                  "2. high": "33.6400",
                  "3. low": "31.2800",
                  "4. close": "33.3200",
                  "5. volume": "466559"
              },
              "2024-01-23": {
                  "1. open": "32.0300",
                  "2. high": "32.0300",
                  "3. low": "30.2500",
                  "4. close": "30.9100",
                  "5. volume": "360528"
              },
              "2024-01-22": {
                  "1. open": "28.3100",
                  "2. high": "30.9799",
                  "3. low": "28.2801",
                  "4. close": "30.8800",
                  "5. volume": "288769"
              },
              "2024-01-19": {
                  "1. open": "26.2900",
                  "2. high": "27.8600",
                  "3. low": "25.3850",
                  "4. close": "27.6600",
                  "5. volume": "269721"
              },
              "2024-01-18": {
                  "1. open": "26.4800",
                  "2. high": "26.7140",
                  "3. low": "25.2313",
                  "4. close": "26.0900",
                  "5. volume": "319179"
              },
              "2024-01-17": {
                  "1. open": "27.1300",
                  "2. high": "28.1100",
                  "3. low": "24.5500",
                  "4. close": "25.9700",
                  "5. volume": "599210"
              },
              "2024-01-16": {
                  "1. open": "27.6300",
                  "2. high": "28.4400",
                  "3. low": "27.0300",
                  "4. close": "28.3900",
                  "5. volume": "511474"
              },
              "2024-01-12": {
                  "1. open": "29.4400",
                  "2. high": "29.4400",
                  "3. low": "28.1800",
                  "4. close": "28.6200",
                  "5. volume": "330325"
              },
              "2024-01-11": {
                  "1. open": "32.1000",
                  "2. high": "32.9300",
                  "3. low": "28.8800",
                  "4. close": "28.9900",
                  "5. volume": "637668"
              },
              "2024-01-10": {
                  "1. open": "33.6500",
                  "2. high": "34.3700",
                  "3. low": "32.1900",
                  "4. close": "32.4200",
                  "5. volume": "287897"
              },
              "2024-01-09": {
                  "1. open": "34.5500",
                  "2. high": "35.9650",
                  "3. low": "33.6018",
                  "4. close": "33.6800",
                  "5. volume": "581436"
              },
              "2024-01-08": {
                  "1. open": "30.0000",
                  "2. high": "35.0600",
                  "3. low": "29.8800",
                  "4. close": "34.8700",
                  "5. volume": "907020"
              },
              "2024-01-05": {
                  "1. open": "28.8000",
                  "2. high": "30.2700",
                  "3. low": "28.5200",
                  "4. close": "28.5500",
                  "5. volume": "237732"
              },
              "2024-01-04": {
                  "1. open": "28.5300",
                  "2. high": "30.5600",
                  "3. low": "28.3528",
                  "4. close": "29.4700",
                  "5. volume": "264263"
              },
              "2024-01-03": {
                  "1. open": "28.2000",
                  "2. high": "28.9800",
                  "3. low": "27.5600",
                  "4. close": "28.6300",
                  "5. volume": "310778"
              },
              "2024-01-02": {
                  "1. open": "29.3100",
                  "2. high": "30.8500",
                  "3. low": "28.9900",
                  "4. close": "29.4100",
                  "5. volume": "354277"
              },
              "2023-12-29": {
                  "1. open": "31.2000",
                  "2. high": "31.5399",
                  "3. low": "30.0901",
                  "4. close": "30.3200",
                  "5. volume": "379821"
              },
              "2023-12-28": {
                  "1. open": "31.3500",
                  "2. high": "31.8600",
                  "3. low": "31.0300",
                  "4. close": "31.2450",
                  "5. volume": "132225"
              },
              "2023-12-27": {
                  "1. open": "31.7400",
                  "2. high": "31.9400",
                  "3. low": "30.8567",
                  "4. close": "31.4900",
                  "5. volume": "174258"
              },
              "2023-12-26": {
                  "1. open": "31.0700",
                  "2. high": "31.9800",
                  "3. low": "30.7700",
                  "4. close": "31.3800",
                  "5. volume": "171175"
              },
              "2023-12-22": {
                  "1. open": "31.0500",
                  "2. high": "31.4200",
                  "3. low": "29.8600",
                  "4. close": "31.1700",
                  "5. volume": "410309"
              },
              "2023-12-21": {
                  "1. open": "29.8400",
                  "2. high": "31.1442",
                  "3. low": "29.4500",
                  "4. close": "30.5600",
                  "5. volume": "338465"
              },
              "2023-12-20": {
                  "1. open": "30.7900",
                  "2. high": "31.9700",
                  "3. low": "28.8100",
                  "4. close": "28.9000",
                  "5. volume": "516718"
              },
              "2023-12-19": {
                  "1. open": "30.5000",
                  "2. high": "31.9000",
                  "3. low": "29.7300",
                  "4. close": "30.9200",
                  "5. volume": "478242"
              },
              "2023-12-18": {
                  "1. open": "29.6600",
                  "2. high": "30.7199",
                  "3. low": "28.9100",
                  "4. close": "30.0600",
                  "5. volume": "464367"
              },
              "2023-12-15": {
                  "1. open": "29.0000",
                  "2. high": "30.4100",
                  "3. low": "28.1300",
                  "4. close": "29.6600",
                  "5. volume": "639434"
              },
              "2023-12-14": {
                  "1. open": "27.3800",
                  "2. high": "29.8650",
                  "3. low": "27.3800",
                  "4. close": "28.7000",
                  "5. volume": "830531"
              },
              "2023-12-13": {
                  "1. open": "23.3100",
                  "2. high": "26.8200",
                  "3. low": "23.0500",
                  "4. close": "26.5700",
                  "5. volume": "510633"
              },
              "2023-12-12": {
                  "1. open": "23.1000",
                  "2. high": "23.6700",
                  "3. low": "22.2500",
                  "4. close": "23.0400",
                  "5. volume": "241228"
              },
              "2023-12-11": {
                  "1. open": "23.6700",
                  "2. high": "23.8200",
                  "3. low": "22.7450",
                  "4. close": "23.3100",
                  "5. volume": "362709"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "VEL",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "17.6800",
                  "2. high": "18.0000",
                  "3. low": "16.9670",
                  "4. close": "17.3300",
                  "5. volume": "26304"
              },
              "2024-05-02": {
                  "1. open": "17.3000",
                  "2. high": "17.4200",
                  "3. low": "16.3400",
                  "4. close": "17.3400",
                  "5. volume": "20623"
              },
              "2024-05-01": {
                  "1. open": "17.3873",
                  "2. high": "17.4500",
                  "3. low": "17.1200",
                  "4. close": "17.1500",
                  "5. volume": "8435"
              },
              "2024-04-30": {
                  "1. open": "16.8600",
                  "2. high": "17.2500",
                  "3. low": "16.2450",
                  "4. close": "17.1500",
                  "5. volume": "28989"
              },
              "2024-04-29": {
                  "1. open": "16.8000",
                  "2. high": "17.3980",
                  "3. low": "16.7300",
                  "4. close": "16.7300",
                  "5. volume": "12594"
              },
              "2024-04-26": {
                  "1. open": "16.7400",
                  "2. high": "17.1850",
                  "3. low": "16.7400",
                  "4. close": "17.0100",
                  "5. volume": "8296"
              },
              "2024-04-25": {
                  "1. open": "17.0000",
                  "2. high": "17.0000",
                  "3. low": "16.7700",
                  "4. close": "16.8700",
                  "5. volume": "10696"
              },
              "2024-04-24": {
                  "1. open": "17.0100",
                  "2. high": "17.4700",
                  "3. low": "16.7900",
                  "4. close": "16.8700",
                  "5. volume": "13853"
              },
              "2024-04-23": {
                  "1. open": "17.0000",
                  "2. high": "17.1900",
                  "3. low": "16.6200",
                  "4. close": "17.1400",
                  "5. volume": "12516"
              },
              "2024-04-22": {
                  "1. open": "16.8600",
                  "2. high": "17.0000",
                  "3. low": "15.9600",
                  "4. close": "16.7600",
                  "5. volume": "36708"
              },
              "2024-04-19": {
                  "1. open": "15.9300",
                  "2. high": "16.8300",
                  "3. low": "15.9300",
                  "4. close": "16.6300",
                  "5. volume": "25920"
              },
              "2024-04-18": {
                  "1. open": "16.3850",
                  "2. high": "16.3850",
                  "3. low": "16.0000",
                  "4. close": "16.0600",
                  "5. volume": "17609"
              },
              "2024-04-17": {
                  "1. open": "16.4600",
                  "2. high": "16.4600",
                  "3. low": "15.7000",
                  "4. close": "16.1100",
                  "5. volume": "9190"
              },
              "2024-04-16": {
                  "1. open": "16.0400",
                  "2. high": "16.3000",
                  "3. low": "16.0400",
                  "4. close": "16.3000",
                  "5. volume": "9470"
              },
              "2024-04-15": {
                  "1. open": "16.3700",
                  "2. high": "17.0100",
                  "3. low": "16.1442",
                  "4. close": "16.2400",
                  "5. volume": "10742"
              },
              "2024-04-12": {
                  "1. open": "16.1900",
                  "2. high": "16.6830",
                  "3. low": "15.9700",
                  "4. close": "16.4800",
                  "5. volume": "16233"
              },
              "2024-04-11": {
                  "1. open": "15.9600",
                  "2. high": "16.5000",
                  "3. low": "15.8500",
                  "4. close": "16.2200",
                  "5. volume": "26826"
              },
              "2024-04-10": {
                  "1. open": "16.7100",
                  "2. high": "16.8150",
                  "3. low": "15.6900",
                  "4. close": "16.2200",
                  "5. volume": "64167"
              },
              "2024-04-09": {
                  "1. open": "17.3400",
                  "2. high": "17.4200",
                  "3. low": "16.8000",
                  "4. close": "16.9500",
                  "5. volume": "24167"
              },
              "2024-04-08": {
                  "1. open": "17.2800",
                  "2. high": "17.2800",
                  "3. low": "16.7500",
                  "4. close": "17.1400",
                  "5. volume": "17885"
              },
              "2024-04-05": {
                  "1. open": "16.5800",
                  "2. high": "17.0100",
                  "3. low": "16.5400",
                  "4. close": "16.8200",
                  "5. volume": "16070"
              },
              "2024-04-04": {
                  "1. open": "16.9600",
                  "2. high": "17.5900",
                  "3. low": "16.6200",
                  "4. close": "17.0600",
                  "5. volume": "41050"
              },
              "2024-04-03": {
                  "1. open": "17.5900",
                  "2. high": "17.8600",
                  "3. low": "16.9061",
                  "4. close": "17.2300",
                  "5. volume": "18260"
              },
              "2024-04-02": {
                  "1. open": "17.5000",
                  "2. high": "17.5700",
                  "3. low": "16.8400",
                  "4. close": "17.5700",
                  "5. volume": "14962"
              },
              "2024-04-01": {
                  "1. open": "18.7600",
                  "2. high": "18.7600",
                  "3. low": "16.9600",
                  "4. close": "17.5000",
                  "5. volume": "19205"
              },
              "2024-03-28": {
                  "1. open": "18.1500",
                  "2. high": "18.4700",
                  "3. low": "17.8900",
                  "4. close": "18.0000",
                  "5. volume": "36251"
              },
              "2024-03-27": {
                  "1. open": "18.3900",
                  "2. high": "18.8200",
                  "3. low": "17.9595",
                  "4. close": "18.2300",
                  "5. volume": "21283"
              },
              "2024-03-26": {
                  "1. open": "17.5800",
                  "2. high": "18.4000",
                  "3. low": "17.5800",
                  "4. close": "18.1900",
                  "5. volume": "9743"
              },
              "2024-03-25": {
                  "1. open": "18.2700",
                  "2. high": "18.2700",
                  "3. low": "16.6100",
                  "4. close": "17.5700",
                  "5. volume": "29402"
              },
              "2024-03-22": {
                  "1. open": "18.5000",
                  "2. high": "19.0800",
                  "3. low": "17.7200",
                  "4. close": "18.0000",
                  "5. volume": "29983"
              },
              "2024-03-21": {
                  "1. open": "17.6400",
                  "2. high": "18.5000",
                  "3. low": "17.5755",
                  "4. close": "18.4900",
                  "5. volume": "18546"
              },
              "2024-03-20": {
                  "1. open": "17.8800",
                  "2. high": "17.8800",
                  "3. low": "17.2200",
                  "4. close": "17.7300",
                  "5. volume": "17709"
              },
              "2024-03-19": {
                  "1. open": "18.1400",
                  "2. high": "18.1400",
                  "3. low": "17.5900",
                  "4. close": "17.6000",
                  "5. volume": "9352"
              },
              "2024-03-18": {
                  "1. open": "17.5000",
                  "2. high": "18.8000",
                  "3. low": "17.1000",
                  "4. close": "18.2400",
                  "5. volume": "37471"
              },
              "2024-03-15": {
                  "1. open": "16.8500",
                  "2. high": "17.5000",
                  "3. low": "16.8500",
                  "4. close": "17.3000",
                  "5. volume": "43310"
              },
              "2024-03-14": {
                  "1. open": "16.7100",
                  "2. high": "17.5000",
                  "3. low": "16.2856",
                  "4. close": "17.2300",
                  "5. volume": "24864"
              },
              "2024-03-13": {
                  "1. open": "16.9900",
                  "2. high": "16.9900",
                  "3. low": "16.8300",
                  "4. close": "16.8300",
                  "5. volume": "6570"
              },
              "2024-03-12": {
                  "1. open": "17.0500",
                  "2. high": "17.5000",
                  "3. low": "16.5650",
                  "4. close": "16.7800",
                  "5. volume": "15245"
              },
              "2024-03-11": {
                  "1. open": "17.0900",
                  "2. high": "17.2010",
                  "3. low": "16.8290",
                  "4. close": "17.0300",
                  "5. volume": "20444"
              },
              "2024-03-08": {
                  "1. open": "17.0000",
                  "2. high": "17.2500",
                  "3. low": "16.4401",
                  "4. close": "16.7300",
                  "5. volume": "48729"
              },
              "2024-03-07": {
                  "1. open": "16.1667",
                  "2. high": "16.4800",
                  "3. low": "16.0300",
                  "4. close": "16.0800",
                  "5. volume": "9437"
              },
              "2024-03-06": {
                  "1. open": "15.8200",
                  "2. high": "16.2399",
                  "3. low": "15.7800",
                  "4. close": "16.0600",
                  "5. volume": "6406"
              },
              "2024-03-05": {
                  "1. open": "16.0000",
                  "2. high": "16.0400",
                  "3. low": "15.6000",
                  "4. close": "16.0100",
                  "5. volume": "10925"
              },
              "2024-03-04": {
                  "1. open": "16.0350",
                  "2. high": "16.2300",
                  "3. low": "15.9200",
                  "4. close": "16.1400",
                  "5. volume": "7596"
              },
              "2024-03-01": {
                  "1. open": "16.0463",
                  "2. high": "16.6000",
                  "3. low": "16.0342",
                  "4. close": "16.2200",
                  "5. volume": "6284"
              },
              "2024-02-29": {
                  "1. open": "16.2400",
                  "2. high": "16.5150",
                  "3. low": "16.0500",
                  "4. close": "16.3500",
                  "5. volume": "17430"
              },
              "2024-02-28": {
                  "1. open": "15.6500",
                  "2. high": "16.5099",
                  "3. low": "15.6500",
                  "4. close": "15.9600",
                  "5. volume": "5640"
              },
              "2024-02-27": {
                  "1. open": "15.9700",
                  "2. high": "16.5622",
                  "3. low": "15.7800",
                  "4. close": "15.9500",
                  "5. volume": "7528"
              },
              "2024-02-26": {
                  "1. open": "16.1700",
                  "2. high": "16.2300",
                  "3. low": "15.6900",
                  "4. close": "16.0400",
                  "5. volume": "5049"
              },
              "2024-02-23": {
                  "1. open": "14.8767",
                  "2. high": "16.8300",
                  "3. low": "14.8767",
                  "4. close": "16.1700",
                  "5. volume": "8961"
              },
              "2024-02-22": {
                  "1. open": "15.5600",
                  "2. high": "15.9500",
                  "3. low": "15.5600",
                  "4. close": "15.7200",
                  "5. volume": "15682"
              },
              "2024-02-21": {
                  "1. open": "15.4500",
                  "2. high": "15.8900",
                  "3. low": "15.4500",
                  "4. close": "15.6600",
                  "5. volume": "8823"
              },
              "2024-02-20": {
                  "1. open": "15.6400",
                  "2. high": "16.2900",
                  "3. low": "15.3400",
                  "4. close": "15.6800",
                  "5. volume": "15350"
              },
              "2024-02-16": {
                  "1. open": "16.6600",
                  "2. high": "16.6600",
                  "3. low": "15.5700",
                  "4. close": "15.9400",
                  "5. volume": "10810"
              },
              "2024-02-15": {
                  "1. open": "15.5276",
                  "2. high": "17.2300",
                  "3. low": "15.5276",
                  "4. close": "16.5700",
                  "5. volume": "18080"
              },
              "2024-02-14": {
                  "1. open": "15.9700",
                  "2. high": "16.1650",
                  "3. low": "15.4200",
                  "4. close": "16.0100",
                  "5. volume": "8077"
              },
              "2024-02-13": {
                  "1. open": "15.3400",
                  "2. high": "15.7800",
                  "3. low": "15.3400",
                  "4. close": "15.6600",
                  "5. volume": "19656"
              },
              "2024-02-12": {
                  "1. open": "16.0000",
                  "2. high": "16.0725",
                  "3. low": "15.6700",
                  "4. close": "15.6700",
                  "5. volume": "23608"
              },
              "2024-02-09": {
                  "1. open": "15.8201",
                  "2. high": "16.1200",
                  "3. low": "15.8200",
                  "4. close": "15.8200",
                  "5. volume": "12284"
              },
              "2024-02-08": {
                  "1. open": "15.8500",
                  "2. high": "15.8622",
                  "3. low": "15.8000",
                  "4. close": "15.8200",
                  "5. volume": "9686"
              },
              "2024-02-07": {
                  "1. open": "15.8300",
                  "2. high": "15.9700",
                  "3. low": "15.7700",
                  "4. close": "15.8300",
                  "5. volume": "7437"
              },
              "2024-02-06": {
                  "1. open": "15.8300",
                  "2. high": "16.1750",
                  "3. low": "15.6500",
                  "4. close": "15.9000",
                  "5. volume": "5400"
              },
              "2024-02-05": {
                  "1. open": "15.3100",
                  "2. high": "16.0100",
                  "3. low": "14.5100",
                  "4. close": "15.8900",
                  "5. volume": "12963"
              },
              "2024-02-02": {
                  "1. open": "15.5700",
                  "2. high": "16.1980",
                  "3. low": "15.4900",
                  "4. close": "15.4900",
                  "5. volume": "12294"
              },
              "2024-02-01": {
                  "1. open": "15.7500",
                  "2. high": "15.9000",
                  "3. low": "15.7215",
                  "4. close": "15.9000",
                  "5. volume": "10845"
              },
              "2024-01-31": {
                  "1. open": "15.9300",
                  "2. high": "16.2805",
                  "3. low": "15.7500",
                  "4. close": "15.7500",
                  "5. volume": "17883"
              },
              "2024-01-30": {
                  "1. open": "16.4500",
                  "2. high": "16.5000",
                  "3. low": "15.7500",
                  "4. close": "15.7600",
                  "5. volume": "13048"
              },
              "2024-01-29": {
                  "1. open": "15.8100",
                  "2. high": "16.1900",
                  "3. low": "15.8100",
                  "4. close": "16.1000",
                  "5. volume": "7778"
              },
              "2024-01-26": {
                  "1. open": "16.2900",
                  "2. high": "16.2900",
                  "3. low": "15.7500",
                  "4. close": "15.9900",
                  "5. volume": "4848"
              },
              "2024-01-25": {
                  "1. open": "16.1400",
                  "2. high": "16.1400",
                  "3. low": "15.8464",
                  "4. close": "16.0200",
                  "5. volume": "6821"
              },
              "2024-01-24": {
                  "1. open": "16.2400",
                  "2. high": "16.2400",
                  "3. low": "15.6500",
                  "4. close": "15.7800",
                  "5. volume": "11140"
              },
              "2024-01-23": {
                  "1. open": "16.1500",
                  "2. high": "16.3900",
                  "3. low": "15.8600",
                  "4. close": "15.8600",
                  "5. volume": "10127"
              },
              "2024-01-22": {
                  "1. open": "16.0300",
                  "2. high": "16.6999",
                  "3. low": "15.6164",
                  "4. close": "15.9900",
                  "5. volume": "19455"
              },
              "2024-01-19": {
                  "1. open": "15.9000",
                  "2. high": "16.0000",
                  "3. low": "15.8700",
                  "4. close": "15.8700",
                  "5. volume": "7933"
              },
              "2024-01-18": {
                  "1. open": "15.9200",
                  "2. high": "16.0000",
                  "3. low": "15.6800",
                  "4. close": "15.6900",
                  "5. volume": "16458"
              },
              "2024-01-17": {
                  "1. open": "15.4700",
                  "2. high": "15.9100",
                  "3. low": "15.4000",
                  "4. close": "15.7000",
                  "5. volume": "9390"
              },
              "2024-01-16": {
                  "1. open": "15.6200",
                  "2. high": "16.2200",
                  "3. low": "15.3200",
                  "4. close": "15.8400",
                  "5. volume": "44737"
              },
              "2024-01-12": {
                  "1. open": "16.1000",
                  "2. high": "16.3500",
                  "3. low": "15.9800",
                  "4. close": "16.0200",
                  "5. volume": "33249"
              },
              "2024-01-11": {
                  "1. open": "16.1860",
                  "2. high": "16.2500",
                  "3. low": "15.6100",
                  "4. close": "15.9600",
                  "5. volume": "14173"
              },
              "2024-01-10": {
                  "1. open": "15.5000",
                  "2. high": "16.2500",
                  "3. low": "15.4400",
                  "4. close": "15.9800",
                  "5. volume": "34137"
              },
              "2024-01-09": {
                  "1. open": "15.1000",
                  "2. high": "16.1900",
                  "3. low": "13.7800",
                  "4. close": "15.7100",
                  "5. volume": "14594"
              },
              "2024-01-08": {
                  "1. open": "15.6800",
                  "2. high": "15.9300",
                  "3. low": "15.3750",
                  "4. close": "15.5300",
                  "5. volume": "16107"
              },
              "2024-01-05": {
                  "1. open": "14.8600",
                  "2. high": "15.6050",
                  "3. low": "14.8600",
                  "4. close": "15.4300",
                  "5. volume": "11470"
              },
              "2024-01-04": {
                  "1. open": "15.7600",
                  "2. high": "15.8400",
                  "3. low": "15.0200",
                  "4. close": "15.0700",
                  "5. volume": "41666"
              },
              "2024-01-03": {
                  "1. open": "15.9200",
                  "2. high": "16.2000",
                  "3. low": "15.2674",
                  "4. close": "15.7300",
                  "5. volume": "21283"
              },
              "2024-01-02": {
                  "1. open": "16.7100",
                  "2. high": "17.2080",
                  "3. low": "16.2200",
                  "4. close": "16.2700",
                  "5. volume": "28232"
              },
              "2023-12-29": {
                  "1. open": "16.7600",
                  "2. high": "17.3000",
                  "3. low": "16.1900",
                  "4. close": "17.2200",
                  "5. volume": "133529"
              },
              "2023-12-28": {
                  "1. open": "16.7900",
                  "2. high": "16.9900",
                  "3. low": "16.4500",
                  "4. close": "16.5300",
                  "5. volume": "15801"
              },
              "2023-12-27": {
                  "1. open": "15.8100",
                  "2. high": "16.7300",
                  "3. low": "15.6213",
                  "4. close": "16.5800",
                  "5. volume": "11181"
              },
              "2023-12-26": {
                  "1. open": "16.3000",
                  "2. high": "16.9000",
                  "3. low": "16.1950",
                  "4. close": "16.4200",
                  "5. volume": "14928"
              },
              "2023-12-22": {
                  "1. open": "16.5000",
                  "2. high": "16.7000",
                  "3. low": "15.8100",
                  "4. close": "15.9900",
                  "5. volume": "14463"
              },
              "2023-12-21": {
                  "1. open": "15.7900",
                  "2. high": "16.5000",
                  "3. low": "15.7400",
                  "4. close": "16.3600",
                  "5. volume": "19472"
              },
              "2023-12-20": {
                  "1. open": "15.7000",
                  "2. high": "16.6980",
                  "3. low": "15.5300",
                  "4. close": "15.8000",
                  "5. volume": "18195"
              },
              "2023-12-19": {
                  "1. open": "15.6400",
                  "2. high": "16.7300",
                  "3. low": "15.6400",
                  "4. close": "16.0000",
                  "5. volume": "27296"
              },
              "2023-12-18": {
                  "1. open": "15.7300",
                  "2. high": "16.1300",
                  "3. low": "15.1812",
                  "4. close": "15.7900",
                  "5. volume": "20858"
              },
              "2023-12-15": {
                  "1. open": "17.0000",
                  "2. high": "17.0000",
                  "3. low": "14.8700",
                  "4. close": "15.8500",
                  "5. volume": "148611"
              },
              "2023-12-14": {
                  "1. open": "16.7100",
                  "2. high": "17.1887",
                  "3. low": "16.2600",
                  "4. close": "16.9400",
                  "5. volume": "84343"
              },
              "2023-12-13": {
                  "1. open": "15.0700",
                  "2. high": "16.6918",
                  "3. low": "15.0700",
                  "4. close": "16.3500",
                  "5. volume": "64889"
              },
              "2023-12-12": {
                  "1. open": "15.2300",
                  "2. high": "16.0200",
                  "3. low": "14.6000",
                  "4. close": "15.1500",
                  "5. volume": "27869"
              },
              "2023-12-11": {
                  "1. open": "14.8600",
                  "2. high": "15.3000",
                  "3. low": "14.1900",
                  "4. close": "15.0000",
                  "5. volume": "28029"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "WHF",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "13.0900",
                  "2. high": "13.1000",
                  "3. low": "12.7900",
                  "4. close": "12.7900",
                  "5. volume": "88773"
              },
              "2024-05-02": {
                  "1. open": "12.9400",
                  "2. high": "13.1000",
                  "3. low": "12.8900",
                  "4. close": "13.0200",
                  "5. volume": "59475"
              },
              "2024-05-01": {
                  "1. open": "12.8400",
                  "2. high": "13.0200",
                  "3. low": "12.8295",
                  "4. close": "12.8700",
                  "5. volume": "96365"
              },
              "2024-04-30": {
                  "1. open": "13.0100",
                  "2. high": "13.0156",
                  "3. low": "12.8100",
                  "4. close": "12.8800",
                  "5. volume": "159857"
              },
              "2024-04-29": {
                  "1. open": "12.9500",
                  "2. high": "13.1000",
                  "3. low": "12.8200",
                  "4. close": "12.9700",
                  "5. volume": "114890"
              },
              "2024-04-26": {
                  "1. open": "12.9700",
                  "2. high": "13.0300",
                  "3. low": "12.8000",
                  "4. close": "12.9000",
                  "5. volume": "52231"
              },
              "2024-04-25": {
                  "1. open": "12.9100",
                  "2. high": "13.1000",
                  "3. low": "12.7840",
                  "4. close": "12.8200",
                  "5. volume": "75129"
              },
              "2024-04-24": {
                  "1. open": "12.6900",
                  "2. high": "13.1200",
                  "3. low": "12.6700",
                  "4. close": "13.0000",
                  "5. volume": "133514"
              },
              "2024-04-23": {
                  "1. open": "12.8700",
                  "2. high": "12.9800",
                  "3. low": "12.6600",
                  "4. close": "12.7600",
                  "5. volume": "103458"
              },
              "2024-04-22": {
                  "1. open": "12.7700",
                  "2. high": "12.9400",
                  "3. low": "12.6700",
                  "4. close": "12.8900",
                  "5. volume": "157908"
              },
              "2024-04-19": {
                  "1. open": "12.5400",
                  "2. high": "12.7900",
                  "3. low": "12.5400",
                  "4. close": "12.6900",
                  "5. volume": "176457"
              },
              "2024-04-18": {
                  "1. open": "12.4100",
                  "2. high": "12.7200",
                  "3. low": "12.3400",
                  "4. close": "12.6200",
                  "5. volume": "172900"
              },
              "2024-04-17": {
                  "1. open": "12.4400",
                  "2. high": "12.5192",
                  "3. low": "12.3300",
                  "4. close": "12.3700",
                  "5. volume": "34920"
              },
              "2024-04-16": {
                  "1. open": "12.4300",
                  "2. high": "12.5500",
                  "3. low": "12.3001",
                  "4. close": "12.4300",
                  "5. volume": "96890"
              },
              "2024-04-15": {
                  "1. open": "12.3900",
                  "2. high": "12.4600",
                  "3. low": "12.2800",
                  "4. close": "12.3900",
                  "5. volume": "115444"
              },
              "2024-04-12": {
                  "1. open": "12.3600",
                  "2. high": "12.4900",
                  "3. low": "12.2100",
                  "4. close": "12.2900",
                  "5. volume": "49738"
              },
              "2024-04-11": {
                  "1. open": "12.3700",
                  "2. high": "12.4500",
                  "3. low": "12.2800",
                  "4. close": "12.4000",
                  "5. volume": "35739"
              },
              "2024-04-10": {
                  "1. open": "12.4600",
                  "2. high": "12.5600",
                  "3. low": "12.2500",
                  "4. close": "12.3100",
                  "5. volume": "67558"
              },
              "2024-04-09": {
                  "1. open": "12.3000",
                  "2. high": "12.5550",
                  "3. low": "12.1900",
                  "4. close": "12.4900",
                  "5. volume": "198821"
              },
              "2024-04-08": {
                  "1. open": "12.3000",
                  "2. high": "12.4400",
                  "3. low": "12.0000",
                  "4. close": "12.3400",
                  "5. volume": "320489"
              },
              "2024-04-05": {
                  "1. open": "12.1700",
                  "2. high": "12.3500",
                  "3. low": "12.1700",
                  "4. close": "12.2700",
                  "5. volume": "109719"
              },
              "2024-04-04": {
                  "1. open": "12.3000",
                  "2. high": "12.3500",
                  "3. low": "12.1300",
                  "4. close": "12.1900",
                  "5. volume": "154032"
              },
              "2024-04-03": {
                  "1. open": "12.1700",
                  "2. high": "12.3500",
                  "3. low": "12.0300",
                  "4. close": "12.2600",
                  "5. volume": "139955"
              },
              "2024-04-02": {
                  "1. open": "12.3300",
                  "2. high": "12.3600",
                  "3. low": "12.0750",
                  "4. close": "12.1000",
                  "5. volume": "274185"
              },
              "2024-04-01": {
                  "1. open": "12.3800",
                  "2. high": "12.3900",
                  "3. low": "12.0600",
                  "4. close": "12.2000",
                  "5. volume": "188000"
              },
              "2024-03-28": {
                  "1. open": "12.6000",
                  "2. high": "12.6000",
                  "3. low": "12.3700",
                  "4. close": "12.4000",
                  "5. volume": "78182"
              },
              "2024-03-27": {
                  "1. open": "12.4600",
                  "2. high": "12.5650",
                  "3. low": "12.4600",
                  "4. close": "12.5500",
                  "5. volume": "19428"
              },
              "2024-03-26": {
                  "1. open": "12.4900",
                  "2. high": "12.5600",
                  "3. low": "12.4200",
                  "4. close": "12.5200",
                  "5. volume": "53488"
              },
              "2024-03-25": {
                  "1. open": "12.3200",
                  "2. high": "12.4500",
                  "3. low": "12.2500",
                  "4. close": "12.4300",
                  "5. volume": "110572"
              },
              "2024-03-22": {
                  "1. open": "12.2000",
                  "2. high": "12.3399",
                  "3. low": "12.1600",
                  "4. close": "12.2100",
                  "5. volume": "107813"
              },
              "2024-03-21": {
                  "1. open": "12.2500",
                  "2. high": "12.3499",
                  "3. low": "12.1600",
                  "4. close": "12.2000",
                  "5. volume": "111153"
              },
              "2024-03-20": {
                  "1. open": "12.9300",
                  "2. high": "13.0100",
                  "3. low": "12.7000",
                  "4. close": "12.7800",
                  "5. volume": "141681"
              },
              "2024-03-19": {
                  "1. open": "12.8000",
                  "2. high": "12.8800",
                  "3. low": "12.7500",
                  "4. close": "12.8700",
                  "5. volume": "132165"
              },
              "2024-03-18": {
                  "1. open": "12.7500",
                  "2. high": "12.7500",
                  "3. low": "12.6100",
                  "4. close": "12.7400",
                  "5. volume": "64533"
              },
              "2024-03-15": {
                  "1. open": "12.6100",
                  "2. high": "12.6900",
                  "3. low": "12.5300",
                  "4. close": "12.6900",
                  "5. volume": "49080"
              },
              "2024-03-14": {
                  "1. open": "12.8000",
                  "2. high": "12.8000",
                  "3. low": "12.4900",
                  "4. close": "12.5300",
                  "5. volume": "41249"
              },
              "2024-03-13": {
                  "1. open": "12.6100",
                  "2. high": "12.8100",
                  "3. low": "12.6100",
                  "4. close": "12.7400",
                  "5. volume": "34522"
              },
              "2024-03-12": {
                  "1. open": "12.6500",
                  "2. high": "12.7500",
                  "3. low": "12.5701",
                  "4. close": "12.6100",
                  "5. volume": "45368"
              },
              "2024-03-11": {
                  "1. open": "12.5700",
                  "2. high": "12.7000",
                  "3. low": "12.5700",
                  "4. close": "12.6900",
                  "5. volume": "24214"
              },
              "2024-03-08": {
                  "1. open": "12.6300",
                  "2. high": "12.6443",
                  "3. low": "12.4700",
                  "4. close": "12.5700",
                  "5. volume": "41024"
              },
              "2024-03-07": {
                  "1. open": "12.6700",
                  "2. high": "12.6800",
                  "3. low": "12.5450",
                  "4. close": "12.6400",
                  "5. volume": "31189"
              },
              "2024-03-06": {
                  "1. open": "12.4200",
                  "2. high": "12.6895",
                  "3. low": "12.4200",
                  "4. close": "12.5500",
                  "5. volume": "37609"
              },
              "2024-03-05": {
                  "1. open": "12.3800",
                  "2. high": "12.5700",
                  "3. low": "12.3501",
                  "4. close": "12.4900",
                  "5. volume": "28179"
              },
              "2024-03-04": {
                  "1. open": "12.4000",
                  "2. high": "12.5500",
                  "3. low": "12.3200",
                  "4. close": "12.4500",
                  "5. volume": "74988"
              },
              "2024-03-01": {
                  "1. open": "12.4900",
                  "2. high": "12.5000",
                  "3. low": "12.3000",
                  "4. close": "12.4100",
                  "5. volume": "50037"
              },
              "2024-02-29": {
                  "1. open": "12.3500",
                  "2. high": "12.4850",
                  "3. low": "12.1500",
                  "4. close": "12.4500",
                  "5. volume": "102723"
              },
              "2024-02-28": {
                  "1. open": "12.5700",
                  "2. high": "12.5700",
                  "3. low": "12.2200",
                  "4. close": "12.4300",
                  "5. volume": "56981"
              },
              "2024-02-27": {
                  "1. open": "12.5400",
                  "2. high": "12.5999",
                  "3. low": "12.3801",
                  "4. close": "12.5500",
                  "5. volume": "51113"
              },
              "2024-02-26": {
                  "1. open": "12.6400",
                  "2. high": "12.7200",
                  "3. low": "12.5000",
                  "4. close": "12.5000",
                  "5. volume": "42594"
              },
              "2024-02-23": {
                  "1. open": "12.5500",
                  "2. high": "12.7400",
                  "3. low": "12.5500",
                  "4. close": "12.6900",
                  "5. volume": "18972"
              },
              "2024-02-22": {
                  "1. open": "12.5100",
                  "2. high": "12.7500",
                  "3. low": "12.5000",
                  "4. close": "12.5600",
                  "5. volume": "46138"
              },
              "2024-02-21": {
                  "1. open": "12.5800",
                  "2. high": "12.7000",
                  "3. low": "12.5800",
                  "4. close": "12.6100",
                  "5. volume": "27983"
              },
              "2024-02-20": {
                  "1. open": "12.6800",
                  "2. high": "12.7323",
                  "3. low": "12.6400",
                  "4. close": "12.7000",
                  "5. volume": "16932"
              },
              "2024-02-16": {
                  "1. open": "12.6900",
                  "2. high": "12.7700",
                  "3. low": "12.6200",
                  "4. close": "12.6800",
                  "5. volume": "43007"
              },
              "2024-02-15": {
                  "1. open": "12.6800",
                  "2. high": "12.7700",
                  "3. low": "12.6301",
                  "4. close": "12.7200",
                  "5. volume": "28543"
              },
              "2024-02-14": {
                  "1. open": "12.7500",
                  "2. high": "12.7500",
                  "3. low": "12.6400",
                  "4. close": "12.7100",
                  "5. volume": "25433"
              },
              "2024-02-13": {
                  "1. open": "12.7500",
                  "2. high": "12.7500",
                  "3. low": "12.6000",
                  "4. close": "12.7400",
                  "5. volume": "22535"
              },
              "2024-02-12": {
                  "1. open": "12.5800",
                  "2. high": "12.7500",
                  "3. low": "12.5600",
                  "4. close": "12.7500",
                  "5. volume": "43326"
              },
              "2024-02-09": {
                  "1. open": "12.5700",
                  "2. high": "12.7000",
                  "3. low": "12.5100",
                  "4. close": "12.6100",
                  "5. volume": "41333"
              },
              "2024-02-08": {
                  "1. open": "12.5600",
                  "2. high": "12.6945",
                  "3. low": "12.4600",
                  "4. close": "12.5500",
                  "5. volume": "20126"
              },
              "2024-02-07": {
                  "1. open": "12.5200",
                  "2. high": "12.5800",
                  "3. low": "12.3100",
                  "4. close": "12.5300",
                  "5. volume": "95279"
              },
              "2024-02-06": {
                  "1. open": "12.5200",
                  "2. high": "12.5599",
                  "3. low": "12.4200",
                  "4. close": "12.5200",
                  "5. volume": "30823"
              },
              "2024-02-05": {
                  "1. open": "12.5300",
                  "2. high": "12.6792",
                  "3. low": "12.4500",
                  "4. close": "12.5200",
                  "5. volume": "57458"
              },
              "2024-02-02": {
                  "1. open": "12.5500",
                  "2. high": "12.7100",
                  "3. low": "12.5500",
                  "4. close": "12.5900",
                  "5. volume": "21807"
              },
              "2024-02-01": {
                  "1. open": "12.6200",
                  "2. high": "12.6996",
                  "3. low": "12.5100",
                  "4. close": "12.5500",
                  "5. volume": "21803"
              },
              "2024-01-31": {
                  "1. open": "12.7400",
                  "2. high": "12.7500",
                  "3. low": "12.5100",
                  "4. close": "12.5100",
                  "5. volume": "41227"
              },
              "2024-01-30": {
                  "1. open": "12.5400",
                  "2. high": "12.6900",
                  "3. low": "12.5400",
                  "4. close": "12.6900",
                  "5. volume": "37490"
              },
              "2024-01-29": {
                  "1. open": "12.7100",
                  "2. high": "12.8000",
                  "3. low": "12.5350",
                  "4. close": "12.6000",
                  "5. volume": "55891"
              },
              "2024-01-26": {
                  "1. open": "12.6900",
                  "2. high": "12.8531",
                  "3. low": "12.6550",
                  "4. close": "12.8200",
                  "5. volume": "28333"
              },
              "2024-01-25": {
                  "1. open": "12.6700",
                  "2. high": "12.7600",
                  "3. low": "12.6000",
                  "4. close": "12.6400",
                  "5. volume": "17771"
              },
              "2024-01-24": {
                  "1. open": "12.8195",
                  "2. high": "12.8200",
                  "3. low": "12.6800",
                  "4. close": "12.6800",
                  "5. volume": "38195"
              },
              "2024-01-23": {
                  "1. open": "12.7000",
                  "2. high": "12.8300",
                  "3. low": "12.6000",
                  "4. close": "12.7500",
                  "5. volume": "50262"
              },
              "2024-01-22": {
                  "1. open": "12.3400",
                  "2. high": "12.7300",
                  "3. low": "12.3400",
                  "4. close": "12.6800",
                  "5. volume": "47494"
              },
              "2024-01-19": {
                  "1. open": "12.5200",
                  "2. high": "12.5775",
                  "3. low": "12.4800",
                  "4. close": "12.5400",
                  "5. volume": "11642"
              },
              "2024-01-18": {
                  "1. open": "12.6201",
                  "2. high": "12.7567",
                  "3. low": "12.4200",
                  "4. close": "12.5100",
                  "5. volume": "27900"
              },
              "2024-01-17": {
                  "1. open": "12.6600",
                  "2. high": "12.8838",
                  "3. low": "12.5300",
                  "4. close": "12.6200",
                  "5. volume": "40656"
              },
              "2024-01-16": {
                  "1. open": "12.7700",
                  "2. high": "12.8370",
                  "3. low": "12.6200",
                  "4. close": "12.6500",
                  "5. volume": "26037"
              },
              "2024-01-12": {
                  "1. open": "12.7800",
                  "2. high": "12.8800",
                  "3. low": "12.7700",
                  "4. close": "12.7700",
                  "5. volume": "26759"
              },
              "2024-01-11": {
                  "1. open": "12.6100",
                  "2. high": "12.8500",
                  "3. low": "12.6000",
                  "4. close": "12.7800",
                  "5. volume": "35967"
              },
              "2024-01-10": {
                  "1. open": "12.6100",
                  "2. high": "12.7939",
                  "3. low": "12.6100",
                  "4. close": "12.6600",
                  "5. volume": "44624"
              },
              "2024-01-09": {
                  "1. open": "12.8700",
                  "2. high": "12.9106",
                  "3. low": "12.6700",
                  "4. close": "12.7000",
                  "5. volume": "53493"
              },
              "2024-01-08": {
                  "1. open": "12.5200",
                  "2. high": "12.9200",
                  "3. low": "12.5200",
                  "4. close": "12.8500",
                  "5. volume": "65513"
              },
              "2024-01-05": {
                  "1. open": "12.4800",
                  "2. high": "12.7600",
                  "3. low": "12.4100",
                  "4. close": "12.7500",
                  "5. volume": "51052"
              },
              "2024-01-04": {
                  "1. open": "12.3000",
                  "2. high": "12.6300",
                  "3. low": "12.2944",
                  "4. close": "12.5600",
                  "5. volume": "110758"
              },
              "2024-01-03": {
                  "1. open": "12.4800",
                  "2. high": "12.4800",
                  "3. low": "12.2100",
                  "4. close": "12.2700",
                  "5. volume": "58440"
              },
              "2024-01-02": {
                  "1. open": "12.3000",
                  "2. high": "12.4000",
                  "3. low": "12.1400",
                  "4. close": "12.3000",
                  "5. volume": "62348"
              },
              "2023-12-29": {
                  "1. open": "12.2200",
                  "2. high": "12.5000",
                  "3. low": "12.2200",
                  "4. close": "12.3000",
                  "5. volume": "83755"
              },
              "2023-12-28": {
                  "1. open": "12.3700",
                  "2. high": "12.4600",
                  "3. low": "12.1000",
                  "4. close": "12.2400",
                  "5. volume": "89337"
              },
              "2023-12-27": {
                  "1. open": "12.3100",
                  "2. high": "12.4873",
                  "3. low": "12.2773",
                  "4. close": "12.4300",
                  "5. volume": "86136"
              },
              "2023-12-26": {
                  "1. open": "12.1300",
                  "2. high": "12.3851",
                  "3. low": "12.1300",
                  "4. close": "12.2700",
                  "5. volume": "54102"
              },
              "2023-12-22": {
                  "1. open": "12.4800",
                  "2. high": "12.5132",
                  "3. low": "12.1700",
                  "4. close": "12.2000",
                  "5. volume": "42830"
              },
              "2023-12-21": {
                  "1. open": "12.3700",
                  "2. high": "12.5082",
                  "3. low": "12.3210",
                  "4. close": "12.4100",
                  "5. volume": "49027"
              },
              "2023-12-20": {
                  "1. open": "12.6200",
                  "2. high": "12.8100",
                  "3. low": "12.3100",
                  "4. close": "12.3600",
                  "5. volume": "98033"
              },
              "2023-12-19": {
                  "1. open": "12.7200",
                  "2. high": "12.8000",
                  "3. low": "12.6500",
                  "4. close": "12.6800",
                  "5. volume": "94551"
              },
              "2023-12-18": {
                  "1. open": "12.9800",
                  "2. high": "13.0700",
                  "3. low": "12.8800",
                  "4. close": "13.0400",
                  "5. volume": "192827"
              },
              "2023-12-15": {
                  "1. open": "12.8700",
                  "2. high": "12.9800",
                  "3. low": "12.8000",
                  "4. close": "12.8900",
                  "5. volume": "53453"
              },
              "2023-12-14": {
                  "1. open": "12.7300",
                  "2. high": "12.9600",
                  "3. low": "12.6900",
                  "4. close": "12.9200",
                  "5. volume": "90958"
              },
              "2023-12-13": {
                  "1. open": "12.5100",
                  "2. high": "12.7000",
                  "3. low": "12.4800",
                  "4. close": "12.6400",
                  "5. volume": "56329"
              },
              "2023-12-12": {
                  "1. open": "12.4900",
                  "2. high": "12.5900",
                  "3. low": "12.4700",
                  "4. close": "12.5200",
                  "5. volume": "47148"
              },
              "2023-12-11": {
                  "1. open": "12.2700",
                  "2. high": "12.5800",
                  "3. low": "12.2700",
                  "4. close": "12.5400",
                  "5. volume": "63732"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "Z",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "41.2650",
                  "2. high": "42.4050",
                  "3. low": "40.5000",
                  "4. close": "40.6900",
                  "5. volume": "5361323"
              },
              "2024-05-02": {
                  "1. open": "40.2200",
                  "2. high": "40.2600",
                  "3. low": "38.4501",
                  "4. close": "39.8400",
                  "5. volume": "11237723"
              },
              "2024-05-01": {
                  "1. open": "42.5900",
                  "2. high": "43.4100",
                  "3. low": "41.6300",
                  "4. close": "41.8900",
                  "5. volume": "5713036"
              },
              "2024-04-30": {
                  "1. open": "43.3700",
                  "2. high": "43.7816",
                  "3. low": "42.5400",
                  "4. close": "42.5700",
                  "5. volume": "2974097"
              },
              "2024-04-29": {
                  "1. open": "43.8800",
                  "2. high": "44.4500",
                  "3. low": "43.3500",
                  "4. close": "43.6500",
                  "5. volume": "2667391"
              },
              "2024-04-26": {
                  "1. open": "43.0100",
                  "2. high": "44.2450",
                  "3. low": "42.6700",
                  "4. close": "43.6700",
                  "5. volume": "3002331"
              },
              "2024-04-25": {
                  "1. open": "42.2100",
                  "2. high": "43.5200",
                  "3. low": "42.0900",
                  "4. close": "42.9500",
                  "5. volume": "2624732"
              },
              "2024-04-24": {
                  "1. open": "43.6400",
                  "2. high": "44.7300",
                  "3. low": "43.2400",
                  "4. close": "43.4300",
                  "5. volume": "2669011"
              },
              "2024-04-23": {
                  "1. open": "42.5400",
                  "2. high": "44.0300",
                  "3. low": "42.3700",
                  "4. close": "43.6300",
                  "5. volume": "3378989"
              },
              "2024-04-22": {
                  "1. open": "42.1400",
                  "2. high": "42.4000",
                  "3. low": "41.2000",
                  "4. close": "42.2400",
                  "5. volume": "3828313"
              },
              "2024-04-19": {
                  "1. open": "41.6500",
                  "2. high": "42.3200",
                  "3. low": "41.5000",
                  "4. close": "41.8200",
                  "5. volume": "3736331"
              },
              "2024-04-18": {
                  "1. open": "42.7200",
                  "2. high": "42.8800",
                  "3. low": "41.7650",
                  "4. close": "41.8100",
                  "5. volume": "3304284"
              },
              "2024-04-17": {
                  "1. open": "43.6300",
                  "2. high": "43.8800",
                  "3. low": "42.5100",
                  "4. close": "42.5400",
                  "5. volume": "2937000"
              },
              "2024-04-16": {
                  "1. open": "43.0600",
                  "2. high": "43.4200",
                  "3. low": "42.3437",
                  "4. close": "43.3300",
                  "5. volume": "4470118"
              },
              "2024-04-15": {
                  "1. open": "44.8500",
                  "2. high": "44.8500",
                  "3. low": "43.0219",
                  "4. close": "43.1500",
                  "5. volume": "3220852"
              },
              "2024-04-12": {
                  "1. open": "45.0800",
                  "2. high": "45.2500",
                  "3. low": "44.3100",
                  "4. close": "44.4200",
                  "5. volume": "2302201"
              },
              "2024-04-11": {
                  "1. open": "45.5200",
                  "2. high": "45.8900",
                  "3. low": "44.6900",
                  "4. close": "45.2600",
                  "5. volume": "2648258"
              },
              "2024-04-10": {
                  "1. open": "46.1800",
                  "2. high": "46.4700",
                  "3. low": "44.9200",
                  "4. close": "45.1300",
                  "5. volume": "4127380"
              },
              "2024-04-09": {
                  "1. open": "47.9580",
                  "2. high": "48.1550",
                  "3. low": "47.2172",
                  "4. close": "47.9900",
                  "5. volume": "2327884"
              },
              "2024-04-08": {
                  "1. open": "47.5200",
                  "2. high": "47.9299",
                  "3. low": "46.3600",
                  "4. close": "47.7000",
                  "5. volume": "2017253"
              },
              "2024-04-05": {
                  "1. open": "46.3800",
                  "2. high": "47.3900",
                  "3. low": "45.2600",
                  "4. close": "47.2200",
                  "5. volume": "3952650"
              },
              "2024-04-04": {
                  "1. open": "47.1900",
                  "2. high": "48.0850",
                  "3. low": "46.5900",
                  "4. close": "46.8200",
                  "5. volume": "2289842"
              },
              "2024-04-03": {
                  "1. open": "46.8600",
                  "2. high": "47.1550",
                  "3. low": "46.4300",
                  "4. close": "46.7400",
                  "5. volume": "2469249"
              },
              "2024-04-02": {
                  "1. open": "47.4500",
                  "2. high": "47.4500",
                  "3. low": "46.2300",
                  "4. close": "46.8600",
                  "5. volume": "4829864"
              },
              "2024-04-01": {
                  "1. open": "48.9300",
                  "2. high": "49.9500",
                  "3. low": "47.8200",
                  "4. close": "48.2200",
                  "5. volume": "2890612"
              },
              "2024-03-28": {
                  "1. open": "50.1700",
                  "2. high": "50.7300",
                  "3. low": "48.7000",
                  "4. close": "48.7800",
                  "5. volume": "4895668"
              },
              "2024-03-27": {
                  "1. open": "49.5300",
                  "2. high": "50.4600",
                  "3. low": "49.2810",
                  "4. close": "50.3800",
                  "5. volume": "2450032"
              },
              "2024-03-26": {
                  "1. open": "49.6200",
                  "2. high": "50.4200",
                  "3. low": "48.8200",
                  "4. close": "48.9000",
                  "5. volume": "2646514"
              },
              "2024-03-25": {
                  "1. open": "50.9400",
                  "2. high": "51.4600",
                  "3. low": "48.9150",
                  "4. close": "49.3100",
                  "5. volume": "4020157"
              },
              "2024-03-22": {
                  "1. open": "50.9900",
                  "2. high": "52.1200",
                  "3. low": "50.2900",
                  "4. close": "50.8300",
                  "5. volume": "3487623"
              },
              "2024-03-21": {
                  "1. open": "49.6600",
                  "2. high": "51.5400",
                  "3. low": "49.2200",
                  "4. close": "51.2500",
                  "5. volume": "8711424"
              },
              "2024-03-20": {
                  "1. open": "47.9100",
                  "2. high": "49.4600",
                  "3. low": "47.5700",
                  "4. close": "48.9300",
                  "5. volume": "3864305"
              },
              "2024-03-19": {
                  "1. open": "47.8200",
                  "2. high": "49.5700",
                  "3. low": "47.5300",
                  "4. close": "48.1500",
                  "5. volume": "6886594"
              },
              "2024-03-18": {
                  "1. open": "48.0000",
                  "2. high": "48.9400",
                  "3. low": "45.1600",
                  "4. close": "47.6700",
                  "5. volume": "13035471"
              },
              "2024-03-15": {
                  "1. open": "54.6000",
                  "2. high": "55.4800",
                  "3. low": "46.2700",
                  "4. close": "47.7100",
                  "5. volume": "23332686"
              },
              "2024-03-14": {
                  "1. open": "55.8500",
                  "2. high": "56.4800",
                  "3. low": "54.4700",
                  "4. close": "55.1500",
                  "5. volume": "2528702"
              },
              "2024-03-13": {
                  "1. open": "56.3900",
                  "2. high": "58.4300",
                  "3. low": "55.8400",
                  "4. close": "55.9800",
                  "5. volume": "3038124"
              },
              "2024-03-12": {
                  "1. open": "57.2900",
                  "2. high": "57.5899",
                  "3. low": "56.0401",
                  "4. close": "56.5500",
                  "5. volume": "1915808"
              },
              "2024-03-11": {
                  "1. open": "57.6400",
                  "2. high": "57.7750",
                  "3. low": "56.4700",
                  "4. close": "56.9300",
                  "5. volume": "2117937"
              },
              "2024-03-08": {
                  "1. open": "56.4800",
                  "2. high": "58.6800",
                  "3. low": "56.1900",
                  "4. close": "57.8800",
                  "5. volume": "2713161"
              },
              "2024-03-07": {
                  "1. open": "57.0000",
                  "2. high": "57.0000",
                  "3. low": "55.2366",
                  "4. close": "55.9400",
                  "5. volume": "2177890"
              },
              "2024-03-06": {
                  "1. open": "55.0300",
                  "2. high": "56.9289",
                  "3. low": "54.7600",
                  "4. close": "56.2100",
                  "5. volume": "3285775"
              },
              "2024-03-05": {
                  "1. open": "56.0500",
                  "2. high": "56.5000",
                  "3. low": "53.6000",
                  "4. close": "54.4900",
                  "5. volume": "4489060"
              },
              "2024-03-04": {
                  "1. open": "57.7800",
                  "2. high": "58.1400",
                  "3. low": "56.5600",
                  "4. close": "57.3400",
                  "5. volume": "3046087"
              },
              "2024-03-01": {
                  "1. open": "56.2500",
                  "2. high": "57.5100",
                  "3. low": "55.9100",
                  "4. close": "57.1000",
                  "5. volume": "2916405"
              },
              "2024-02-29": {
                  "1. open": "56.1100",
                  "2. high": "57.3299",
                  "3. low": "55.2400",
                  "4. close": "56.1500",
                  "5. volume": "3179699"
              },
              "2024-02-28": {
                  "1. open": "54.0500",
                  "2. high": "55.9400",
                  "3. low": "53.9500",
                  "4. close": "55.2400",
                  "5. volume": "2438635"
              },
              "2024-02-27": {
                  "1. open": "54.2200",
                  "2. high": "55.1500",
                  "3. low": "53.5300",
                  "4. close": "54.8400",
                  "5. volume": "3544970"
              },
              "2024-02-26": {
                  "1. open": "53.3900",
                  "2. high": "54.6000",
                  "3. low": "53.3300",
                  "4. close": "53.6700",
                  "5. volume": "4780585"
              },
              "2024-02-23": {
                  "1. open": "53.3900",
                  "2. high": "53.8400",
                  "3. low": "52.9100",
                  "4. close": "53.5300",
                  "5. volume": "2633063"
              },
              "2024-02-22": {
                  "1. open": "54.1600",
                  "2. high": "54.4900",
                  "3. low": "53.1100",
                  "4. close": "53.2200",
                  "5. volume": "2615935"
              },
              "2024-02-21": {
                  "1. open": "52.8100",
                  "2. high": "53.9500",
                  "3. low": "52.7600",
                  "4. close": "53.7800",
                  "5. volume": "3536867"
              },
              "2024-02-20": {
                  "1. open": "54.0500",
                  "2. high": "54.4900",
                  "3. low": "53.0300",
                  "4. close": "53.5200",
                  "5. volume": "4810068"
              },
              "2024-02-16": {
                  "1. open": "56.0500",
                  "2. high": "56.3700",
                  "3. low": "54.5000",
                  "4. close": "54.8000",
                  "5. volume": "5721348"
              },
              "2024-02-15": {
                  "1. open": "58.6900",
                  "2. high": "58.9600",
                  "3. low": "56.6000",
                  "4. close": "57.9200",
                  "5. volume": "5400399"
              },
              "2024-02-14": {
                  "1. open": "57.4000",
                  "2. high": "61.1300",
                  "3. low": "56.8100",
                  "4. close": "58.0600",
                  "5. volume": "11344445"
              },
              "2024-02-13": {
                  "1. open": "53.0000",
                  "2. high": "54.4700",
                  "3. low": "52.6000",
                  "4. close": "53.8800",
                  "5. volume": "4880802"
              },
              "2024-02-12": {
                  "1. open": "55.3500",
                  "2. high": "56.5700",
                  "3. low": "55.0200",
                  "4. close": "55.4800",
                  "5. volume": "4991372"
              },
              "2024-02-09": {
                  "1. open": "56.0500",
                  "2. high": "56.2163",
                  "3. low": "53.8750",
                  "4. close": "54.9500",
                  "5. volume": "4125334"
              },
              "2024-02-08": {
                  "1. open": "57.2500",
                  "2. high": "57.4900",
                  "3. low": "56.1500",
                  "4. close": "56.2800",
                  "5. volume": "2544772"
              },
              "2024-02-07": {
                  "1. open": "57.6100",
                  "2. high": "57.6500",
                  "3. low": "56.1600",
                  "4. close": "57.2500",
                  "5. volume": "2121181"
              },
              "2024-02-06": {
                  "1. open": "56.0900",
                  "2. high": "57.2700",
                  "3. low": "55.8150",
                  "4. close": "57.0600",
                  "5. volume": "2360356"
              },
              "2024-02-05": {
                  "1. open": "56.8000",
                  "2. high": "57.2900",
                  "3. low": "55.2400",
                  "4. close": "56.0900",
                  "5. volume": "3419207"
              },
              "2024-02-02": {
                  "1. open": "57.2100",
                  "2. high": "58.0300",
                  "3. low": "55.8225",
                  "4. close": "57.6500",
                  "5. volume": "2755974"
              },
              "2024-02-01": {
                  "1. open": "57.3600",
                  "2. high": "58.8400",
                  "3. low": "57.3600",
                  "4. close": "58.3600",
                  "5. volume": "5661880"
              },
              "2024-01-31": {
                  "1. open": "57.0000",
                  "2. high": "59.4000",
                  "3. low": "56.5550",
                  "4. close": "56.8400",
                  "5. volume": "3442199"
              },
              "2024-01-30": {
                  "1. open": "58.5400",
                  "2. high": "58.8100",
                  "3. low": "57.2600",
                  "4. close": "57.4500",
                  "5. volume": "2163975"
              },
              "2024-01-29": {
                  "1. open": "56.6900",
                  "2. high": "58.4900",
                  "3. low": "56.5400",
                  "4. close": "58.4100",
                  "5. volume": "3244838"
              },
              "2024-01-26": {
                  "1. open": "55.8100",
                  "2. high": "57.5177",
                  "3. low": "55.7500",
                  "4. close": "56.5500",
                  "5. volume": "2735529"
              },
              "2024-01-25": {
                  "1. open": "54.5400",
                  "2. high": "55.4400",
                  "3. low": "54.4800",
                  "4. close": "55.0900",
                  "5. volume": "3117048"
              },
              "2024-01-24": {
                  "1. open": "55.8000",
                  "2. high": "56.2900",
                  "3. low": "54.1900",
                  "4. close": "54.3400",
                  "5. volume": "2248236"
              },
              "2024-01-23": {
                  "1. open": "56.1200",
                  "2. high": "56.3400",
                  "3. low": "53.8500",
                  "4. close": "54.8500",
                  "5. volume": "2463365"
              },
              "2024-01-22": {
                  "1. open": "55.1200",
                  "2. high": "56.7800",
                  "3. low": "54.9100",
                  "4. close": "55.5300",
                  "5. volume": "3097715"
              },
              "2024-01-19": {
                  "1. open": "52.5100",
                  "2. high": "54.4600",
                  "3. low": "52.0200",
                  "4. close": "54.3900",
                  "5. volume": "3145698"
              },
              "2024-01-18": {
                  "1. open": "52.3700",
                  "2. high": "52.7350",
                  "3. low": "51.6800",
                  "4. close": "52.5400",
                  "5. volume": "2004004"
              },
              "2024-01-17": {
                  "1. open": "51.4400",
                  "2. high": "52.0400",
                  "3. low": "50.6000",
                  "4. close": "51.9200",
                  "5. volume": "3869604"
              },
              "2024-01-16": {
                  "1. open": "52.6200",
                  "2. high": "52.8800",
                  "3. low": "51.5300",
                  "4. close": "52.4600",
                  "5. volume": "3210959"
              },
              "2024-01-12": {
                  "1. open": "54.6900",
                  "2. high": "54.9900",
                  "3. low": "53.4000",
                  "4. close": "53.5000",
                  "5. volume": "1676270"
              },
              "2024-01-11": {
                  "1. open": "54.1300",
                  "2. high": "54.6000",
                  "3. low": "51.9500",
                  "4. close": "54.1900",
                  "5. volume": "3013260"
              },
              "2024-01-10": {
                  "1. open": "54.4600",
                  "2. high": "55.1300",
                  "3. low": "53.8000",
                  "4. close": "54.6000",
                  "5. volume": "3403976"
              },
              "2024-01-09": {
                  "1. open": "55.1500",
                  "2. high": "55.9100",
                  "3. low": "54.9600",
                  "4. close": "55.4400",
                  "5. volume": "1380356"
              },
              "2024-01-08": {
                  "1. open": "54.1000",
                  "2. high": "56.0500",
                  "3. low": "54.1000",
                  "4. close": "55.6700",
                  "5. volume": "2234499"
              },
              "2024-01-05": {
                  "1. open": "53.6200",
                  "2. high": "55.1700",
                  "3. low": "53.3450",
                  "4. close": "53.7100",
                  "5. volume": "3605310"
              },
              "2024-01-04": {
                  "1. open": "54.7200",
                  "2. high": "54.9900",
                  "3. low": "53.9100",
                  "4. close": "54.1600",
                  "5. volume": "3334665"
              },
              "2024-01-03": {
                  "1. open": "56.1200",
                  "2. high": "56.2300",
                  "3. low": "54.5800",
                  "4. close": "55.2300",
                  "5. volume": "4799851"
              },
              "2024-01-02": {
                  "1. open": "56.9000",
                  "2. high": "58.4700",
                  "3. low": "56.4100",
                  "4. close": "57.2500",
                  "5. volume": "5229330"
              },
              "2023-12-29": {
                  "1. open": "58.7000",
                  "2. high": "59.4750",
                  "3. low": "57.7200",
                  "4. close": "57.8600",
                  "5. volume": "3185548"
              },
              "2023-12-28": {
                  "1. open": "59.1000",
                  "2. high": "59.2300",
                  "3. low": "58.4200",
                  "4. close": "58.8500",
                  "5. volume": "2872764"
              },
              "2023-12-27": {
                  "1. open": "59.0000",
                  "2. high": "59.6843",
                  "3. low": "58.5700",
                  "4. close": "59.4700",
                  "5. volume": "2035018"
              },
              "2023-12-26": {
                  "1. open": "59.1000",
                  "2. high": "59.1000",
                  "3. low": "58.3100",
                  "4. close": "58.6800",
                  "5. volume": "2753785"
              },
              "2023-12-22": {
                  "1. open": "59.0400",
                  "2. high": "59.2900",
                  "3. low": "58.4000",
                  "4. close": "58.7900",
                  "5. volume": "2631477"
              },
              "2023-12-21": {
                  "1. open": "58.4900",
                  "2. high": "59.8595",
                  "3. low": "58.3200",
                  "4. close": "58.7500",
                  "5. volume": "7965408"
              },
              "2023-12-20": {
                  "1. open": "57.6100",
                  "2. high": "59.2000",
                  "3. low": "56.2600",
                  "4. close": "56.8600",
                  "5. volume": "5021790"
              },
              "2023-12-19": {
                  "1. open": "56.7500",
                  "2. high": "58.7800",
                  "3. low": "56.7300",
                  "4. close": "57.8500",
                  "5. volume": "5266419"
              },
              "2023-12-18": {
                  "1. open": "55.7900",
                  "2. high": "56.6200",
                  "3. low": "55.0500",
                  "4. close": "56.2700",
                  "5. volume": "5971423"
              },
              "2023-12-15": {
                  "1. open": "55.3800",
                  "2. high": "56.0800",
                  "3. low": "54.3600",
                  "4. close": "55.8000",
                  "5. volume": "8314933"
              },
              "2023-12-14": {
                  "1. open": "53.7200",
                  "2. high": "56.0500",
                  "3. low": "53.4715",
                  "4. close": "55.5700",
                  "5. volume": "12986240"
              },
              "2023-12-13": {
                  "1. open": "47.4000",
                  "2. high": "52.2500",
                  "3. low": "47.3500",
                  "4. close": "52.0000",
                  "5. volume": "8333668"
              },
              "2023-12-12": {
                  "1. open": "46.8100",
                  "2. high": "47.6200",
                  "3. low": "45.7300",
                  "4. close": "47.2600",
                  "5. volume": "6350293"
              },
              "2023-12-11": {
                  "1. open": "45.9900",
                  "2. high": "46.2300",
                  "3. low": "45.0700",
                  "4. close": "45.5500",
                  "5. volume": "2267141"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "UBS",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "27.1300",
                  "2. high": "27.2400",
                  "3. low": "26.9750",
                  "4. close": "27.1700",
                  "5. volume": "2124016"
              },
              "2024-05-02": {
                  "1. open": "26.7100",
                  "2. high": "26.8700",
                  "3. low": "26.4800",
                  "4. close": "26.8200",
                  "5. volume": "3959486"
              },
              "2024-05-01": {
                  "1. open": "26.2900",
                  "2. high": "26.5700",
                  "3. low": "26.0050",
                  "4. close": "26.1900",
                  "5. volume": "1789015"
              },
              "2024-04-30": {
                  "1. open": "27.2400",
                  "2. high": "27.2950",
                  "3. low": "26.8000",
                  "4. close": "26.8500",
                  "5. volume": "2869866"
              },
              "2024-04-29": {
                  "1. open": "27.5800",
                  "2. high": "27.5950",
                  "3. low": "27.2900",
                  "4. close": "27.3900",
                  "5. volume": "2501616"
              },
              "2024-04-26": {
                  "1. open": "27.2500",
                  "2. high": "27.4900",
                  "3. low": "27.1550",
                  "4. close": "27.3800",
                  "5. volume": "1800506"
              },
              "2024-04-25": {
                  "1. open": "27.3000",
                  "2. high": "27.5300",
                  "3. low": "27.1000",
                  "4. close": "27.4900",
                  "5. volume": "2514776"
              },
              "2024-04-24": {
                  "1. open": "27.6500",
                  "2. high": "27.8000",
                  "3. low": "27.2400",
                  "4. close": "27.3600",
                  "5. volume": "3248991"
              },
              "2024-04-23": {
                  "1. open": "28.1900",
                  "2. high": "28.4375",
                  "3. low": "28.1500",
                  "4. close": "28.3900",
                  "5. volume": "3168603"
              },
              "2024-04-22": {
                  "1. open": "27.8300",
                  "2. high": "28.0800",
                  "3. low": "27.6900",
                  "4. close": "27.9700",
                  "5. volume": "3376741"
              },
              "2024-04-19": {
                  "1. open": "28.1200",
                  "2. high": "28.2950",
                  "3. low": "28.0050",
                  "4. close": "28.0600",
                  "5. volume": "1949007"
              },
              "2024-04-18": {
                  "1. open": "28.0000",
                  "2. high": "28.3600",
                  "3. low": "27.9600",
                  "4. close": "28.1200",
                  "5. volume": "2292123"
              },
              "2024-04-17": {
                  "1. open": "28.3200",
                  "2. high": "28.3750",
                  "3. low": "27.9101",
                  "4. close": "28.1100",
                  "5. volume": "2356588"
              },
              "2024-04-16": {
                  "1. open": "28.1900",
                  "2. high": "28.2100",
                  "3. low": "27.8700",
                  "4. close": "27.9900",
                  "5. volume": "2418829"
              },
              "2024-04-15": {
                  "1. open": "29.0900",
                  "2. high": "29.1500",
                  "3. low": "28.3650",
                  "4. close": "28.4200",
                  "5. volume": "2021738"
              },
              "2024-04-12": {
                  "1. open": "29.1400",
                  "2. high": "29.1800",
                  "3. low": "28.6800",
                  "4. close": "28.7300",
                  "5. volume": "2178481"
              },
              "2024-04-11": {
                  "1. open": "29.1400",
                  "2. high": "29.2350",
                  "3. low": "28.7300",
                  "4. close": "29.1200",
                  "5. volume": "3602291"
              },
              "2024-04-10": {
                  "1. open": "29.8300",
                  "2. high": "29.9000",
                  "3. low": "29.3800",
                  "4. close": "29.4500",
                  "5. volume": "3518517"
              },
              "2024-04-09": {
                  "1. open": "31.2400",
                  "2. high": "31.3095",
                  "3. low": "30.6500",
                  "4. close": "30.8000",
                  "5. volume": "2339736"
              },
              "2024-04-08": {
                  "1. open": "31.2500",
                  "2. high": "31.3250",
                  "3. low": "31.0400",
                  "4. close": "31.1500",
                  "5. volume": "2949466"
              },
              "2024-04-05": {
                  "1. open": "30.9000",
                  "2. high": "31.4200",
                  "3. low": "30.8900",
                  "4. close": "31.2700",
                  "5. volume": "2397380"
              },
              "2024-04-04": {
                  "1. open": "31.4200",
                  "2. high": "31.6900",
                  "3. low": "30.9950",
                  "4. close": "31.0500",
                  "5. volume": "2493427"
              },
              "2024-04-03": {
                  "1. open": "30.5700",
                  "2. high": "31.1700",
                  "3. low": "30.5400",
                  "4. close": "31.1300",
                  "5. volume": "2160014"
              },
              "2024-04-02": {
                  "1. open": "30.4500",
                  "2. high": "30.6400",
                  "3. low": "30.3550",
                  "4. close": "30.5000",
                  "5. volume": "2189126"
              },
              "2024-04-01": {
                  "1. open": "30.7900",
                  "2. high": "30.8200",
                  "3. low": "30.4050",
                  "4. close": "30.4800",
                  "5. volume": "1691314"
              },
              "2024-03-28": {
                  "1. open": "30.4900",
                  "2. high": "30.8100",
                  "3. low": "30.4900",
                  "4. close": "30.7200",
                  "5. volume": "2956635"
              },
              "2024-03-27": {
                  "1. open": "31.2400",
                  "2. high": "31.4000",
                  "3. low": "31.1500",
                  "4. close": "31.4000",
                  "5. volume": "3203846"
              },
              "2024-03-26": {
                  "1. open": "31.4200",
                  "2. high": "31.4700",
                  "3. low": "31.1400",
                  "4. close": "31.1500",
                  "5. volume": "1553770"
              },
              "2024-03-25": {
                  "1. open": "31.2500",
                  "2. high": "31.5900",
                  "3. low": "31.2200",
                  "4. close": "31.5000",
                  "5. volume": "2798934"
              },
              "2024-03-22": {
                  "1. open": "31.2500",
                  "2. high": "31.2900",
                  "3. low": "31.0450",
                  "4. close": "31.2400",
                  "5. volume": "2210237"
              },
              "2024-03-21": {
                  "1. open": "31.2100",
                  "2. high": "31.3300",
                  "3. low": "31.0400",
                  "4. close": "31.2500",
                  "5. volume": "4223802"
              },
              "2024-03-20": {
                  "1. open": "30.7000",
                  "2. high": "31.2500",
                  "3. low": "30.6100",
                  "4. close": "31.2200",
                  "5. volume": "3248163"
              },
              "2024-03-19": {
                  "1. open": "31.4400",
                  "2. high": "31.5000",
                  "3. low": "31.1350",
                  "4. close": "31.1500",
                  "5. volume": "3234342"
              },
              "2024-03-18": {
                  "1. open": "31.6800",
                  "2. high": "31.7100",
                  "3. low": "31.5200",
                  "4. close": "31.5500",
                  "5. volume": "2039158"
              },
              "2024-03-15": {
                  "1. open": "31.6600",
                  "2. high": "32.1300",
                  "3. low": "31.5700",
                  "4. close": "31.9300",
                  "5. volume": "3577015"
              },
              "2024-03-14": {
                  "1. open": "31.5900",
                  "2. high": "31.6750",
                  "3. low": "31.2250",
                  "4. close": "31.3100",
                  "5. volume": "3061242"
              },
              "2024-03-13": {
                  "1. open": "31.5900",
                  "2. high": "31.8900",
                  "3. low": "31.5800",
                  "4. close": "31.7300",
                  "5. volume": "2207551"
              },
              "2024-03-12": {
                  "1. open": "31.2700",
                  "2. high": "31.6600",
                  "3. low": "31.1350",
                  "4. close": "31.6500",
                  "5. volume": "3218080"
              },
              "2024-03-11": {
                  "1. open": "30.7500",
                  "2. high": "31.0500",
                  "3. low": "30.6250",
                  "4. close": "31.0400",
                  "5. volume": "3349525"
              },
              "2024-03-08": {
                  "1. open": "30.9100",
                  "2. high": "31.1900",
                  "3. low": "30.6900",
                  "4. close": "30.8500",
                  "5. volume": "5569837"
              },
              "2024-03-07": {
                  "1. open": "29.7000",
                  "2. high": "29.8800",
                  "3. low": "29.5900",
                  "4. close": "29.8100",
                  "5. volume": "4522707"
              },
              "2024-03-06": {
                  "1. open": "29.4500",
                  "2. high": "29.4500",
                  "3. low": "29.0150",
                  "4. close": "29.1400",
                  "5. volume": "5675633"
              },
              "2024-03-05": {
                  "1. open": "28.7400",
                  "2. high": "29.0400",
                  "3. low": "28.7200",
                  "4. close": "28.8200",
                  "5. volume": "2468662"
              },
              "2024-03-04": {
                  "1. open": "28.6500",
                  "2. high": "28.9450",
                  "3. low": "28.6476",
                  "4. close": "28.7000",
                  "5. volume": "2640236"
              },
              "2024-03-01": {
                  "1. open": "28.7900",
                  "2. high": "29.0050",
                  "3. low": "28.5700",
                  "4. close": "28.9500",
                  "5. volume": "2373853"
              },
              "2024-02-29": {
                  "1. open": "28.8600",
                  "2. high": "28.9500",
                  "3. low": "28.3800",
                  "4. close": "28.4500",
                  "5. volume": "5955858"
              },
              "2024-02-28": {
                  "1. open": "28.5500",
                  "2. high": "28.6600",
                  "3. low": "28.4950",
                  "4. close": "28.5000",
                  "5. volume": "1272217"
              },
              "2024-02-27": {
                  "1. open": "28.5000",
                  "2. high": "28.6900",
                  "3. low": "28.4400",
                  "4. close": "28.5700",
                  "5. volume": "1953575"
              },
              "2024-02-26": {
                  "1. open": "28.4300",
                  "2. high": "28.5500",
                  "3. low": "28.2000",
                  "4. close": "28.3500",
                  "5. volume": "1707831"
              },
              "2024-02-23": {
                  "1. open": "28.1400",
                  "2. high": "28.1800",
                  "3. low": "27.9850",
                  "4. close": "28.0500",
                  "5. volume": "1818814"
              },
              "2024-02-22": {
                  "1. open": "27.9800",
                  "2. high": "28.1700",
                  "3. low": "27.9000",
                  "4. close": "28.0600",
                  "5. volume": "3390574"
              },
              "2024-02-21": {
                  "1. open": "27.6800",
                  "2. high": "27.9000",
                  "3. low": "27.6100",
                  "4. close": "27.8200",
                  "5. volume": "1643117"
              },
              "2024-02-20": {
                  "1. open": "27.7100",
                  "2. high": "27.8550",
                  "3. low": "27.6700",
                  "4. close": "27.7900",
                  "5. volume": "2005023"
              },
              "2024-02-16": {
                  "1. open": "27.7500",
                  "2. high": "27.8800",
                  "3. low": "27.6400",
                  "4. close": "27.6600",
                  "5. volume": "1801249"
              },
              "2024-02-15": {
                  "1. open": "27.6600",
                  "2. high": "27.9150",
                  "3. low": "27.6600",
                  "4. close": "27.8700",
                  "5. volume": "3213229"
              },
              "2024-02-14": {
                  "1. open": "27.4100",
                  "2. high": "27.5100",
                  "3. low": "27.2900",
                  "4. close": "27.4700",
                  "5. volume": "2270677"
              },
              "2024-02-13": {
                  "1. open": "27.2500",
                  "2. high": "27.2700",
                  "3. low": "26.8900",
                  "4. close": "27.0500",
                  "5. volume": "3737587"
              },
              "2024-02-12": {
                  "1. open": "27.8300",
                  "2. high": "28.1250",
                  "3. low": "27.8300",
                  "4. close": "27.9200",
                  "5. volume": "2169774"
              },
              "2024-02-09": {
                  "1. open": "27.7100",
                  "2. high": "27.9000",
                  "3. low": "27.5750",
                  "4. close": "27.9000",
                  "5. volume": "2593792"
              },
              "2024-02-08": {
                  "1. open": "27.9900",
                  "2. high": "28.0800",
                  "3. low": "27.5650",
                  "4. close": "27.7900",
                  "5. volume": "3369961"
              },
              "2024-02-07": {
                  "1. open": "27.8200",
                  "2. high": "27.9300",
                  "3. low": "27.3350",
                  "4. close": "27.7600",
                  "5. volume": "6342595"
              },
              "2024-02-06": {
                  "1. open": "28.3700",
                  "2. high": "28.4461",
                  "3. low": "28.0100",
                  "4. close": "28.1500",
                  "5. volume": "6387247"
              },
              "2024-02-05": {
                  "1. open": "29.5400",
                  "2. high": "29.8750",
                  "3. low": "29.2950",
                  "4. close": "29.7900",
                  "5. volume": "2567917"
              },
              "2024-02-02": {
                  "1. open": "29.4700",
                  "2. high": "29.9050",
                  "3. low": "29.4700",
                  "4. close": "29.8400",
                  "5. volume": "1995814"
              },
              "2024-02-01": {
                  "1. open": "29.4500",
                  "2. high": "29.5750",
                  "3. low": "29.0600",
                  "4. close": "29.5100",
                  "5. volume": "3032818"
              },
              "2024-01-31": {
                  "1. open": "30.3300",
                  "2. high": "30.4900",
                  "3. low": "29.8950",
                  "4. close": "29.9100",
                  "5. volume": "2031638"
              },
              "2024-01-30": {
                  "1. open": "30.0700",
                  "2. high": "30.2600",
                  "3. low": "29.9000",
                  "4. close": "30.2300",
                  "5. volume": "2373657"
              },
              "2024-01-29": {
                  "1. open": "29.7300",
                  "2. high": "29.9700",
                  "3. low": "29.6300",
                  "4. close": "29.9700",
                  "5. volume": "2555985"
              },
              "2024-01-26": {
                  "1. open": "29.8600",
                  "2. high": "29.9250",
                  "3. low": "29.7400",
                  "4. close": "29.8700",
                  "5. volume": "2364344"
              },
              "2024-01-25": {
                  "1. open": "29.7700",
                  "2. high": "29.7750",
                  "3. low": "29.5300",
                  "4. close": "29.6900",
                  "5. volume": "2402751"
              },
              "2024-01-24": {
                  "1. open": "29.5600",
                  "2. high": "29.6650",
                  "3. low": "29.4400",
                  "4. close": "29.5000",
                  "5. volume": "2800421"
              },
              "2024-01-23": {
                  "1. open": "28.9800",
                  "2. high": "29.0410",
                  "3. low": "28.7600",
                  "4. close": "28.9300",
                  "5. volume": "2707346"
              },
              "2024-01-22": {
                  "1. open": "29.1900",
                  "2. high": "29.2750",
                  "3. low": "29.0700",
                  "4. close": "29.1100",
                  "5. volume": "2383584"
              },
              "2024-01-19": {
                  "1. open": "28.8500",
                  "2. high": "29.0350",
                  "3. low": "28.5200",
                  "4. close": "29.0200",
                  "5. volume": "3659963"
              },
              "2024-01-18": {
                  "1. open": "29.4100",
                  "2. high": "29.4700",
                  "3. low": "29.1500",
                  "4. close": "29.3600",
                  "5. volume": "2312203"
              },
              "2024-01-17": {
                  "1. open": "28.8900",
                  "2. high": "29.2300",
                  "3. low": "28.8600",
                  "4. close": "29.1400",
                  "5. volume": "2131227"
              },
              "2024-01-16": {
                  "1. open": "29.3000",
                  "2. high": "29.5300",
                  "3. low": "29.1800",
                  "4. close": "29.4700",
                  "5. volume": "1744223"
              },
              "2024-01-12": {
                  "1. open": "29.8100",
                  "2. high": "29.9200",
                  "3. low": "29.5900",
                  "4. close": "29.8000",
                  "5. volume": "1913717"
              },
              "2024-01-11": {
                  "1. open": "29.8600",
                  "2. high": "29.9200",
                  "3. low": "29.1450",
                  "4. close": "29.4900",
                  "5. volume": "3264171"
              },
              "2024-01-10": {
                  "1. open": "30.0200",
                  "2. high": "30.0300",
                  "3. low": "29.7950",
                  "4. close": "29.9200",
                  "5. volume": "2910163"
              },
              "2024-01-09": {
                  "1. open": "29.9700",
                  "2. high": "30.0700",
                  "3. low": "29.7100",
                  "4. close": "29.7200",
                  "5. volume": "2571804"
              },
              "2024-01-08": {
                  "1. open": "30.1700",
                  "2. high": "30.3550",
                  "3. low": "30.0650",
                  "4. close": "30.3500",
                  "5. volume": "3189015"
              },
              "2024-01-05": {
                  "1. open": "29.8400",
                  "2. high": "30.2000",
                  "3. low": "29.8000",
                  "4. close": "29.9200",
                  "5. volume": "3281894"
              },
              "2024-01-04": {
                  "1. open": "29.5100",
                  "2. high": "29.9450",
                  "3. low": "29.4899",
                  "4. close": "29.5700",
                  "5. volume": "3917860"
              },
              "2024-01-03": {
                  "1. open": "29.4900",
                  "2. high": "29.5400",
                  "3. low": "29.0700",
                  "4. close": "29.3000",
                  "5. volume": "6129317"
              },
              "2024-01-02": {
                  "1. open": "30.6000",
                  "2. high": "30.6200",
                  "3. low": "30.3800",
                  "4. close": "30.4000",
                  "5. volume": "3973929"
              },
              "2023-12-29": {
                  "1. open": "30.9800",
                  "2. high": "31.2684",
                  "3. low": "30.8000",
                  "4. close": "30.9000",
                  "5. volume": "5933243"
              },
              "2023-12-28": {
                  "1. open": "31.0900",
                  "2. high": "31.2392",
                  "3. low": "30.7900",
                  "4. close": "30.9100",
                  "5. volume": "5505014"
              },
              "2023-12-27": {
                  "1. open": "30.9400",
                  "2. high": "31.3950",
                  "3. low": "30.9150",
                  "4. close": "31.1900",
                  "5. volume": "4925225"
              },
              "2023-12-26": {
                  "1. open": "30.7900",
                  "2. high": "31.1500",
                  "3. low": "30.7900",
                  "4. close": "31.0400",
                  "5. volume": "4223625"
              },
              "2023-12-22": {
                  "1. open": "30.7600",
                  "2. high": "31.1300",
                  "3. low": "30.7250",
                  "4. close": "30.8900",
                  "5. volume": "4259050"
              },
              "2023-12-21": {
                  "1. open": "30.7400",
                  "2. high": "30.8250",
                  "3. low": "30.4550",
                  "4. close": "30.6700",
                  "5. volume": "4531272"
              },
              "2023-12-20": {
                  "1. open": "30.5000",
                  "2. high": "30.8500",
                  "3. low": "30.2800",
                  "4. close": "30.3300",
                  "5. volume": "7621101"
              },
              "2023-12-19": {
                  "1. open": "30.1400",
                  "2. high": "30.9300",
                  "3. low": "30.0000",
                  "4. close": "30.7100",
                  "5. volume": "12475123"
              },
              "2023-12-18": {
                  "1. open": "29.3500",
                  "2. high": "29.3700",
                  "3. low": "29.1000",
                  "4. close": "29.2000",
                  "5. volume": "3511591"
              },
              "2023-12-15": {
                  "1. open": "29.5800",
                  "2. high": "29.7350",
                  "3. low": "29.2200",
                  "4. close": "29.2800",
                  "5. volume": "6873979"
              },
              "2023-12-14": {
                  "1. open": "29.7500",
                  "2. high": "30.2000",
                  "3. low": "29.6400",
                  "4. close": "29.7500",
                  "5. volume": "5712859"
              },
              "2023-12-13": {
                  "1. open": "28.6900",
                  "2. high": "29.0650",
                  "3. low": "28.4400",
                  "4. close": "28.9600",
                  "5. volume": "2389328"
              },
              "2023-12-12": {
                  "1. open": "28.4600",
                  "2. high": "28.5900",
                  "3. low": "28.4150",
                  "4. close": "28.5500",
                  "5. volume": "2755267"
              },
              "2023-12-11": {
                  "1. open": "28.4800",
                  "2. high": "28.5850",
                  "3. low": "28.3850",
                  "4. close": "28.4800",
                  "5. volume": "2073216"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "PLUG",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "2.5600",
                  "2. high": "2.7800",
                  "3. low": "2.5600",
                  "4. close": "2.7400",
                  "5. volume": "44789004"
              },
              "2024-05-02": {
                  "1. open": "2.4100",
                  "2. high": "2.5200",
                  "3. low": "2.3000",
                  "4. close": "2.4500",
                  "5. volume": "35923818"
              },
              "2024-05-01": {
                  "1. open": "2.3100",
                  "2. high": "2.5397",
                  "3. low": "2.2800",
                  "4. close": "2.3000",
                  "5. volume": "43081544"
              },
              "2024-04-30": {
                  "1. open": "2.3600",
                  "2. high": "2.3700",
                  "3. low": "2.2800",
                  "4. close": "2.3100",
                  "5. volume": "30011629"
              },
              "2024-04-29": {
                  "1. open": "2.5100",
                  "2. high": "2.6050",
                  "3. low": "2.3850",
                  "4. close": "2.4000",
                  "5. volume": "28091648"
              },
              "2024-04-26": {
                  "1. open": "2.4100",
                  "2. high": "2.4400",
                  "3. low": "2.3800",
                  "4. close": "2.4100",
                  "5. volume": "16642161"
              },
              "2024-04-25": {
                  "1. open": "2.3600",
                  "2. high": "2.4000",
                  "3. low": "2.2500",
                  "4. close": "2.3800",
                  "5. volume": "26600803"
              },
              "2024-04-24": {
                  "1. open": "2.6600",
                  "2. high": "2.6799",
                  "3. low": "2.3900",
                  "4. close": "2.4100",
                  "5. volume": "37880723"
              },
              "2024-04-23": {
                  "1. open": "2.5900",
                  "2. high": "2.7400",
                  "3. low": "2.5300",
                  "4. close": "2.5900",
                  "5. volume": "33586160"
              },
              "2024-04-22": {
                  "1. open": "2.5800",
                  "2. high": "2.5950",
                  "3. low": "2.4500",
                  "4. close": "2.4900",
                  "5. volume": "23375366"
              },
              "2024-04-19": {
                  "1. open": "2.6500",
                  "2. high": "2.7300",
                  "3. low": "2.5400",
                  "4. close": "2.5700",
                  "5. volume": "32211826"
              },
              "2024-04-18": {
                  "1. open": "2.7400",
                  "2. high": "2.7900",
                  "3. low": "2.6150",
                  "4. close": "2.7100",
                  "5. volume": "25401075"
              },
              "2024-04-17": {
                  "1. open": "2.7200",
                  "2. high": "2.8200",
                  "3. low": "2.6600",
                  "4. close": "2.7300",
                  "5. volume": "22235953"
              },
              "2024-04-16": {
                  "1. open": "2.8000",
                  "2. high": "2.8000",
                  "3. low": "2.6800",
                  "4. close": "2.7000",
                  "5. volume": "24094645"
              },
              "2024-04-15": {
                  "1. open": "2.8900",
                  "2. high": "2.9500",
                  "3. low": "2.8000",
                  "4. close": "2.8500",
                  "5. volume": "21785615"
              },
              "2024-04-12": {
                  "1. open": "2.9000",
                  "2. high": "2.9800",
                  "3. low": "2.8600",
                  "4. close": "2.8900",
                  "5. volume": "16360578"
              },
              "2024-04-11": {
                  "1. open": "3.0800",
                  "2. high": "3.1500",
                  "3. low": "2.9000",
                  "4. close": "2.9600",
                  "5. volume": "28043362"
              },
              "2024-04-10": {
                  "1. open": "3.0900",
                  "2. high": "3.1600",
                  "3. low": "3.0300",
                  "4. close": "3.0700",
                  "5. volume": "24288749"
              },
              "2024-04-09": {
                  "1. open": "3.1400",
                  "2. high": "3.3200",
                  "3. low": "3.1300",
                  "4. close": "3.2500",
                  "5. volume": "27184891"
              },
              "2024-04-08": {
                  "1. open": "3.1000",
                  "2. high": "3.2200",
                  "3. low": "3.0400",
                  "4. close": "3.1200",
                  "5. volume": "20441020"
              },
              "2024-04-05": {
                  "1. open": "3.0000",
                  "2. high": "3.1900",
                  "3. low": "2.9900",
                  "4. close": "3.1400",
                  "5. volume": "30277431"
              },
              "2024-04-04": {
                  "1. open": "3.2900",
                  "2. high": "3.3988",
                  "3. low": "3.1400",
                  "4. close": "3.1500",
                  "5. volume": "23933788"
              },
              "2024-04-03": {
                  "1. open": "3.1600",
                  "2. high": "3.2400",
                  "3. low": "3.0500",
                  "4. close": "3.2300",
                  "5. volume": "27042487"
              },
              "2024-04-02": {
                  "1. open": "3.3500",
                  "2. high": "3.3524",
                  "3. low": "3.1200",
                  "4. close": "3.1400",
                  "5. volume": "30737948"
              },
              "2024-04-01": {
                  "1. open": "3.4900",
                  "2. high": "3.5000",
                  "3. low": "3.2900",
                  "4. close": "3.4400",
                  "5. volume": "18200751"
              },
              "2024-03-28": {
                  "1. open": "3.4300",
                  "2. high": "3.5100",
                  "3. low": "3.3500",
                  "4. close": "3.4400",
                  "5. volume": "22255675"
              },
              "2024-03-27": {
                  "1. open": "3.2500",
                  "2. high": "3.5250",
                  "3. low": "3.2000",
                  "4. close": "3.4300",
                  "5. volume": "36398363"
              },
              "2024-03-26": {
                  "1. open": "3.3900",
                  "2. high": "3.4100",
                  "3. low": "3.2200",
                  "4. close": "3.2200",
                  "5. volume": "22460171"
              },
              "2024-03-25": {
                  "1. open": "3.4100",
                  "2. high": "3.5400",
                  "3. low": "3.3100",
                  "4. close": "3.3300",
                  "5. volume": "19888620"
              },
              "2024-03-22": {
                  "1. open": "3.5700",
                  "2. high": "3.5700",
                  "3. low": "3.3700",
                  "4. close": "3.4100",
                  "5. volume": "18950907"
              },
              "2024-03-21": {
                  "1. open": "3.5200",
                  "2. high": "3.7100",
                  "3. low": "3.4700",
                  "4. close": "3.5900",
                  "5. volume": "26185718"
              },
              "2024-03-20": {
                  "1. open": "3.2700",
                  "2. high": "3.6000",
                  "3. low": "3.1200",
                  "4. close": "3.5200",
                  "5. volume": "37880413"
              },
              "2024-03-19": {
                  "1. open": "3.1900",
                  "2. high": "3.2700",
                  "3. low": "3.0500",
                  "4. close": "3.2500",
                  "5. volume": "27895249"
              },
              "2024-03-18": {
                  "1. open": "3.3600",
                  "2. high": "3.3600",
                  "3. low": "3.1600",
                  "4. close": "3.2500",
                  "5. volume": "26070445"
              },
              "2024-03-15": {
                  "1. open": "3.3600",
                  "2. high": "3.4700",
                  "3. low": "3.2600",
                  "4. close": "3.3300",
                  "5. volume": "25377447"
              },
              "2024-03-14": {
                  "1. open": "3.4600",
                  "2. high": "3.4600",
                  "3. low": "3.2500",
                  "4. close": "3.3400",
                  "5. volume": "34451763"
              },
              "2024-03-13": {
                  "1. open": "3.4450",
                  "2. high": "3.5250",
                  "3. low": "3.3250",
                  "4. close": "3.3600",
                  "5. volume": "34724990"
              },
              "2024-03-12": {
                  "1. open": "3.7100",
                  "2. high": "3.7100",
                  "3. low": "3.4800",
                  "4. close": "3.5400",
                  "5. volume": "27228963"
              },
              "2024-03-11": {
                  "1. open": "4.0100",
                  "2. high": "4.1000",
                  "3. low": "3.6100",
                  "4. close": "3.6600",
                  "5. volume": "36089472"
              },
              "2024-03-08": {
                  "1. open": "4.0500",
                  "2. high": "4.3300",
                  "3. low": "4.0000",
                  "4. close": "4.0200",
                  "5. volume": "37744469"
              },
              "2024-03-07": {
                  "1. open": "4.0200",
                  "2. high": "4.1600",
                  "3. low": "3.8100",
                  "4. close": "3.9000",
                  "5. volume": "32044539"
              },
              "2024-03-06": {
                  "1. open": "3.7100",
                  "2. high": "4.1000",
                  "3. low": "3.6303",
                  "4. close": "4.0200",
                  "5. volume": "48461384"
              },
              "2024-03-05": {
                  "1. open": "3.7190",
                  "2. high": "3.7975",
                  "3. low": "3.6000",
                  "4. close": "3.6300",
                  "5. volume": "28307726"
              },
              "2024-03-04": {
                  "1. open": "3.8900",
                  "2. high": "4.0200",
                  "3. low": "3.6800",
                  "4. close": "3.8600",
                  "5. volume": "38826100"
              },
              "2024-03-01": {
                  "1. open": "3.1900",
                  "2. high": "3.8900",
                  "3. low": "3.1600",
                  "4. close": "3.8900",
                  "5. volume": "77838648"
              },
              "2024-02-29": {
                  "1. open": "3.5900",
                  "2. high": "3.8950",
                  "3. low": "3.4600",
                  "4. close": "3.5300",
                  "5. volume": "57494457"
              },
              "2024-02-28": {
                  "1. open": "3.4700",
                  "2. high": "3.6300",
                  "3. low": "3.3700",
                  "4. close": "3.4300",
                  "5. volume": "37218130"
              },
              "2024-02-27": {
                  "1. open": "3.1700",
                  "2. high": "3.6300",
                  "3. low": "3.1500",
                  "4. close": "3.5500",
                  "5. volume": "54093084"
              },
              "2024-02-26": {
                  "1. open": "2.9200",
                  "2. high": "3.0800",
                  "3. low": "2.8300",
                  "4. close": "3.0400",
                  "5. volume": "33356162"
              },
              "2024-02-23": {
                  "1. open": "3.2500",
                  "2. high": "3.2700",
                  "3. low": "2.9800",
                  "4. close": "3.0100",
                  "5. volume": "54728227"
              },
              "2024-02-22": {
                  "1. open": "3.5300",
                  "2. high": "3.5300",
                  "3. low": "3.1100",
                  "4. close": "3.1300",
                  "5. volume": "46865366"
              },
              "2024-02-21": {
                  "1. open": "3.7300",
                  "2. high": "3.7400",
                  "3. low": "3.3412",
                  "4. close": "3.4050",
                  "5. volume": "44055341"
              },
              "2024-02-20": {
                  "1. open": "3.8500",
                  "2. high": "3.8850",
                  "3. low": "3.7000",
                  "4. close": "3.7300",
                  "5. volume": "21864875"
              },
              "2024-02-16": {
                  "1. open": "3.8450",
                  "2. high": "4.0100",
                  "3. low": "3.7500",
                  "4. close": "3.9600",
                  "5. volume": "31134639"
              },
              "2024-02-15": {
                  "1. open": "4.1800",
                  "2. high": "4.2900",
                  "3. low": "3.9406",
                  "4. close": "4.0200",
                  "5. volume": "41025080"
              },
              "2024-02-14": {
                  "1. open": "4.3500",
                  "2. high": "4.3500",
                  "3. low": "4.0900",
                  "4. close": "4.2300",
                  "5. volume": "29274948"
              },
              "2024-02-13": {
                  "1. open": "4.2800",
                  "2. high": "4.3200",
                  "3. low": "4.0800",
                  "4. close": "4.1700",
                  "5. volume": "37928614"
              },
              "2024-02-12": {
                  "1. open": "4.3300",
                  "2. high": "4.6900",
                  "3. low": "4.2900",
                  "4. close": "4.5700",
                  "5. volume": "48054553"
              },
              "2024-02-09": {
                  "1. open": "4.2500",
                  "2. high": "4.4300",
                  "3. low": "4.1650",
                  "4. close": "4.3300",
                  "5. volume": "40832590"
              },
              "2024-02-08": {
                  "1. open": "4.2100",
                  "2. high": "4.2900",
                  "3. low": "4.1000",
                  "4. close": "4.1900",
                  "5. volume": "35842585"
              },
              "2024-02-07": {
                  "1. open": "4.5500",
                  "2. high": "4.5900",
                  "3. low": "4.1800",
                  "4. close": "4.2200",
                  "5. volume": "36952009"
              },
              "2024-02-06": {
                  "1. open": "4.1700",
                  "2. high": "4.5400",
                  "3. low": "4.1300",
                  "4. close": "4.4900",
                  "5. volume": "50778716"
              },
              "2024-02-05": {
                  "1. open": "4.4300",
                  "2. high": "4.4500",
                  "3. low": "4.1600",
                  "4. close": "4.3450",
                  "5. volume": "40608233"
              },
              "2024-02-02": {
                  "1. open": "4.6900",
                  "2. high": "4.8300",
                  "3. low": "4.5000",
                  "4. close": "4.6600",
                  "5. volume": "60637931"
              },
              "2024-02-01": {
                  "1. open": "4.9800",
                  "2. high": "5.1400",
                  "3. low": "4.4200",
                  "4. close": "4.7000",
                  "5. volume": "111112179"
              },
              "2024-01-31": {
                  "1. open": "4.1000",
                  "2. high": "4.8400",
                  "3. low": "3.9700",
                  "4. close": "4.4500",
                  "5. volume": "130249401"
              },
              "2024-01-30": {
                  "1. open": "3.7100",
                  "2. high": "3.8600",
                  "3. low": "3.6500",
                  "4. close": "3.7300",
                  "5. volume": "34548523"
              },
              "2024-01-29": {
                  "1. open": "3.4200",
                  "2. high": "3.8150",
                  "3. low": "3.3300",
                  "4. close": "3.7900",
                  "5. volume": "41212353"
              },
              "2024-01-26": {
                  "1. open": "3.4400",
                  "2. high": "3.6000",
                  "3. low": "3.3500",
                  "4. close": "3.4000",
                  "5. volume": "30746239"
              },
              "2024-01-25": {
                  "1. open": "3.5000",
                  "2. high": "3.5250",
                  "3. low": "3.2200",
                  "4. close": "3.4000",
                  "5. volume": "52983010"
              },
              "2024-01-24": {
                  "1. open": "3.7500",
                  "2. high": "4.0300",
                  "3. low": "3.4000",
                  "4. close": "3.4750",
                  "5. volume": "100155135"
              },
              "2024-01-23": {
                  "1. open": "3.3600",
                  "2. high": "3.8200",
                  "3. low": "3.1200",
                  "4. close": "3.7200",
                  "5. volume": "158726451"
              },
              "2024-01-22": {
                  "1. open": "2.8500",
                  "2. high": "3.0700",
                  "3. low": "2.7000",
                  "4. close": "2.8400",
                  "5. volume": "65531515"
              },
              "2024-01-19": {
                  "1. open": "2.5000",
                  "2. high": "2.6800",
                  "3. low": "2.3900",
                  "4. close": "2.6800",
                  "5. volume": "56283096"
              },
              "2024-01-18": {
                  "1. open": "2.3000",
                  "2. high": "2.5450",
                  "3. low": "2.2625",
                  "4. close": "2.4200",
                  "5. volume": "98181710"
              },
              "2024-01-17": {
                  "1. open": "2.9200",
                  "2. high": "2.9900",
                  "3. low": "2.6300",
                  "4. close": "2.7350",
                  "5. volume": "68910049"
              },
              "2024-01-16": {
                  "1. open": "3.3700",
                  "2. high": "3.3788",
                  "3. low": "3.0000",
                  "4. close": "3.0400",
                  "5. volume": "43668517"
              },
              "2024-01-12": {
                  "1. open": "3.7500",
                  "2. high": "3.7982",
                  "3. low": "3.4300",
                  "4. close": "3.4400",
                  "5. volume": "32102031"
              },
              "2024-01-11": {
                  "1. open": "3.9000",
                  "2. high": "3.9400",
                  "3. low": "3.6300",
                  "4. close": "3.7200",
                  "5. volume": "45007354"
              },
              "2024-01-10": {
                  "1. open": "4.1800",
                  "2. high": "4.2000",
                  "3. low": "3.9000",
                  "4. close": "4.0400",
                  "5. volume": "32855479"
              },
              "2024-01-09": {
                  "1. open": "4.2500",
                  "2. high": "4.3050",
                  "3. low": "4.1800",
                  "4. close": "4.2000",
                  "5. volume": "20549059"
              },
              "2024-01-08": {
                  "1. open": "4.2900",
                  "2. high": "4.4200",
                  "3. low": "4.1700",
                  "4. close": "4.3500",
                  "5. volume": "25230712"
              },
              "2024-01-05": {
                  "1. open": "4.2600",
                  "2. high": "4.5600",
                  "3. low": "4.1700",
                  "4. close": "4.2500",
                  "5. volume": "28439739"
              },
              "2024-01-04": {
                  "1. open": "4.3800",
                  "2. high": "4.4700",
                  "3. low": "4.2650",
                  "4. close": "4.2900",
                  "5. volume": "26985139"
              },
              "2024-01-03": {
                  "1. open": "4.5000",
                  "2. high": "4.5300",
                  "3. low": "4.1600",
                  "4. close": "4.3800",
                  "5. volume": "46730818"
              },
              "2024-01-02": {
                  "1. open": "4.4400",
                  "2. high": "4.8471",
                  "3. low": "4.3900",
                  "4. close": "4.5900",
                  "5. volume": "30653396"
              },
              "2023-12-29": {
                  "1. open": "4.7000",
                  "2. high": "4.7200",
                  "3. low": "4.5000",
                  "4. close": "4.5000",
                  "5. volume": "19821838"
              },
              "2023-12-28": {
                  "1. open": "4.6800",
                  "2. high": "4.8300",
                  "3. low": "4.6100",
                  "4. close": "4.7100",
                  "5. volume": "22007061"
              },
              "2023-12-27": {
                  "1. open": "4.8300",
                  "2. high": "4.8500",
                  "3. low": "4.6900",
                  "4. close": "4.7100",
                  "5. volume": "24016404"
              },
              "2023-12-26": {
                  "1. open": "4.5800",
                  "2. high": "4.8500",
                  "3. low": "4.5400",
                  "4. close": "4.7800",
                  "5. volume": "27308300"
              },
              "2023-12-22": {
                  "1. open": "4.3000",
                  "2. high": "4.5987",
                  "3. low": "4.2300",
                  "4. close": "4.5200",
                  "5. volume": "34895433"
              },
              "2023-12-21": {
                  "1. open": "4.3000",
                  "2. high": "4.4800",
                  "3. low": "4.3000",
                  "4. close": "4.4100",
                  "5. volume": "25779163"
              },
              "2023-12-20": {
                  "1. open": "4.3800",
                  "2. high": "4.6298",
                  "3. low": "4.1400",
                  "4. close": "4.1600",
                  "5. volume": "34216348"
              },
              "2023-12-19": {
                  "1. open": "4.2600",
                  "2. high": "4.5581",
                  "3. low": "4.2600",
                  "4. close": "4.4100",
                  "5. volume": "32675172"
              },
              "2023-12-18": {
                  "1. open": "4.6100",
                  "2. high": "4.7800",
                  "3. low": "4.4200",
                  "4. close": "4.4300",
                  "5. volume": "31218502"
              },
              "2023-12-15": {
                  "1. open": "4.9500",
                  "2. high": "4.9900",
                  "3. low": "4.5301",
                  "4. close": "4.7100",
                  "5. volume": "46348977"
              },
              "2023-12-14": {
                  "1. open": "4.5800",
                  "2. high": "4.9600",
                  "3. low": "4.5799",
                  "4. close": "4.7900",
                  "5. volume": "67874943"
              },
              "2023-12-13": {
                  "1. open": "3.8700",
                  "2. high": "4.3500",
                  "3. low": "3.7700",
                  "4. close": "4.3100",
                  "5. volume": "34442032"
              },
              "2023-12-12": {
                  "1. open": "4.0300",
                  "2. high": "4.0400",
                  "3. low": "3.8000",
                  "4. close": "3.9300",
                  "5. volume": "29558006"
              },
              "2023-12-11": {
                  "1. open": "4.0000",
                  "2. high": "4.1400",
                  "3. low": "3.9200",
                  "4. close": "4.0900",
                  "5. volume": "23299349"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "ICCH",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "15.9800",
                  "2. high": "15.9800",
                  "3. low": "15.9800",
                  "4. close": "15.9800",
                  "5. volume": "118"
              },
              "2024-05-02": {
                  "1. open": "15.9800",
                  "2. high": "15.9800",
                  "3. low": "15.9800",
                  "4. close": "15.9800",
                  "5. volume": "27"
              },
              "2024-05-01": {
                  "1. open": "15.9800",
                  "2. high": "15.9800",
                  "3. low": "15.9800",
                  "4. close": "15.9800",
                  "5. volume": "4"
              },
              "2024-04-30": {
                  "1. open": "15.9800",
                  "2. high": "15.9800",
                  "3. low": "15.9800",
                  "4. close": "15.9800",
                  "5. volume": "7"
              },
              "2024-04-29": {
                  "1. open": "15.9800",
                  "2. high": "15.9800",
                  "3. low": "15.9800",
                  "4. close": "15.9800",
                  "5. volume": "460"
              },
              "2024-04-26": {
                  "1. open": "16.0000",
                  "2. high": "16.0000",
                  "3. low": "16.0000",
                  "4. close": "16.0000",
                  "5. volume": "0"
              },
              "2024-04-25": {
                  "1. open": "16.0000",
                  "2. high": "16.0000",
                  "3. low": "16.0000",
                  "4. close": "16.0000",
                  "5. volume": "1144"
              },
              "2024-04-24": {
                  "1. open": "15.9516",
                  "2. high": "15.9516",
                  "3. low": "15.9516",
                  "4. close": "15.9516",
                  "5. volume": "2"
              },
              "2024-04-23": {
                  "1. open": "15.9516",
                  "2. high": "15.9516",
                  "3. low": "15.9516",
                  "4. close": "15.9516",
                  "5. volume": "14"
              },
              "2024-04-22": {
                  "1. open": "15.9516",
                  "2. high": "15.9516",
                  "3. low": "15.9516",
                  "4. close": "15.9516",
                  "5. volume": "17"
              },
              "2024-04-19": {
                  "1. open": "15.9516",
                  "2. high": "15.9516",
                  "3. low": "15.9516",
                  "4. close": "15.9516",
                  "5. volume": "75"
              },
              "2024-04-18": {
                  "1. open": "15.9516",
                  "2. high": "15.9516",
                  "3. low": "15.9516",
                  "4. close": "15.9516",
                  "5. volume": "37"
              },
              "2024-04-17": {
                  "1. open": "16.0000",
                  "2. high": "16.0000",
                  "3. low": "15.9516",
                  "4. close": "15.9516",
                  "5. volume": "1596"
              },
              "2024-04-16": {
                  "1. open": "16.0000",
                  "2. high": "16.0000",
                  "3. low": "16.0000",
                  "4. close": "16.0000",
                  "5. volume": "1020"
              },
              "2024-04-15": {
                  "1. open": "16.0000",
                  "2. high": "16.0000",
                  "3. low": "16.0000",
                  "4. close": "16.0000",
                  "5. volume": "1022"
              },
              "2024-04-12": {
                  "1. open": "16.0000",
                  "2. high": "16.0000",
                  "3. low": "16.0000",
                  "4. close": "16.0000",
                  "5. volume": "1124"
              },
              "2024-04-11": {
                  "1. open": "16.0000",
                  "2. high": "16.0000",
                  "3. low": "16.0000",
                  "4. close": "16.0000",
                  "5. volume": "140"
              },
              "2024-04-10": {
                  "1. open": "15.8600",
                  "2. high": "15.8600",
                  "3. low": "15.8600",
                  "4. close": "15.8600",
                  "5. volume": "38"
              },
              "2024-04-09": {
                  "1. open": "15.8000",
                  "2. high": "15.8700",
                  "3. low": "15.8000",
                  "4. close": "15.8600",
                  "5. volume": "2219"
              },
              "2024-04-08": {
                  "1. open": "15.7500",
                  "2. high": "15.7500",
                  "3. low": "15.7500",
                  "4. close": "15.7500",
                  "5. volume": "139"
              },
              "2024-04-05": {
                  "1. open": "15.7500",
                  "2. high": "15.7500",
                  "3. low": "15.7500",
                  "4. close": "15.7500",
                  "5. volume": "47"
              },
              "2024-04-04": {
                  "1. open": "15.7500",
                  "2. high": "15.7500",
                  "3. low": "15.7500",
                  "4. close": "15.7500",
                  "5. volume": "67"
              },
              "2024-04-03": {
                  "1. open": "15.8500",
                  "2. high": "15.8500",
                  "3. low": "15.7500",
                  "4. close": "15.7500",
                  "5. volume": "217"
              },
              "2024-04-02": {
                  "1. open": "16.0000",
                  "2. high": "16.0000",
                  "3. low": "15.8800",
                  "4. close": "15.8900",
                  "5. volume": "1834"
              },
              "2024-04-01": {
                  "1. open": "16.0000",
                  "2. high": "16.0000",
                  "3. low": "15.9965",
                  "4. close": "16.0000",
                  "5. volume": "7365"
              },
              "2024-03-28": {
                  "1. open": "16.0000",
                  "2. high": "16.0000",
                  "3. low": "15.9900",
                  "4. close": "15.9963",
                  "5. volume": "13185"
              },
              "2024-03-27": {
                  "1. open": "15.6574",
                  "2. high": "16.0000",
                  "3. low": "15.5300",
                  "4. close": "16.0000",
                  "5. volume": "2405"
              },
              "2024-03-26": {
                  "1. open": "16.0000",
                  "2. high": "16.0000",
                  "3. low": "16.0000",
                  "4. close": "16.0000",
                  "5. volume": "77"
              },
              "2024-03-25": {
                  "1. open": "15.5000",
                  "2. high": "16.0000",
                  "3. low": "15.2750",
                  "4. close": "16.0000",
                  "5. volume": "4916"
              },
              "2024-03-22": {
                  "1. open": "15.5000",
                  "2. high": "15.5000",
                  "3. low": "15.5000",
                  "4. close": "15.5000",
                  "5. volume": "108"
              },
              "2024-03-21": {
                  "1. open": "15.4900",
                  "2. high": "15.5000",
                  "3. low": "15.4900",
                  "4. close": "15.5000",
                  "5. volume": "1153"
              },
              "2024-03-20": {
                  "1. open": "15.3700",
                  "2. high": "15.3700",
                  "3. low": "15.3700",
                  "4. close": "15.3700",
                  "5. volume": "0"
              },
              "2024-03-19": {
                  "1. open": "15.3700",
                  "2. high": "15.3700",
                  "3. low": "15.3700",
                  "4. close": "15.3700",
                  "5. volume": "286"
              },
              "2024-03-18": {
                  "1. open": "14.9600",
                  "2. high": "14.9600",
                  "3. low": "14.9600",
                  "4. close": "14.9600",
                  "5. volume": "367"
              },
              "2024-03-15": {
                  "1. open": "15.0500",
                  "2. high": "15.0500",
                  "3. low": "15.0500",
                  "4. close": "15.0500",
                  "5. volume": "273"
              },
              "2024-03-14": {
                  "1. open": "15.0500",
                  "2. high": "15.0500",
                  "3. low": "15.0500",
                  "4. close": "15.0500",
                  "5. volume": "51"
              },
              "2024-03-13": {
                  "1. open": "15.0500",
                  "2. high": "15.0500",
                  "3. low": "15.0500",
                  "4. close": "15.0500",
                  "5. volume": "162"
              },
              "2024-03-12": {
                  "1. open": "15.5000",
                  "2. high": "15.5000",
                  "3. low": "15.5000",
                  "4. close": "15.5000",
                  "5. volume": "22"
              },
              "2024-03-11": {
                  "1. open": "15.4800",
                  "2. high": "15.5000",
                  "3. low": "15.2600",
                  "4. close": "15.5000",
                  "5. volume": "3043"
              },
              "2024-03-08": {
                  "1. open": "15.2000",
                  "2. high": "15.2000",
                  "3. low": "15.2000",
                  "4. close": "15.2000",
                  "5. volume": "7"
              },
              "2024-03-07": {
                  "1. open": "14.9900",
                  "2. high": "15.2000",
                  "3. low": "14.9900",
                  "4. close": "15.2000",
                  "5. volume": "8431"
              },
              "2024-03-06": {
                  "1. open": "15.0000",
                  "2. high": "15.0000",
                  "3. low": "15.0000",
                  "4. close": "15.0000",
                  "5. volume": "17"
              },
              "2024-03-05": {
                  "1. open": "15.0000",
                  "2. high": "15.0000",
                  "3. low": "15.0000",
                  "4. close": "15.0000",
                  "5. volume": "1794"
              },
              "2024-03-04": {
                  "1. open": "14.7800",
                  "2. high": "14.7800",
                  "3. low": "14.7800",
                  "4. close": "14.7800",
                  "5. volume": "480"
              },
              "2024-03-01": {
                  "1. open": "15.1699",
                  "2. high": "15.1699",
                  "3. low": "14.7800",
                  "4. close": "14.7800",
                  "5. volume": "1072"
              },
              "2024-02-29": {
                  "1. open": "15.2300",
                  "2. high": "15.2300",
                  "3. low": "15.2300",
                  "4. close": "15.2300",
                  "5. volume": "226"
              },
              "2024-02-28": {
                  "1. open": "15.2300",
                  "2. high": "15.2300",
                  "3. low": "15.2300",
                  "4. close": "15.2300",
                  "5. volume": "15"
              },
              "2024-02-27": {
                  "1. open": "15.2300",
                  "2. high": "15.2300",
                  "3. low": "15.2300",
                  "4. close": "15.2300",
                  "5. volume": "19"
              },
              "2024-02-26": {
                  "1. open": "15.2300",
                  "2. high": "15.2300",
                  "3. low": "15.2300",
                  "4. close": "15.2300",
                  "5. volume": "18"
              },
              "2024-02-23": {
                  "1. open": "15.2300",
                  "2. high": "15.2300",
                  "3. low": "15.2300",
                  "4. close": "15.2300",
                  "5. volume": "233"
              },
              "2024-02-22": {
                  "1. open": "15.2300",
                  "2. high": "15.2300",
                  "3. low": "15.2300",
                  "4. close": "15.2300",
                  "5. volume": "9"
              },
              "2024-02-21": {
                  "1. open": "15.2300",
                  "2. high": "15.2300",
                  "3. low": "15.2300",
                  "4. close": "15.2300",
                  "5. volume": "24"
              },
              "2024-02-20": {
                  "1. open": "15.2300",
                  "2. high": "15.2300",
                  "3. low": "15.2300",
                  "4. close": "15.2300",
                  "5. volume": "335"
              },
              "2024-02-16": {
                  "1. open": "15.2300",
                  "2. high": "15.2300",
                  "3. low": "15.2300",
                  "4. close": "15.2300",
                  "5. volume": "103"
              },
              "2024-02-15": {
                  "1. open": "15.2300",
                  "2. high": "15.2300",
                  "3. low": "15.2300",
                  "4. close": "15.2300",
                  "5. volume": "112"
              },
              "2024-02-14": {
                  "1. open": "15.4100",
                  "2. high": "15.4100",
                  "3. low": "15.4100",
                  "4. close": "15.4100",
                  "5. volume": "9"
              },
              "2024-02-13": {
                  "1. open": "15.4100",
                  "2. high": "15.4100",
                  "3. low": "15.4100",
                  "4. close": "15.4100",
                  "5. volume": "40"
              },
              "2024-02-12": {
                  "1. open": "15.4100",
                  "2. high": "15.4100",
                  "3. low": "15.4100",
                  "4. close": "15.4100",
                  "5. volume": "170"
              },
              "2024-02-09": {
                  "1. open": "15.4100",
                  "2. high": "15.4100",
                  "3. low": "15.4100",
                  "4. close": "15.4100",
                  "5. volume": "1"
              },
              "2024-02-08": {
                  "1. open": "15.4100",
                  "2. high": "15.4100",
                  "3. low": "15.4100",
                  "4. close": "15.4100",
                  "5. volume": "415"
              },
              "2024-02-07": {
                  "1. open": "15.4100",
                  "2. high": "15.4100",
                  "3. low": "15.4100",
                  "4. close": "15.4100",
                  "5. volume": "2"
              },
              "2024-02-06": {
                  "1. open": "15.7000",
                  "2. high": "15.7000",
                  "3. low": "15.4100",
                  "4. close": "15.4100",
                  "5. volume": "4217"
              },
              "2024-02-05": {
                  "1. open": "15.7000",
                  "2. high": "15.7000",
                  "3. low": "15.7000",
                  "4. close": "15.7000",
                  "5. volume": "7"
              },
              "2024-02-02": {
                  "1. open": "15.7000",
                  "2. high": "15.7000",
                  "3. low": "15.7000",
                  "4. close": "15.7000",
                  "5. volume": "2"
              },
              "2024-02-01": {
                  "1. open": "15.7000",
                  "2. high": "15.7000",
                  "3. low": "15.7000",
                  "4. close": "15.7000",
                  "5. volume": "24"
              },
              "2024-01-31": {
                  "1. open": "15.7000",
                  "2. high": "15.7000",
                  "3. low": "15.7000",
                  "4. close": "15.7000",
                  "5. volume": "6"
              },
              "2024-01-30": {
                  "1. open": "15.7000",
                  "2. high": "15.7000",
                  "3. low": "15.7000",
                  "4. close": "15.7000",
                  "5. volume": "18"
              },
              "2024-01-29": {
                  "1. open": "15.7000",
                  "2. high": "15.7000",
                  "3. low": "15.7000",
                  "4. close": "15.7000",
                  "5. volume": "3"
              },
              "2024-01-26": {
                  "1. open": "15.7000",
                  "2. high": "15.7000",
                  "3. low": "15.7000",
                  "4. close": "15.7000",
                  "5. volume": "2"
              },
              "2024-01-25": {
                  "1. open": "15.7000",
                  "2. high": "15.7000",
                  "3. low": "15.7000",
                  "4. close": "15.7000",
                  "5. volume": "293"
              },
              "2024-01-24": {
                  "1. open": "15.8000",
                  "2. high": "15.8000",
                  "3. low": "15.8000",
                  "4. close": "15.8000",
                  "5. volume": "83"
              },
              "2024-01-23": {
                  "1. open": "15.8000",
                  "2. high": "15.8000",
                  "3. low": "15.8000",
                  "4. close": "15.8000",
                  "5. volume": "67"
              },
              "2024-01-22": {
                  "1. open": "15.8500",
                  "2. high": "15.8500",
                  "3. low": "15.8000",
                  "4. close": "15.8000",
                  "5. volume": "1114"
              },
              "2024-01-19": {
                  "1. open": "15.3900",
                  "2. high": "15.3900",
                  "3. low": "15.3900",
                  "4. close": "15.3900",
                  "5. volume": "242"
              },
              "2024-01-18": {
                  "1. open": "15.8200",
                  "2. high": "15.8200",
                  "3. low": "15.8200",
                  "4. close": "15.8200",
                  "5. volume": "114"
              },
              "2024-01-17": {
                  "1. open": "15.8200",
                  "2. high": "15.8200",
                  "3. low": "15.8200",
                  "4. close": "15.8200",
                  "5. volume": "101"
              },
              "2024-01-16": {
                  "1. open": "15.1800",
                  "2. high": "15.1800",
                  "3. low": "15.1800",
                  "4. close": "15.1800",
                  "5. volume": "20"
              },
              "2024-01-12": {
                  "1. open": "15.1800",
                  "2. high": "15.1800",
                  "3. low": "15.1800",
                  "4. close": "15.1800",
                  "5. volume": "20"
              },
              "2024-01-11": {
                  "1. open": "15.1800",
                  "2. high": "15.1800",
                  "3. low": "15.1800",
                  "4. close": "15.1800",
                  "5. volume": "533"
              },
              "2024-01-10": {
                  "1. open": "15.4525",
                  "2. high": "15.4525",
                  "3. low": "15.4525",
                  "4. close": "15.4525",
                  "5. volume": "7"
              },
              "2024-01-09": {
                  "1. open": "15.5800",
                  "2. high": "15.5800",
                  "3. low": "15.2500",
                  "4. close": "15.4525",
                  "5. volume": "2196"
              },
              "2024-01-08": {
                  "1. open": "15.9323",
                  "2. high": "15.9323",
                  "3. low": "15.9323",
                  "4. close": "15.9323",
                  "5. volume": "17"
              },
              "2024-01-05": {
                  "1. open": "15.9323",
                  "2. high": "15.9323",
                  "3. low": "15.9323",
                  "4. close": "15.9323",
                  "5. volume": "154"
              },
              "2024-01-04": {
                  "1. open": "15.9900",
                  "2. high": "15.9900",
                  "3. low": "15.9900",
                  "4. close": "15.9900",
                  "5. volume": "54"
              },
              "2024-01-03": {
                  "1. open": "15.9900",
                  "2. high": "15.9900",
                  "3. low": "15.9900",
                  "4. close": "15.9900",
                  "5. volume": "330"
              },
              "2024-01-02": {
                  "1. open": "15.5000",
                  "2. high": "15.5000",
                  "3. low": "15.4999",
                  "4. close": "15.4999",
                  "5. volume": "220"
              },
              "2023-12-29": {
                  "1. open": "15.3000",
                  "2. high": "15.3000",
                  "3. low": "15.3000",
                  "4. close": "15.3000",
                  "5. volume": "341"
              },
              "2023-12-28": {
                  "1. open": "15.2600",
                  "2. high": "15.2600",
                  "3. low": "15.2600",
                  "4. close": "15.2600",
                  "5. volume": "57"
              },
              "2023-12-27": {
                  "1. open": "15.2600",
                  "2. high": "15.2600",
                  "3. low": "15.2600",
                  "4. close": "15.2600",
                  "5. volume": "20"
              },
              "2023-12-26": {
                  "1. open": "15.2600",
                  "2. high": "15.2600",
                  "3. low": "15.2600",
                  "4. close": "15.2600",
                  "5. volume": "20"
              },
              "2023-12-22": {
                  "1. open": "15.2600",
                  "2. high": "15.2600",
                  "3. low": "15.2600",
                  "4. close": "15.2600",
                  "5. volume": "26"
              },
              "2023-12-21": {
                  "1. open": "15.2600",
                  "2. high": "15.2600",
                  "3. low": "15.2600",
                  "4. close": "15.2600",
                  "5. volume": "56"
              },
              "2023-12-20": {
                  "1. open": "15.2600",
                  "2. high": "15.2600",
                  "3. low": "15.2600",
                  "4. close": "15.2600",
                  "5. volume": "344"
              },
              "2023-12-19": {
                  "1. open": "15.3100",
                  "2. high": "15.3100",
                  "3. low": "15.3100",
                  "4. close": "15.3100",
                  "5. volume": "160"
              },
              "2023-12-18": {
                  "1. open": "16.0000",
                  "2. high": "16.0000",
                  "3. low": "16.0000",
                  "4. close": "16.0000",
                  "5. volume": "3"
              },
              "2023-12-15": {
                  "1. open": "15.5000",
                  "2. high": "16.0000",
                  "3. low": "15.5000",
                  "4. close": "16.0000",
                  "5. volume": "24782"
              },
              "2023-12-14": {
                  "1. open": "15.2500",
                  "2. high": "15.2500",
                  "3. low": "15.2500",
                  "4. close": "15.2500",
                  "5. volume": "121"
              },
              "2023-12-13": {
                  "1. open": "15.5000",
                  "2. high": "15.5000",
                  "3. low": "15.2500",
                  "4. close": "15.2500",
                  "5. volume": "1613"
              },
              "2023-12-12": {
                  "1. open": "15.2500",
                  "2. high": "15.2500",
                  "3. low": "15.2500",
                  "4. close": "15.2500",
                  "5. volume": "129"
              },
              "2023-12-11": {
                  "1. open": "15.5000",
                  "2. high": "15.5000",
                  "3. low": "15.5000",
                  "4. close": "15.5000",
                  "5. volume": "3504"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "FROG",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "40.6900",
                  "2. high": "41.0400",
                  "3. low": "39.7750",
                  "4. close": "39.8900",
                  "5. volume": "657423"
              },
              "2024-05-02": {
                  "1. open": "39.9700",
                  "2. high": "40.1100",
                  "3. low": "38.6500",
                  "4. close": "39.7200",
                  "5. volume": "402899"
              },
              "2024-05-01": {
                  "1. open": "40.0500",
                  "2. high": "40.9500",
                  "3. low": "39.1500",
                  "4. close": "39.4800",
                  "5. volume": "732919"
              },
              "2024-04-30": {
                  "1. open": "40.4600",
                  "2. high": "41.0538",
                  "3. low": "39.6800",
                  "4. close": "39.8800",
                  "5. volume": "593268"
              },
              "2024-04-29": {
                  "1. open": "42.0000",
                  "2. high": "42.1800",
                  "3. low": "40.6800",
                  "4. close": "40.9300",
                  "5. volume": "827648"
              },
              "2024-04-26": {
                  "1. open": "41.1300",
                  "2. high": "42.4400",
                  "3. low": "40.8600",
                  "4. close": "41.9900",
                  "5. volume": "1228791"
              },
              "2024-04-25": {
                  "1. open": "38.4700",
                  "2. high": "40.6800",
                  "3. low": "38.4600",
                  "4. close": "40.4700",
                  "5. volume": "995574"
              },
              "2024-04-24": {
                  "1. open": "39.9100",
                  "2. high": "40.6200",
                  "3. low": "39.2100",
                  "4. close": "39.8300",
                  "5. volume": "1023246"
              },
              "2024-04-23": {
                  "1. open": "37.7900",
                  "2. high": "39.3300",
                  "3. low": "37.7900",
                  "4. close": "39.1700",
                  "5. volume": "727314"
              },
              "2024-04-22": {
                  "1. open": "37.4100",
                  "2. high": "37.9350",
                  "3. low": "36.9300",
                  "4. close": "37.7400",
                  "5. volume": "601791"
              },
              "2024-04-19": {
                  "1. open": "37.6200",
                  "2. high": "37.8600",
                  "3. low": "36.9200",
                  "4. close": "37.1400",
                  "5. volume": "610424"
              },
              "2024-04-18": {
                  "1. open": "37.9900",
                  "2. high": "38.8800",
                  "3. low": "37.2400",
                  "4. close": "37.9400",
                  "5. volume": "706342"
              },
              "2024-04-17": {
                  "1. open": "37.7900",
                  "2. high": "38.7550",
                  "3. low": "37.7900",
                  "4. close": "38.0300",
                  "5. volume": "978424"
              },
              "2024-04-16": {
                  "1. open": "37.3200",
                  "2. high": "37.7800",
                  "3. low": "36.4600",
                  "4. close": "37.4900",
                  "5. volume": "705643"
              },
              "2024-04-15": {
                  "1. open": "38.7300",
                  "2. high": "39.0500",
                  "3. low": "37.3500",
                  "4. close": "37.4500",
                  "5. volume": "987289"
              },
              "2024-04-12": {
                  "1. open": "39.9100",
                  "2. high": "40.0300",
                  "3. low": "38.2200",
                  "4. close": "38.6000",
                  "5. volume": "997081"
              },
              "2024-04-11": {
                  "1. open": "41.1200",
                  "2. high": "41.3800",
                  "3. low": "40.0400",
                  "4. close": "40.2800",
                  "5. volume": "1294400"
              },
              "2024-04-10": {
                  "1. open": "41.0900",
                  "2. high": "41.5800",
                  "3. low": "40.8500",
                  "4. close": "40.9300",
                  "5. volume": "670714"
              },
              "2024-04-09": {
                  "1. open": "42.9300",
                  "2. high": "43.4900",
                  "3. low": "41.3600",
                  "4. close": "42.1200",
                  "5. volume": "882636"
              },
              "2024-04-08": {
                  "1. open": "43.5100",
                  "2. high": "43.6700",
                  "3. low": "42.9500",
                  "4. close": "43.0200",
                  "5. volume": "374735"
              },
              "2024-04-05": {
                  "1. open": "42.6800",
                  "2. high": "43.3500",
                  "3. low": "42.1450",
                  "4. close": "43.0900",
                  "5. volume": "577152"
              },
              "2024-04-04": {
                  "1. open": "43.9900",
                  "2. high": "44.6100",
                  "3. low": "42.6100",
                  "4. close": "42.6600",
                  "5. volume": "791764"
              },
              "2024-04-03": {
                  "1. open": "43.0400",
                  "2. high": "43.7800",
                  "3. low": "42.3300",
                  "4. close": "43.2800",
                  "5. volume": "749923"
              },
              "2024-04-02": {
                  "1. open": "43.0000",
                  "2. high": "43.5450",
                  "3. low": "42.0000",
                  "4. close": "43.4000",
                  "5. volume": "879814"
              },
              "2024-04-01": {
                  "1. open": "44.5700",
                  "2. high": "45.9400",
                  "3. low": "43.4430",
                  "4. close": "44.3100",
                  "5. volume": "1207501"
              },
              "2024-03-28": {
                  "1. open": "44.0800",
                  "2. high": "44.6200",
                  "3. low": "43.5401",
                  "4. close": "44.2200",
                  "5. volume": "1110311"
              },
              "2024-03-27": {
                  "1. open": "44.6700",
                  "2. high": "44.7100",
                  "3. low": "42.6500",
                  "4. close": "43.9200",
                  "5. volume": "1076538"
              },
              "2024-03-26": {
                  "1. open": "43.2200",
                  "2. high": "44.9000",
                  "3. low": "43.0100",
                  "4. close": "44.2200",
                  "5. volume": "1057608"
              },
              "2024-03-25": {
                  "1. open": "44.0400",
                  "2. high": "44.5600",
                  "3. low": "43.0100",
                  "4. close": "43.1200",
                  "5. volume": "929724"
              },
              "2024-03-22": {
                  "1. open": "44.1300",
                  "2. high": "44.1900",
                  "3. low": "43.3000",
                  "4. close": "44.0900",
                  "5. volume": "597100"
              },
              "2024-03-21": {
                  "1. open": "45.7500",
                  "2. high": "46.6500",
                  "3. low": "43.9200",
                  "4. close": "44.3100",
                  "5. volume": "1484943"
              },
              "2024-03-20": {
                  "1. open": "42.9050",
                  "2. high": "44.6900",
                  "3. low": "42.3400",
                  "4. close": "44.6500",
                  "5. volume": "1191198"
              },
              "2024-03-19": {
                  "1. open": "42.8600",
                  "2. high": "43.0300",
                  "3. low": "42.0600",
                  "4. close": "42.9600",
                  "5. volume": "868076"
              },
              "2024-03-18": {
                  "1. open": "42.3900",
                  "2. high": "43.5500",
                  "3. low": "42.3900",
                  "4. close": "43.1100",
                  "5. volume": "914692"
              },
              "2024-03-15": {
                  "1. open": "42.2800",
                  "2. high": "42.6485",
                  "3. low": "41.8044",
                  "4. close": "42.2000",
                  "5. volume": "960127"
              },
              "2024-03-14": {
                  "1. open": "42.5800",
                  "2. high": "43.4600",
                  "3. low": "41.7600",
                  "4. close": "42.4400",
                  "5. volume": "691449"
              },
              "2024-03-13": {
                  "1. open": "42.8000",
                  "2. high": "44.0900",
                  "3. low": "42.5100",
                  "4. close": "42.7500",
                  "5. volume": "902623"
              },
              "2024-03-12": {
                  "1. open": "41.8200",
                  "2. high": "42.9700",
                  "3. low": "41.2400",
                  "4. close": "42.7000",
                  "5. volume": "974426"
              },
              "2024-03-11": {
                  "1. open": "42.0400",
                  "2. high": "42.2800",
                  "3. low": "41.3000",
                  "4. close": "41.7200",
                  "5. volume": "607217"
              },
              "2024-03-08": {
                  "1. open": "43.1000",
                  "2. high": "43.6000",
                  "3. low": "41.8500",
                  "4. close": "42.3800",
                  "5. volume": "735806"
              },
              "2024-03-07": {
                  "1. open": "42.8700",
                  "2. high": "43.4900",
                  "3. low": "42.6700",
                  "4. close": "42.7700",
                  "5. volume": "901512"
              },
              "2024-03-06": {
                  "1. open": "42.3600",
                  "2. high": "43.3999",
                  "3. low": "41.8100",
                  "4. close": "42.6800",
                  "5. volume": "1036899"
              },
              "2024-03-05": {
                  "1. open": "42.7300",
                  "2. high": "42.8000",
                  "3. low": "40.6800",
                  "4. close": "41.5900",
                  "5. volume": "1812275"
              },
              "2024-03-04": {
                  "1. open": "45.0000",
                  "2. high": "45.0200",
                  "3. low": "43.2200",
                  "4. close": "43.6400",
                  "5. volume": "1481372"
              },
              "2024-03-01": {
                  "1. open": "44.6100",
                  "2. high": "45.4000",
                  "3. low": "43.8500",
                  "4. close": "45.0100",
                  "5. volume": "1373609"
              },
              "2024-02-29": {
                  "1. open": "44.9100",
                  "2. high": "45.0000",
                  "3. low": "43.7900",
                  "4. close": "44.7900",
                  "5. volume": "1274505"
              },
              "2024-02-28": {
                  "1. open": "43.9700",
                  "2. high": "45.0003",
                  "3. low": "43.5500",
                  "4. close": "44.8000",
                  "5. volume": "995520"
              },
              "2024-02-27": {
                  "1. open": "44.4000",
                  "2. high": "44.9800",
                  "3. low": "44.1700",
                  "4. close": "44.4000",
                  "5. volume": "1111912"
              },
              "2024-02-26": {
                  "1. open": "43.5000",
                  "2. high": "44.8399",
                  "3. low": "43.2900",
                  "4. close": "44.2100",
                  "5. volume": "1359605"
              },
              "2024-02-23": {
                  "1. open": "43.9500",
                  "2. high": "44.4000",
                  "3. low": "43.2150",
                  "4. close": "43.3800",
                  "5. volume": "1193987"
              },
              "2024-02-22": {
                  "1. open": "41.4000",
                  "2. high": "44.3791",
                  "3. low": "41.4000",
                  "4. close": "43.8000",
                  "5. volume": "3300882"
              },
              "2024-02-21": {
                  "1. open": "41.4100",
                  "2. high": "41.9000",
                  "3. low": "40.0209",
                  "4. close": "40.5000",
                  "5. volume": "1949945"
              },
              "2024-02-20": {
                  "1. open": "43.4800",
                  "2. high": "43.4900",
                  "3. low": "41.3300",
                  "4. close": "42.5000",
                  "5. volume": "3140551"
              },
              "2024-02-16": {
                  "1. open": "47.4000",
                  "2. high": "47.4700",
                  "3. low": "44.5020",
                  "4. close": "44.8300",
                  "5. volume": "3035250"
              },
              "2024-02-15": {
                  "1. open": "46.0000",
                  "2. high": "48.8100",
                  "3. low": "44.2500",
                  "4. close": "47.6400",
                  "5. volume": "10412595"
              },
              "2024-02-14": {
                  "1. open": "36.0000",
                  "2. high": "37.1300",
                  "3. low": "35.6900",
                  "4. close": "37.0900",
                  "5. volume": "2493750"
              },
              "2024-02-13": {
                  "1. open": "35.8300",
                  "2. high": "36.7700",
                  "3. low": "34.5000",
                  "4. close": "35.7500",
                  "5. volume": "2224287"
              },
              "2024-02-12": {
                  "1. open": "39.2600",
                  "2. high": "40.4000",
                  "3. low": "37.3100",
                  "4. close": "37.3300",
                  "5. volume": "2986623"
              },
              "2024-02-09": {
                  "1. open": "38.9400",
                  "2. high": "39.4400",
                  "3. low": "38.3000",
                  "4. close": "39.2200",
                  "5. volume": "1877541"
              },
              "2024-02-08": {
                  "1. open": "37.4800",
                  "2. high": "39.4400",
                  "3. low": "36.9380",
                  "4. close": "37.9100",
                  "5. volume": "3107867"
              },
              "2024-02-07": {
                  "1. open": "34.8600",
                  "2. high": "36.4000",
                  "3. low": "34.4401",
                  "4. close": "36.3800",
                  "5. volume": "1299453"
              },
              "2024-02-06": {
                  "1. open": "36.3600",
                  "2. high": "37.1800",
                  "3. low": "34.4394",
                  "4. close": "34.5700",
                  "5. volume": "1918119"
              },
              "2024-02-05": {
                  "1. open": "35.2500",
                  "2. high": "36.3100",
                  "3. low": "34.2350",
                  "4. close": "35.7900",
                  "5. volume": "1891434"
              },
              "2024-02-02": {
                  "1. open": "33.5100",
                  "2. high": "35.0300",
                  "3. low": "33.3300",
                  "4. close": "34.9400",
                  "5. volume": "1567096"
              },
              "2024-02-01": {
                  "1. open": "32.7300",
                  "2. high": "33.6900",
                  "3. low": "32.6800",
                  "4. close": "33.6300",
                  "5. volume": "988373"
              },
              "2024-01-31": {
                  "1. open": "32.6200",
                  "2. high": "33.2700",
                  "3. low": "32.0000",
                  "4. close": "32.5300",
                  "5. volume": "948268"
              },
              "2024-01-30": {
                  "1. open": "33.8300",
                  "2. high": "34.0000",
                  "3. low": "32.3300",
                  "4. close": "32.8100",
                  "5. volume": "654532"
              },
              "2024-01-29": {
                  "1. open": "32.9000",
                  "2. high": "33.6900",
                  "3. low": "32.9000",
                  "4. close": "33.6900",
                  "5. volume": "937924"
              },
              "2024-01-26": {
                  "1. open": "33.2300",
                  "2. high": "33.6200",
                  "3. low": "32.8300",
                  "4. close": "32.9000",
                  "5. volume": "585847"
              },
              "2024-01-25": {
                  "1. open": "34.0500",
                  "2. high": "34.0500",
                  "3. low": "33.0500",
                  "4. close": "33.1800",
                  "5. volume": "739718"
              },
              "2024-01-24": {
                  "1. open": "34.7300",
                  "2. high": "34.7800",
                  "3. low": "33.3900",
                  "4. close": "33.4800",
                  "5. volume": "625387"
              },
              "2024-01-23": {
                  "1. open": "34.4500",
                  "2. high": "35.0000",
                  "3. low": "34.0000",
                  "4. close": "34.1900",
                  "5. volume": "485726"
              },
              "2024-01-22": {
                  "1. open": "34.6900",
                  "2. high": "34.9772",
                  "3. low": "33.5700",
                  "4. close": "34.2400",
                  "5. volume": "702549"
              },
              "2024-01-19": {
                  "1. open": "33.5400",
                  "2. high": "34.1100",
                  "3. low": "32.9600",
                  "4. close": "33.9400",
                  "5. volume": "804530"
              },
              "2024-01-18": {
                  "1. open": "33.6000",
                  "2. high": "33.8900",
                  "3. low": "32.9400",
                  "4. close": "33.2800",
                  "5. volume": "667140"
              },
              "2024-01-17": {
                  "1. open": "32.7100",
                  "2. high": "33.0780",
                  "3. low": "32.2000",
                  "4. close": "33.0100",
                  "5. volume": "427511"
              },
              "2024-01-16": {
                  "1. open": "33.1400",
                  "2. high": "33.5500",
                  "3. low": "32.9500",
                  "4. close": "33.2100",
                  "5. volume": "463397"
              },
              "2024-01-12": {
                  "1. open": "33.5500",
                  "2. high": "33.8400",
                  "3. low": "32.8000",
                  "4. close": "32.9800",
                  "5. volume": "326500"
              },
              "2024-01-11": {
                  "1. open": "33.6000",
                  "2. high": "34.2494",
                  "3. low": "33.2100",
                  "4. close": "33.3300",
                  "5. volume": "488168"
              },
              "2024-01-10": {
                  "1. open": "33.2000",
                  "2. high": "34.2050",
                  "3. low": "33.2000",
                  "4. close": "33.6800",
                  "5. volume": "875225"
              },
              "2024-01-09": {
                  "1. open": "31.9900",
                  "2. high": "33.2850",
                  "3. low": "31.9100",
                  "4. close": "33.0600",
                  "5. volume": "397643"
              },
              "2024-01-08": {
                  "1. open": "31.3400",
                  "2. high": "32.3400",
                  "3. low": "31.3400",
                  "4. close": "32.2000",
                  "5. volume": "372403"
              },
              "2024-01-05": {
                  "1. open": "31.2600",
                  "2. high": "31.7500",
                  "3. low": "31.1302",
                  "4. close": "31.3000",
                  "5. volume": "371853"
              },
              "2024-01-04": {
                  "1. open": "31.8800",
                  "2. high": "32.0899",
                  "3. low": "31.2500",
                  "4. close": "31.4500",
                  "5. volume": "418672"
              },
              "2024-01-03": {
                  "1. open": "33.1100",
                  "2. high": "33.2200",
                  "3. low": "31.8400",
                  "4. close": "32.0500",
                  "5. volume": "613043"
              },
              "2024-01-02": {
                  "1. open": "34.0800",
                  "2. high": "34.2050",
                  "3. low": "33.2700",
                  "4. close": "33.5200",
                  "5. volume": "880339"
              },
              "2023-12-29": {
                  "1. open": "34.8800",
                  "2. high": "35.0200",
                  "3. low": "34.5700",
                  "4. close": "34.6100",
                  "5. volume": "503739"
              },
              "2023-12-28": {
                  "1. open": "34.7400",
                  "2. high": "35.2200",
                  "3. low": "34.5000",
                  "4. close": "34.8800",
                  "5. volume": "338082"
              },
              "2023-12-27": {
                  "1. open": "34.9900",
                  "2. high": "35.0700",
                  "3. low": "34.5500",
                  "4. close": "34.7000",
                  "5. volume": "342447"
              },
              "2023-12-26": {
                  "1. open": "34.6100",
                  "2. high": "35.3500",
                  "3. low": "34.6100",
                  "4. close": "34.9200",
                  "5. volume": "721640"
              },
              "2023-12-22": {
                  "1. open": "35.0000",
                  "2. high": "35.0150",
                  "3. low": "34.2500",
                  "4. close": "34.6800",
                  "5. volume": "792589"
              },
              "2023-12-21": {
                  "1. open": "33.5200",
                  "2. high": "35.0050",
                  "3. low": "33.2100",
                  "4. close": "34.9300",
                  "5. volume": "2366326"
              },
              "2023-12-20": {
                  "1. open": "32.2200",
                  "2. high": "32.4800",
                  "3. low": "31.7800",
                  "4. close": "31.8300",
                  "5. volume": "687517"
              },
              "2023-12-19": {
                  "1. open": "31.8000",
                  "2. high": "32.4300",
                  "3. low": "31.7236",
                  "4. close": "32.3500",
                  "5. volume": "516826"
              },
              "2023-12-18": {
                  "1. open": "31.6100",
                  "2. high": "32.3700",
                  "3. low": "31.4450",
                  "4. close": "31.6300",
                  "5. volume": "569729"
              },
              "2023-12-15": {
                  "1. open": "31.2800",
                  "2. high": "31.5800",
                  "3. low": "30.7300",
                  "4. close": "31.5500",
                  "5. volume": "1030345"
              },
              "2023-12-14": {
                  "1. open": "31.4400",
                  "2. high": "32.2050",
                  "3. low": "30.6000",
                  "4. close": "31.2200",
                  "5. volume": "742745"
              },
              "2023-12-13": {
                  "1. open": "30.1000",
                  "2. high": "30.9700",
                  "3. low": "29.5800",
                  "4. close": "30.8300",
                  "5. volume": "1242317"
              },
              "2023-12-12": {
                  "1. open": "30.1800",
                  "2. high": "30.3800",
                  "3. low": "29.9100",
                  "4. close": "30.2000",
                  "5. volume": "518357"
              },
              "2023-12-11": {
                  "1. open": "29.5100",
                  "2. high": "30.3500",
                  "3. low": "29.2701",
                  "4. close": "30.1800",
                  "5. volume": "669900"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "DHT",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "11.7800",
                  "2. high": "11.8100",
                  "3. low": "11.5300",
                  "4. close": "11.6300",
                  "5. volume": "1682479"
              },
              "2024-05-02": {
                  "1. open": "11.4300",
                  "2. high": "11.7800",
                  "3. low": "11.3800",
                  "4. close": "11.7700",
                  "5. volume": "1467265"
              },
              "2024-05-01": {
                  "1. open": "11.4500",
                  "2. high": "11.5000",
                  "3. low": "11.3010",
                  "4. close": "11.3900",
                  "5. volume": "1303621"
              },
              "2024-04-30": {
                  "1. open": "11.4700",
                  "2. high": "11.5600",
                  "3. low": "11.3500",
                  "4. close": "11.4200",
                  "5. volume": "1179075"
              },
              "2024-04-29": {
                  "1. open": "11.5100",
                  "2. high": "11.5600",
                  "3. low": "11.4301",
                  "4. close": "11.5000",
                  "5. volume": "997979"
              },
              "2024-04-26": {
                  "1. open": "11.5000",
                  "2. high": "11.5800",
                  "3. low": "11.4100",
                  "4. close": "11.5100",
                  "5. volume": "1513040"
              },
              "2024-04-25": {
                  "1. open": "11.2000",
                  "2. high": "11.4800",
                  "3. low": "11.2000",
                  "4. close": "11.4800",
                  "5. volume": "1020067"
              },
              "2024-04-24": {
                  "1. open": "11.3000",
                  "2. high": "11.3700",
                  "3. low": "11.2300",
                  "4. close": "11.2800",
                  "5. volume": "1165609"
              },
              "2024-04-23": {
                  "1. open": "11.1200",
                  "2. high": "11.3700",
                  "3. low": "11.0800",
                  "4. close": "11.3300",
                  "5. volume": "1209259"
              },
              "2024-04-22": {
                  "1. open": "11.2200",
                  "2. high": "11.3000",
                  "3. low": "11.0300",
                  "4. close": "11.1900",
                  "5. volume": "999142"
              },
              "2024-04-19": {
                  "1. open": "11.0700",
                  "2. high": "11.2950",
                  "3. low": "11.0350",
                  "4. close": "11.2600",
                  "5. volume": "1285983"
              },
              "2024-04-18": {
                  "1. open": "11.2800",
                  "2. high": "11.2950",
                  "3. low": "11.0200",
                  "4. close": "11.0600",
                  "5. volume": "1042073"
              },
              "2024-04-17": {
                  "1. open": "11.3000",
                  "2. high": "11.4100",
                  "3. low": "11.2300",
                  "4. close": "11.2800",
                  "5. volume": "1007104"
              },
              "2024-04-16": {
                  "1. open": "11.2000",
                  "2. high": "11.2900",
                  "3. low": "11.0200",
                  "4. close": "11.2500",
                  "5. volume": "1127079"
              },
              "2024-04-15": {
                  "1. open": "11.3900",
                  "2. high": "11.5600",
                  "3. low": "11.2300",
                  "4. close": "11.2900",
                  "5. volume": "812064"
              },
              "2024-04-12": {
                  "1. open": "11.6100",
                  "2. high": "11.7088",
                  "3. low": "11.3300",
                  "4. close": "11.3700",
                  "5. volume": "1999771"
              },
              "2024-04-11": {
                  "1. open": "11.6700",
                  "2. high": "11.7500",
                  "3. low": "11.5300",
                  "4. close": "11.5600",
                  "5. volume": "1271429"
              },
              "2024-04-10": {
                  "1. open": "11.3300",
                  "2. high": "11.5400",
                  "3. low": "11.2800",
                  "4. close": "11.3900",
                  "5. volume": "1940997"
              },
              "2024-04-09": {
                  "1. open": "11.6700",
                  "2. high": "11.7400",
                  "3. low": "11.3100",
                  "4. close": "11.3700",
                  "5. volume": "1179801"
              },
              "2024-04-08": {
                  "1. open": "11.6300",
                  "2. high": "11.6600",
                  "3. low": "11.4150",
                  "4. close": "11.5100",
                  "5. volume": "796577"
              },
              "2024-04-05": {
                  "1. open": "11.8700",
                  "2. high": "11.9200",
                  "3. low": "11.6400",
                  "4. close": "11.6400",
                  "5. volume": "946289"
              },
              "2024-04-04": {
                  "1. open": "11.8300",
                  "2. high": "11.9550",
                  "3. low": "11.8000",
                  "4. close": "11.8100",
                  "5. volume": "1165505"
              },
              "2024-04-03": {
                  "1. open": "11.6200",
                  "2. high": "11.9000",
                  "3. low": "11.6200",
                  "4. close": "11.8800",
                  "5. volume": "1437108"
              },
              "2024-04-02": {
                  "1. open": "11.7200",
                  "2. high": "11.7200",
                  "3. low": "11.5100",
                  "4. close": "11.5800",
                  "5. volume": "1251095"
              },
              "2024-04-01": {
                  "1. open": "11.5600",
                  "2. high": "11.8400",
                  "3. low": "11.5600",
                  "4. close": "11.7600",
                  "5. volume": "2322936"
              },
              "2024-03-28": {
                  "1. open": "11.4300",
                  "2. high": "11.5050",
                  "3. low": "11.3750",
                  "4. close": "11.5000",
                  "5. volume": "1463412"
              },
              "2024-03-27": {
                  "1. open": "11.3000",
                  "2. high": "11.4200",
                  "3. low": "11.3000",
                  "4. close": "11.4200",
                  "5. volume": "1330940"
              },
              "2024-03-26": {
                  "1. open": "11.3600",
                  "2. high": "11.5400",
                  "3. low": "11.3125",
                  "4. close": "11.3400",
                  "5. volume": "1261829"
              },
              "2024-03-25": {
                  "1. open": "11.2200",
                  "2. high": "11.4800",
                  "3. low": "11.1800",
                  "4. close": "11.3700",
                  "5. volume": "1395103"
              },
              "2024-03-22": {
                  "1. open": "11.4500",
                  "2. high": "11.4600",
                  "3. low": "11.1150",
                  "4. close": "11.1500",
                  "5. volume": "2064389"
              },
              "2024-03-21": {
                  "1. open": "11.4300",
                  "2. high": "11.5250",
                  "3. low": "11.1600",
                  "4. close": "11.4400",
                  "5. volume": "3509468"
              },
              "2024-03-20": {
                  "1. open": "10.9000",
                  "2. high": "10.9899",
                  "3. low": "10.7800",
                  "4. close": "10.9300",
                  "5. volume": "2138411"
              },
              "2024-03-19": {
                  "1. open": "11.0100",
                  "2. high": "11.2400",
                  "3. low": "11.0090",
                  "4. close": "11.1100",
                  "5. volume": "1660750"
              },
              "2024-03-18": {
                  "1. open": "11.1700",
                  "2. high": "11.1700",
                  "3. low": "10.9500",
                  "4. close": "11.0900",
                  "5. volume": "1439481"
              },
              "2024-03-15": {
                  "1. open": "11.2000",
                  "2. high": "11.4200",
                  "3. low": "11.1500",
                  "4. close": "11.2200",
                  "5. volume": "2796435"
              },
              "2024-03-14": {
                  "1. open": "10.7900",
                  "2. high": "11.1800",
                  "3. low": "10.7400",
                  "4. close": "11.1700",
                  "5. volume": "1459753"
              },
              "2024-03-13": {
                  "1. open": "10.8500",
                  "2. high": "10.9400",
                  "3. low": "10.7800",
                  "4. close": "10.8100",
                  "5. volume": "1328296"
              },
              "2024-03-12": {
                  "1. open": "10.8400",
                  "2. high": "10.8900",
                  "3. low": "10.7050",
                  "4. close": "10.8200",
                  "5. volume": "1491937"
              },
              "2024-03-11": {
                  "1. open": "11.0400",
                  "2. high": "11.0900",
                  "3. low": "10.8200",
                  "4. close": "10.8600",
                  "5. volume": "1574126"
              },
              "2024-03-08": {
                  "1. open": "11.1000",
                  "2. high": "11.1800",
                  "3. low": "11.0700",
                  "4. close": "11.1000",
                  "5. volume": "727796"
              },
              "2024-03-07": {
                  "1. open": "11.1500",
                  "2. high": "11.2000",
                  "3. low": "11.0450",
                  "4. close": "11.0900",
                  "5. volume": "835130"
              },
              "2024-03-06": {
                  "1. open": "11.2000",
                  "2. high": "11.2750",
                  "3. low": "11.0650",
                  "4. close": "11.1100",
                  "5. volume": "1359575"
              },
              "2024-03-05": {
                  "1. open": "11.1200",
                  "2. high": "11.3400",
                  "3. low": "11.1200",
                  "4. close": "11.2100",
                  "5. volume": "1985011"
              },
              "2024-03-04": {
                  "1. open": "11.0500",
                  "2. high": "11.1300",
                  "3. low": "10.8500",
                  "4. close": "10.9700",
                  "5. volume": "2485513"
              },
              "2024-03-01": {
                  "1. open": "10.8200",
                  "2. high": "11.1200",
                  "3. low": "10.8100",
                  "4. close": "11.0100",
                  "5. volume": "1696434"
              },
              "2024-02-29": {
                  "1. open": "10.7700",
                  "2. high": "10.8686",
                  "3. low": "10.6300",
                  "4. close": "10.8200",
                  "5. volume": "1749766"
              },
              "2024-02-28": {
                  "1. open": "10.7100",
                  "2. high": "10.8800",
                  "3. low": "10.6800",
                  "4. close": "10.7600",
                  "5. volume": "1113344"
              },
              "2024-02-27": {
                  "1. open": "10.7900",
                  "2. high": "10.8000",
                  "3. low": "10.6450",
                  "4. close": "10.6900",
                  "5. volume": "1113411"
              },
              "2024-02-26": {
                  "1. open": "10.7200",
                  "2. high": "10.8650",
                  "3. low": "10.6800",
                  "4. close": "10.8100",
                  "5. volume": "1586111"
              },
              "2024-02-23": {
                  "1. open": "10.8200",
                  "2. high": "10.8400",
                  "3. low": "10.6250",
                  "4. close": "10.7500",
                  "5. volume": "938119"
              },
              "2024-02-22": {
                  "1. open": "10.6900",
                  "2. high": "10.9400",
                  "3. low": "10.6400",
                  "4. close": "10.9300",
                  "5. volume": "1855320"
              },
              "2024-02-21": {
                  "1. open": "11.0100",
                  "2. high": "11.1800",
                  "3. low": "10.7900",
                  "4. close": "10.8300",
                  "5. volume": "1658873"
              },
              "2024-02-20": {
                  "1. open": "11.3100",
                  "2. high": "11.3100",
                  "3. low": "11.0000",
                  "4. close": "11.0300",
                  "5. volume": "1862605"
              },
              "2024-02-16": {
                  "1. open": "11.7300",
                  "2. high": "11.9000",
                  "3. low": "11.5200",
                  "4. close": "11.5300",
                  "5. volume": "2623448"
              },
              "2024-02-15": {
                  "1. open": "11.3000",
                  "2. high": "11.7100",
                  "3. low": "11.1900",
                  "4. close": "11.6800",
                  "5. volume": "2346628"
              },
              "2024-02-14": {
                  "1. open": "11.3900",
                  "2. high": "11.4550",
                  "3. low": "11.1450",
                  "4. close": "11.3000",
                  "5. volume": "1641492"
              },
              "2024-02-13": {
                  "1. open": "11.3700",
                  "2. high": "11.3700",
                  "3. low": "11.1300",
                  "4. close": "11.3000",
                  "5. volume": "2440712"
              },
              "2024-02-12": {
                  "1. open": "11.1300",
                  "2. high": "11.3900",
                  "3. low": "11.0700",
                  "4. close": "11.3700",
                  "5. volume": "2035304"
              },
              "2024-02-09": {
                  "1. open": "11.0300",
                  "2. high": "11.1250",
                  "3. low": "10.9300",
                  "4. close": "11.0500",
                  "5. volume": "1820965"
              },
              "2024-02-08": {
                  "1. open": "10.9600",
                  "2. high": "11.1000",
                  "3. low": "10.9000",
                  "4. close": "10.9900",
                  "5. volume": "2046770"
              },
              "2024-02-07": {
                  "1. open": "10.6100",
                  "2. high": "11.1400",
                  "3. low": "10.2000",
                  "4. close": "11.0000",
                  "5. volume": "4257348"
              },
              "2024-02-06": {
                  "1. open": "10.5100",
                  "2. high": "10.6400",
                  "3. low": "10.4350",
                  "4. close": "10.5100",
                  "5. volume": "2166902"
              },
              "2024-02-05": {
                  "1. open": "10.5800",
                  "2. high": "10.6500",
                  "3. low": "10.3900",
                  "4. close": "10.5000",
                  "5. volume": "1571192"
              },
              "2024-02-02": {
                  "1. open": "10.8000",
                  "2. high": "10.8000",
                  "3. low": "10.5500",
                  "4. close": "10.5800",
                  "5. volume": "1853242"
              },
              "2024-02-01": {
                  "1. open": "11.2500",
                  "2. high": "11.3600",
                  "3. low": "10.5400",
                  "4. close": "10.8400",
                  "5. volume": "2709726"
              },
              "2024-01-31": {
                  "1. open": "11.1800",
                  "2. high": "11.2300",
                  "3. low": "10.9750",
                  "4. close": "11.1200",
                  "5. volume": "2139893"
              },
              "2024-01-30": {
                  "1. open": "10.9500",
                  "2. high": "11.3000",
                  "3. low": "10.9500",
                  "4. close": "11.2200",
                  "5. volume": "1600890"
              },
              "2024-01-29": {
                  "1. open": "11.2200",
                  "2. high": "11.2900",
                  "3. low": "10.9600",
                  "4. close": "10.9800",
                  "5. volume": "2187679"
              },
              "2024-01-26": {
                  "1. open": "10.8000",
                  "2. high": "11.1800",
                  "3. low": "10.8000",
                  "4. close": "11.1600",
                  "5. volume": "1819605"
              },
              "2024-01-25": {
                  "1. open": "11.1000",
                  "2. high": "11.1300",
                  "3. low": "10.7600",
                  "4. close": "10.8000",
                  "5. volume": "1808823"
              },
              "2024-01-24": {
                  "1. open": "10.9700",
                  "2. high": "11.1100",
                  "3. low": "10.9500",
                  "4. close": "11.0200",
                  "5. volume": "1730735"
              },
              "2024-01-23": {
                  "1. open": "10.8000",
                  "2. high": "10.8250",
                  "3. low": "10.6300",
                  "4. close": "10.7800",
                  "5. volume": "1758106"
              },
              "2024-01-22": {
                  "1. open": "10.9400",
                  "2. high": "11.1100",
                  "3. low": "10.8300",
                  "4. close": "10.8500",
                  "5. volume": "1627046"
              },
              "2024-01-19": {
                  "1. open": "11.1100",
                  "2. high": "11.1700",
                  "3. low": "10.8900",
                  "4. close": "10.9800",
                  "5. volume": "1870725"
              },
              "2024-01-18": {
                  "1. open": "11.1400",
                  "2. high": "11.1400",
                  "3. low": "10.8900",
                  "4. close": "11.0100",
                  "5. volume": "1367155"
              },
              "2024-01-17": {
                  "1. open": "10.9500",
                  "2. high": "11.2150",
                  "3. low": "10.9100",
                  "4. close": "11.0600",
                  "5. volume": "1518089"
              },
              "2024-01-16": {
                  "1. open": "11.1500",
                  "2. high": "11.2300",
                  "3. low": "10.9600",
                  "4. close": "11.0200",
                  "5. volume": "2362508"
              },
              "2024-01-12": {
                  "1. open": "11.0100",
                  "2. high": "11.3600",
                  "3. low": "10.8900",
                  "4. close": "10.9600",
                  "5. volume": "3965149"
              },
              "2024-01-11": {
                  "1. open": "10.5300",
                  "2. high": "10.7300",
                  "3. low": "10.2850",
                  "4. close": "10.7100",
                  "5. volume": "2885480"
              },
              "2024-01-10": {
                  "1. open": "10.7000",
                  "2. high": "10.7250",
                  "3. low": "10.5300",
                  "4. close": "10.5900",
                  "5. volume": "1629291"
              },
              "2024-01-09": {
                  "1. open": "10.6700",
                  "2. high": "10.7400",
                  "3. low": "10.5000",
                  "4. close": "10.6900",
                  "5. volume": "1984880"
              },
              "2024-01-08": {
                  "1. open": "10.7300",
                  "2. high": "10.8200",
                  "3. low": "10.5000",
                  "4. close": "10.6700",
                  "5. volume": "3489556"
              },
              "2024-01-05": {
                  "1. open": "10.4000",
                  "2. high": "10.9900",
                  "3. low": "10.3750",
                  "4. close": "10.9400",
                  "5. volume": "4356115"
              },
              "2024-01-04": {
                  "1. open": "10.4000",
                  "2. high": "10.6950",
                  "3. low": "10.3000",
                  "4. close": "10.3100",
                  "5. volume": "2863042"
              },
              "2024-01-03": {
                  "1. open": "10.0100",
                  "2. high": "10.3100",
                  "3. low": "10.0000",
                  "4. close": "10.2800",
                  "5. volume": "2470176"
              },
              "2024-01-02": {
                  "1. open": "10.0000",
                  "2. high": "10.1000",
                  "3. low": "9.8400",
                  "4. close": "10.0100",
                  "5. volume": "2299612"
              },
              "2023-12-29": {
                  "1. open": "9.8800",
                  "2. high": "9.8999",
                  "3. low": "9.7650",
                  "4. close": "9.8100",
                  "5. volume": "1153104"
              },
              "2023-12-28": {
                  "1. open": "9.9500",
                  "2. high": "9.9500",
                  "3. low": "9.7800",
                  "4. close": "9.8400",
                  "5. volume": "1909153"
              },
              "2023-12-27": {
                  "1. open": "10.0900",
                  "2. high": "10.1800",
                  "3. low": "9.9700",
                  "4. close": "10.0100",
                  "5. volume": "1300631"
              },
              "2023-12-26": {
                  "1. open": "10.4100",
                  "2. high": "10.4200",
                  "3. low": "10.0350",
                  "4. close": "10.1600",
                  "5. volume": "1672523"
              },
              "2023-12-22": {
                  "1. open": "10.4000",
                  "2. high": "10.5150",
                  "3. low": "10.4000",
                  "4. close": "10.4900",
                  "5. volume": "1534422"
              },
              "2023-12-21": {
                  "1. open": "10.2500",
                  "2. high": "10.3900",
                  "3. low": "10.2400",
                  "4. close": "10.3200",
                  "5. volume": "1343397"
              },
              "2023-12-20": {
                  "1. open": "10.4700",
                  "2. high": "10.5000",
                  "3. low": "10.1700",
                  "4. close": "10.1800",
                  "5. volume": "2546164"
              },
              "2023-12-19": {
                  "1. open": "10.2800",
                  "2. high": "10.5000",
                  "3. low": "10.1800",
                  "4. close": "10.4200",
                  "5. volume": "1548098"
              },
              "2023-12-18": {
                  "1. open": "10.5000",
                  "2. high": "10.5900",
                  "3. low": "10.1600",
                  "4. close": "10.2500",
                  "5. volume": "2525710"
              },
              "2023-12-15": {
                  "1. open": "9.5300",
                  "2. high": "10.2500",
                  "3. low": "9.4200",
                  "4. close": "10.1100",
                  "5. volume": "5794779"
              },
              "2023-12-14": {
                  "1. open": "9.7000",
                  "2. high": "9.7700",
                  "3. low": "9.4800",
                  "4. close": "9.5300",
                  "5. volume": "2827153"
              },
              "2023-12-13": {
                  "1. open": "9.4300",
                  "2. high": "9.5900",
                  "3. low": "9.2800",
                  "4. close": "9.5800",
                  "5. volume": "2808663"
              },
              "2023-12-12": {
                  "1. open": "9.5500",
                  "2. high": "9.6000",
                  "3. low": "9.4000",
                  "4. close": "9.4700",
                  "5. volume": "2144570"
              },
              "2023-12-11": {
                  "1. open": "9.6700",
                  "2. high": "9.6900",
                  "3. low": "9.5150",
                  "4. close": "9.6300",
                  "5. volume": "1521585"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "CDE",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "4.9000",
                  "2. high": "5.0800",
                  "3. low": "4.7640",
                  "4. close": "4.8800",
                  "5. volume": "6442693"
              },
              "2024-05-02": {
                  "1. open": "4.3900",
                  "2. high": "4.8300",
                  "3. low": "4.3600",
                  "4. close": "4.7900",
                  "5. volume": "7729441"
              },
              "2024-05-01": {
                  "1. open": "4.5500",
                  "2. high": "4.8400",
                  "3. low": "4.5200",
                  "4. close": "4.5800",
                  "5. volume": "6977814"
              },
              "2024-04-30": {
                  "1. open": "4.6400",
                  "2. high": "4.7700",
                  "3. low": "4.5000",
                  "4. close": "4.5200",
                  "5. volume": "9797018"
              },
              "2024-04-29": {
                  "1. open": "4.9900",
                  "2. high": "5.0500",
                  "3. low": "4.7000",
                  "4. close": "4.9100",
                  "5. volume": "6155166"
              },
              "2024-04-26": {
                  "1. open": "4.8800",
                  "2. high": "4.9700",
                  "3. low": "4.7400",
                  "4. close": "4.9400",
                  "5. volume": "7308265"
              },
              "2024-04-25": {
                  "1. open": "4.5400",
                  "2. high": "4.9000",
                  "3. low": "4.4600",
                  "4. close": "4.8200",
                  "5. volume": "9204770"
              },
              "2024-04-24": {
                  "1. open": "4.5900",
                  "2. high": "4.6600",
                  "3. low": "4.5100",
                  "4. close": "4.5500",
                  "5. volume": "5571515"
              },
              "2024-04-23": {
                  "1. open": "4.2300",
                  "2. high": "4.6700",
                  "3. low": "4.1300",
                  "4. close": "4.6200",
                  "5. volume": "7830168"
              },
              "2024-04-22": {
                  "1. open": "4.1800",
                  "2. high": "4.3700",
                  "3. low": "4.0300",
                  "4. close": "4.2600",
                  "5. volume": "7742794"
              },
              "2024-04-19": {
                  "1. open": "4.4000",
                  "2. high": "4.5300",
                  "3. low": "4.3800",
                  "4. close": "4.5000",
                  "5. volume": "7273500"
              },
              "2024-04-18": {
                  "1. open": "4.5700",
                  "2. high": "4.6800",
                  "3. low": "4.4100",
                  "4. close": "4.4400",
                  "5. volume": "5175920"
              },
              "2024-04-17": {
                  "1. open": "4.4400",
                  "2. high": "4.6300",
                  "3. low": "4.3600",
                  "4. close": "4.4300",
                  "5. volume": "11341880"
              },
              "2024-04-16": {
                  "1. open": "4.3400",
                  "2. high": "4.4600",
                  "3. low": "4.2000",
                  "4. close": "4.3700",
                  "5. volume": "10673533"
              },
              "2024-04-15": {
                  "1. open": "4.7200",
                  "2. high": "4.8100",
                  "3. low": "4.4100",
                  "4. close": "4.4800",
                  "5. volume": "10230042"
              },
              "2024-04-12": {
                  "1. open": "5.2300",
                  "2. high": "5.4700",
                  "3. low": "4.5800",
                  "4. close": "4.6400",
                  "5. volume": "21480717"
              },
              "2024-04-11": {
                  "1. open": "4.8200",
                  "2. high": "4.8900",
                  "3. low": "4.6150",
                  "4. close": "4.7900",
                  "5. volume": "8657968"
              },
              "2024-04-10": {
                  "1. open": "4.5900",
                  "2. high": "4.9100",
                  "3. low": "4.4800",
                  "4. close": "4.7200",
                  "5. volume": "11886722"
              },
              "2024-04-09": {
                  "1. open": "5.0000",
                  "2. high": "5.3688",
                  "3. low": "4.8900",
                  "4. close": "4.9300",
                  "5. volume": "15029876"
              },
              "2024-04-08": {
                  "1. open": "4.9900",
                  "2. high": "5.0700",
                  "3. low": "4.5200",
                  "4. close": "4.7300",
                  "5. volume": "13891044"
              },
              "2024-04-05": {
                  "1. open": "4.4000",
                  "2. high": "4.9350",
                  "3. low": "4.2800",
                  "4. close": "4.8700",
                  "5. volume": "17760528"
              },
              "2024-04-04": {
                  "1. open": "4.5500",
                  "2. high": "4.6300",
                  "3. low": "4.3200",
                  "4. close": "4.3400",
                  "5. volume": "10185904"
              },
              "2024-04-03": {
                  "1. open": "4.1900",
                  "2. high": "4.6450",
                  "3. low": "4.0300",
                  "4. close": "4.6200",
                  "5. volume": "14491500"
              },
              "2024-04-02": {
                  "1. open": "4.2200",
                  "2. high": "4.3500",
                  "3. low": "4.1444",
                  "4. close": "4.1700",
                  "5. volume": "10988567"
              },
              "2024-04-01": {
                  "1. open": "4.1000",
                  "2. high": "4.3400",
                  "3. low": "4.0500",
                  "4. close": "4.1800",
                  "5. volume": "11500857"
              },
              "2024-03-28": {
                  "1. open": "3.6300",
                  "2. high": "3.7900",
                  "3. low": "3.6000",
                  "4. close": "3.7700",
                  "5. volume": "7209701"
              },
              "2024-03-27": {
                  "1. open": "3.4100",
                  "2. high": "3.5800",
                  "3. low": "3.3950",
                  "4. close": "3.5700",
                  "5. volume": "5776783"
              },
              "2024-03-26": {
                  "1. open": "3.5400",
                  "2. high": "3.5700",
                  "3. low": "3.3600",
                  "4. close": "3.3800",
                  "5. volume": "5283983"
              },
              "2024-03-25": {
                  "1. open": "3.4000",
                  "2. high": "3.5700",
                  "3. low": "3.4000",
                  "4. close": "3.4300",
                  "5. volume": "3437059"
              },
              "2024-03-22": {
                  "1. open": "3.3600",
                  "2. high": "3.4700",
                  "3. low": "3.3100",
                  "4. close": "3.3300",
                  "5. volume": "5225468"
              },
              "2024-03-21": {
                  "1. open": "3.3900",
                  "2. high": "3.5000",
                  "3. low": "3.3700",
                  "4. close": "3.4000",
                  "5. volume": "7907336"
              },
              "2024-03-20": {
                  "1. open": "3.0400",
                  "2. high": "3.4000",
                  "3. low": "2.9800",
                  "4. close": "3.3500",
                  "5. volume": "6964527"
              },
              "2024-03-19": {
                  "1. open": "3.0900",
                  "2. high": "3.1200",
                  "3. low": "3.0100",
                  "4. close": "3.0300",
                  "5. volume": "4982756"
              },
              "2024-03-18": {
                  "1. open": "3.2500",
                  "2. high": "3.3400",
                  "3. low": "3.1300",
                  "4. close": "3.1300",
                  "5. volume": "8014900"
              },
              "2024-03-15": {
                  "1. open": "3.1500",
                  "2. high": "3.2800",
                  "3. low": "3.1500",
                  "4. close": "3.2600",
                  "5. volume": "11756769"
              },
              "2024-03-14": {
                  "1. open": "3.3200",
                  "2. high": "3.3200",
                  "3. low": "3.1400",
                  "4. close": "3.1700",
                  "5. volume": "5686697"
              },
              "2024-03-13": {
                  "1. open": "3.1700",
                  "2. high": "3.3300",
                  "3. low": "3.1450",
                  "4. close": "3.3100",
                  "5. volume": "5457316"
              },
              "2024-03-12": {
                  "1. open": "3.1600",
                  "2. high": "3.2100",
                  "3. low": "3.0800",
                  "4. close": "3.1500",
                  "5. volume": "5030031"
              },
              "2024-03-11": {
                  "1. open": "3.1400",
                  "2. high": "3.3100",
                  "3. low": "3.0500",
                  "4. close": "3.2400",
                  "5. volume": "6747326"
              },
              "2024-03-08": {
                  "1. open": "3.2400",
                  "2. high": "3.2950",
                  "3. low": "3.0706",
                  "4. close": "3.1300",
                  "5. volume": "8158021"
              },
              "2024-03-07": {
                  "1. open": "3.1300",
                  "2. high": "3.1900",
                  "3. low": "3.0250",
                  "4. close": "3.1900",
                  "5. volume": "7914651"
              },
              "2024-03-06": {
                  "1. open": "2.9600",
                  "2. high": "3.1300",
                  "3. low": "2.9400",
                  "4. close": "3.0700",
                  "5. volume": "9892633"
              },
              "2024-03-05": {
                  "1. open": "3.0300",
                  "2. high": "3.0800",
                  "3. low": "2.8912",
                  "4. close": "2.9100",
                  "5. volume": "7615830"
              },
              "2024-03-04": {
                  "1. open": "2.7500",
                  "2. high": "2.9500",
                  "3. low": "2.7400",
                  "4. close": "2.9500",
                  "5. volume": "10461639"
              },
              "2024-03-01": {
                  "1. open": "2.6200",
                  "2. high": "2.7400",
                  "3. low": "2.5400",
                  "4. close": "2.7100",
                  "5. volume": "8032461"
              },
              "2024-02-29": {
                  "1. open": "2.5500",
                  "2. high": "2.6900",
                  "3. low": "2.5450",
                  "4. close": "2.5900",
                  "5. volume": "7598173"
              },
              "2024-02-28": {
                  "1. open": "2.5000",
                  "2. high": "2.5800",
                  "3. low": "2.4200",
                  "4. close": "2.4500",
                  "5. volume": "5974400"
              },
              "2024-02-27": {
                  "1. open": "2.5600",
                  "2. high": "2.5800",
                  "3. low": "2.4400",
                  "4. close": "2.5300",
                  "5. volume": "7253869"
              },
              "2024-02-26": {
                  "1. open": "2.6700",
                  "2. high": "2.6800",
                  "3. low": "2.5400",
                  "4. close": "2.5500",
                  "5. volume": "6866743"
              },
              "2024-02-23": {
                  "1. open": "2.6300",
                  "2. high": "2.7300",
                  "3. low": "2.5100",
                  "4. close": "2.7200",
                  "5. volume": "7199588"
              },
              "2024-02-22": {
                  "1. open": "2.5400",
                  "2. high": "2.6700",
                  "3. low": "2.5000",
                  "4. close": "2.6600",
                  "5. volume": "6296985"
              },
              "2024-02-21": {
                  "1. open": "2.6100",
                  "2. high": "2.6100",
                  "3. low": "2.5400",
                  "4. close": "2.5800",
                  "5. volume": "3101976"
              },
              "2024-02-20": {
                  "1. open": "2.6400",
                  "2. high": "2.6500",
                  "3. low": "2.6000",
                  "4. close": "2.6200",
                  "5. volume": "3941667"
              },
              "2024-02-16": {
                  "1. open": "2.7000",
                  "2. high": "2.7150",
                  "3. low": "2.6200",
                  "4. close": "2.6300",
                  "5. volume": "6049809"
              },
              "2024-02-15": {
                  "1. open": "2.6900",
                  "2. high": "2.7900",
                  "3. low": "2.6700",
                  "4. close": "2.7300",
                  "5. volume": "6524636"
              },
              "2024-02-14": {
                  "1. open": "2.5300",
                  "2. high": "2.6399",
                  "3. low": "2.5300",
                  "4. close": "2.6300",
                  "5. volume": "5100808"
              },
              "2024-02-13": {
                  "1. open": "2.6800",
                  "2. high": "2.6900",
                  "3. low": "2.5000",
                  "4. close": "2.5400",
                  "5. volume": "10104341"
              },
              "2024-02-12": {
                  "1. open": "2.6600",
                  "2. high": "2.8200",
                  "3. low": "2.6300",
                  "4. close": "2.7800",
                  "5. volume": "4827830"
              },
              "2024-02-09": {
                  "1. open": "2.6900",
                  "2. high": "2.7200",
                  "3. low": "2.6100",
                  "4. close": "2.7000",
                  "5. volume": "3975202"
              },
              "2024-02-08": {
                  "1. open": "2.6500",
                  "2. high": "2.7050",
                  "3. low": "2.6400",
                  "4. close": "2.6800",
                  "5. volume": "2896147"
              },
              "2024-02-07": {
                  "1. open": "2.7500",
                  "2. high": "2.7700",
                  "3. low": "2.6500",
                  "4. close": "2.6700",
                  "5. volume": "3248150"
              },
              "2024-02-06": {
                  "1. open": "2.6800",
                  "2. high": "2.8100",
                  "3. low": "2.6600",
                  "4. close": "2.7800",
                  "5. volume": "3324008"
              },
              "2024-02-05": {
                  "1. open": "2.6300",
                  "2. high": "2.7200",
                  "3. low": "2.5900",
                  "4. close": "2.6600",
                  "5. volume": "4175878"
              },
              "2024-02-02": {
                  "1. open": "2.7600",
                  "2. high": "2.7900",
                  "3. low": "2.6600",
                  "4. close": "2.7400",
                  "5. volume": "6312680"
              },
              "2024-02-01": {
                  "1. open": "2.6950",
                  "2. high": "2.8600",
                  "3. low": "2.6900",
                  "4. close": "2.8600",
                  "5. volume": "6351728"
              },
              "2024-01-31": {
                  "1. open": "2.7400",
                  "2. high": "2.8100",
                  "3. low": "2.6700",
                  "4. close": "2.6900",
                  "5. volume": "7300574"
              },
              "2024-01-30": {
                  "1. open": "2.9700",
                  "2. high": "2.9700",
                  "3. low": "2.7250",
                  "4. close": "2.7400",
                  "5. volume": "10222411"
              },
              "2024-01-29": {
                  "1. open": "2.7400",
                  "2. high": "2.9900",
                  "3. low": "2.6600",
                  "4. close": "2.9500",
                  "5. volume": "13910835"
              },
              "2024-01-26": {
                  "1. open": "2.7600",
                  "2. high": "2.8100",
                  "3. low": "2.6850",
                  "4. close": "2.7100",
                  "5. volume": "5061709"
              },
              "2024-01-25": {
                  "1. open": "2.7700",
                  "2. high": "2.8300",
                  "3. low": "2.7200",
                  "4. close": "2.7700",
                  "5. volume": "6496118"
              },
              "2024-01-24": {
                  "1. open": "2.9100",
                  "2. high": "2.9400",
                  "3. low": "2.6800",
                  "4. close": "2.6800",
                  "5. volume": "6668982"
              },
              "2024-01-23": {
                  "1. open": "2.8800",
                  "2. high": "2.9000",
                  "3. low": "2.7800",
                  "4. close": "2.8300",
                  "5. volume": "6271276"
              },
              "2024-01-22": {
                  "1. open": "2.5700",
                  "2. high": "2.7900",
                  "3. low": "2.5300",
                  "4. close": "2.7900",
                  "5. volume": "7204125"
              },
              "2024-01-19": {
                  "1. open": "2.6400",
                  "2. high": "2.6500",
                  "3. low": "2.5200",
                  "4. close": "2.6000",
                  "5. volume": "4932844"
              },
              "2024-01-18": {
                  "1. open": "2.6400",
                  "2. high": "2.6500",
                  "3. low": "2.5400",
                  "4. close": "2.6200",
                  "5. volume": "6375208"
              },
              "2024-01-17": {
                  "1. open": "2.6700",
                  "2. high": "2.6700",
                  "3. low": "2.5800",
                  "4. close": "2.6100",
                  "5. volume": "6817162"
              },
              "2024-01-16": {
                  "1. open": "2.8100",
                  "2. high": "2.8300",
                  "3. low": "2.7100",
                  "4. close": "2.7200",
                  "5. volume": "6540359"
              },
              "2024-01-12": {
                  "1. open": "2.8400",
                  "2. high": "3.0100",
                  "3. low": "2.8300",
                  "4. close": "2.8800",
                  "5. volume": "9034649"
              },
              "2024-01-11": {
                  "1. open": "2.7000",
                  "2. high": "2.7300",
                  "3. low": "2.5700",
                  "4. close": "2.6600",
                  "5. volume": "5276938"
              },
              "2024-01-10": {
                  "1. open": "2.7000",
                  "2. high": "2.7200",
                  "3. low": "2.6100",
                  "4. close": "2.6700",
                  "5. volume": "4537348"
              },
              "2024-01-09": {
                  "1. open": "2.8000",
                  "2. high": "2.8000",
                  "3. low": "2.6850",
                  "4. close": "2.7000",
                  "5. volume": "6730741"
              },
              "2024-01-08": {
                  "1. open": "2.7700",
                  "2. high": "2.8500",
                  "3. low": "2.7300",
                  "4. close": "2.8100",
                  "5. volume": "6317852"
              },
              "2024-01-05": {
                  "1. open": "2.8900",
                  "2. high": "2.9700",
                  "3. low": "2.8200",
                  "4. close": "2.8300",
                  "5. volume": "4895838"
              },
              "2024-01-04": {
                  "1. open": "2.9100",
                  "2. high": "2.9300",
                  "3. low": "2.8200",
                  "4. close": "2.9100",
                  "5. volume": "4931513"
              },
              "2024-01-03": {
                  "1. open": "3.0500",
                  "2. high": "3.0650",
                  "3. low": "2.8400",
                  "4. close": "2.8900",
                  "5. volume": "10401882"
              },
              "2024-01-02": {
                  "1. open": "3.2500",
                  "2. high": "3.3400",
                  "3. low": "3.1800",
                  "4. close": "3.2000",
                  "5. volume": "4319648"
              },
              "2023-12-29": {
                  "1. open": "3.2800",
                  "2. high": "3.3500",
                  "3. low": "3.2000",
                  "4. close": "3.2600",
                  "5. volume": "4817348"
              },
              "2023-12-28": {
                  "1. open": "3.4700",
                  "2. high": "3.4900",
                  "3. low": "3.3200",
                  "4. close": "3.3200",
                  "5. volume": "4659291"
              },
              "2023-12-27": {
                  "1. open": "3.4700",
                  "2. high": "3.5300",
                  "3. low": "3.4200",
                  "4. close": "3.5000",
                  "5. volume": "3181837"
              },
              "2023-12-26": {
                  "1. open": "3.4600",
                  "2. high": "3.4896",
                  "3. low": "3.3900",
                  "4. close": "3.4700",
                  "5. volume": "2240109"
              },
              "2023-12-22": {
                  "1. open": "3.6400",
                  "2. high": "3.6900",
                  "3. low": "3.4050",
                  "4. close": "3.4400",
                  "5. volume": "6480610"
              },
              "2023-12-21": {
                  "1. open": "3.4600",
                  "2. high": "3.5500",
                  "3. low": "3.4500",
                  "4. close": "3.5400",
                  "5. volume": "3555014"
              },
              "2023-12-20": {
                  "1. open": "3.6500",
                  "2. high": "3.6500",
                  "3. low": "3.3900",
                  "4. close": "3.3900",
                  "5. volume": "7188959"
              },
              "2023-12-19": {
                  "1. open": "3.4300",
                  "2. high": "3.6200",
                  "3. low": "3.3400",
                  "4. close": "3.6100",
                  "5. volume": "5919031"
              },
              "2023-12-18": {
                  "1. open": "3.5800",
                  "2. high": "3.5900",
                  "3. low": "3.3300",
                  "4. close": "3.4000",
                  "5. volume": "6963493"
              },
              "2023-12-15": {
                  "1. open": "3.4900",
                  "2. high": "3.6500",
                  "3. low": "3.4000",
                  "4. close": "3.5400",
                  "5. volume": "19040550"
              },
              "2023-12-14": {
                  "1. open": "3.3600",
                  "2. high": "3.6000",
                  "3. low": "3.3600",
                  "4. close": "3.5200",
                  "5. volume": "13688689"
              },
              "2023-12-13": {
                  "1. open": "2.9200",
                  "2. high": "3.3000",
                  "3. low": "2.9100",
                  "4. close": "3.2900",
                  "5. volume": "9845582"
              },
              "2023-12-12": {
                  "1. open": "3.0900",
                  "2. high": "3.1200",
                  "3. low": "2.9100",
                  "4. close": "2.9200",
                  "5. volume": "7108777"
              },
              "2023-12-11": {
                  "1. open": "2.9200",
                  "2. high": "3.1100",
                  "3. low": "2.8100",
                  "4. close": "3.1100",
                  "5. volume": "7577265"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "AU",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "23.0200",
                  "2. high": "23.2250",
                  "3. low": "22.4500",
                  "4. close": "23.1200",
                  "5. volume": "1619417"
              },
              "2024-05-02": {
                  "1. open": "22.8100",
                  "2. high": "23.2100",
                  "3. low": "22.6000",
                  "4. close": "23.1400",
                  "5. volume": "1419044"
              },
              "2024-05-01": {
                  "1. open": "23.1600",
                  "2. high": "24.0700",
                  "3. low": "22.9700",
                  "4. close": "23.4600",
                  "5. volume": "2029738"
              },
              "2024-04-30": {
                  "1. open": "23.2100",
                  "2. high": "23.6900",
                  "3. low": "22.9100",
                  "4. close": "22.9900",
                  "5. volume": "2853759"
              },
              "2024-04-29": {
                  "1. open": "24.3000",
                  "2. high": "25.0400",
                  "3. low": "24.1500",
                  "4. close": "24.8000",
                  "5. volume": "3549296"
              },
              "2024-04-26": {
                  "1. open": "23.5300",
                  "2. high": "23.8800",
                  "3. low": "23.3800",
                  "4. close": "23.8500",
                  "5. volume": "2449305"
              },
              "2024-04-25": {
                  "1. open": "21.9900",
                  "2. high": "22.9750",
                  "3. low": "21.9000",
                  "4. close": "22.7800",
                  "5. volume": "2250103"
              },
              "2024-04-24": {
                  "1. open": "21.7200",
                  "2. high": "22.0250",
                  "3. low": "21.6607",
                  "4. close": "21.9200",
                  "5. volume": "1693062"
              },
              "2024-04-23": {
                  "1. open": "21.8700",
                  "2. high": "22.4750",
                  "3. low": "21.7900",
                  "4. close": "22.1100",
                  "5. volume": "2356146"
              },
              "2024-04-22": {
                  "1. open": "22.3100",
                  "2. high": "22.4300",
                  "3. low": "21.6450",
                  "4. close": "22.0300",
                  "5. volume": "4175840"
              },
              "2024-04-19": {
                  "1. open": "23.2400",
                  "2. high": "23.8500",
                  "3. low": "23.1900",
                  "4. close": "23.8400",
                  "5. volume": "3024462"
              },
              "2024-04-18": {
                  "1. open": "23.9900",
                  "2. high": "24.0450",
                  "3. low": "23.4100",
                  "4. close": "23.7100",
                  "5. volume": "2050974"
              },
              "2024-04-17": {
                  "1. open": "23.7700",
                  "2. high": "24.4350",
                  "3. low": "23.5200",
                  "4. close": "23.8500",
                  "5. volume": "2984376"
              },
              "2024-04-16": {
                  "1. open": "23.6000",
                  "2. high": "23.6700",
                  "3. low": "23.0500",
                  "4. close": "23.2900",
                  "5. volume": "2910958"
              },
              "2024-04-15": {
                  "1. open": "24.6400",
                  "2. high": "24.7700",
                  "3. low": "23.6750",
                  "4. close": "23.8100",
                  "5. volume": "3863143"
              },
              "2024-04-12": {
                  "1. open": "25.2100",
                  "2. high": "25.4999",
                  "3. low": "23.5750",
                  "4. close": "23.8500",
                  "5. volume": "5165801"
              },
              "2024-04-11": {
                  "1. open": "23.4000",
                  "2. high": "24.2800",
                  "3. low": "23.1800",
                  "4. close": "24.2600",
                  "5. volume": "3781952"
              },
              "2024-04-10": {
                  "1. open": "23.1100",
                  "2. high": "23.6100",
                  "3. low": "22.9100",
                  "4. close": "23.0400",
                  "5. volume": "2698544"
              },
              "2024-04-09": {
                  "1. open": "24.4600",
                  "2. high": "24.5200",
                  "3. low": "23.0799",
                  "4. close": "23.4700",
                  "5. volume": "2442686"
              },
              "2024-04-08": {
                  "1. open": "24.2100",
                  "2. high": "24.3800",
                  "3. low": "23.5350",
                  "4. close": "23.5500",
                  "5. volume": "2830132"
              },
              "2024-04-05": {
                  "1. open": "23.5100",
                  "2. high": "24.1200",
                  "3. low": "23.1800",
                  "4. close": "23.9500",
                  "5. volume": "2980892"
              },
              "2024-04-04": {
                  "1. open": "23.3700",
                  "2. high": "23.7250",
                  "3. low": "23.0600",
                  "4. close": "23.1000",
                  "5. volume": "2416584"
              },
              "2024-04-03": {
                  "1. open": "22.7200",
                  "2. high": "23.3250",
                  "3. low": "22.5950",
                  "4. close": "23.2000",
                  "5. volume": "2580655"
              },
              "2024-04-02": {
                  "1. open": "22.5900",
                  "2. high": "22.8300",
                  "3. low": "22.5150",
                  "4. close": "22.8200",
                  "5. volume": "2623011"
              },
              "2024-04-01": {
                  "1. open": "22.8000",
                  "2. high": "22.8790",
                  "3. low": "21.9700",
                  "4. close": "22.1700",
                  "5. volume": "1666568"
              },
              "2024-03-28": {
                  "1. open": "22.2700",
                  "2. high": "22.3850",
                  "3. low": "21.8300",
                  "4. close": "22.2000",
                  "5. volume": "1857509"
              },
              "2024-03-27": {
                  "1. open": "21.4200",
                  "2. high": "22.1400",
                  "3. low": "21.3700",
                  "4. close": "21.9900",
                  "5. volume": "1357195"
              },
              "2024-03-26": {
                  "1. open": "21.9100",
                  "2. high": "21.9100",
                  "3. low": "21.2300",
                  "4. close": "21.3900",
                  "5. volume": "1971789"
              },
              "2024-03-25": {
                  "1. open": "21.2900",
                  "2. high": "21.9900",
                  "3. low": "21.2700",
                  "4. close": "21.3400",
                  "5. volume": "2350784"
              },
              "2024-03-22": {
                  "1. open": "20.5800",
                  "2. high": "21.2850",
                  "3. low": "20.4600",
                  "4. close": "21.0800",
                  "5. volume": "1851623"
              },
              "2024-03-21": {
                  "1. open": "21.5000",
                  "2. high": "21.8100",
                  "3. low": "20.8400",
                  "4. close": "21.1600",
                  "5. volume": "2785634"
              },
              "2024-03-20": {
                  "1. open": "20.4100",
                  "2. high": "21.5600",
                  "3. low": "20.3000",
                  "4. close": "21.2700",
                  "5. volume": "3287534"
              },
              "2024-03-19": {
                  "1. open": "20.5100",
                  "2. high": "20.7050",
                  "3. low": "20.0452",
                  "4. close": "20.2700",
                  "5. volume": "2556818"
              },
              "2024-03-18": {
                  "1. open": "21.3600",
                  "2. high": "21.4400",
                  "3. low": "20.7900",
                  "4. close": "21.1700",
                  "5. volume": "2395218"
              },
              "2024-03-15": {
                  "1. open": "22.3800",
                  "2. high": "22.5000",
                  "3. low": "21.9850",
                  "4. close": "22.0100",
                  "5. volume": "3123334"
              },
              "2024-03-14": {
                  "1. open": "22.2700",
                  "2. high": "22.3700",
                  "3. low": "21.8300",
                  "4. close": "22.1800",
                  "5. volume": "2111920"
              },
              "2024-03-13": {
                  "1. open": "22.2000",
                  "2. high": "23.2000",
                  "3. low": "22.1700",
                  "4. close": "22.8700",
                  "5. volume": "1909968"
              },
              "2024-03-12": {
                  "1. open": "21.9500",
                  "2. high": "22.2700",
                  "3. low": "21.7150",
                  "4. close": "22.1700",
                  "5. volume": "2265900"
              },
              "2024-03-11": {
                  "1. open": "22.2200",
                  "2. high": "23.0800",
                  "3. low": "22.2200",
                  "4. close": "22.8500",
                  "5. volume": "2263553"
              },
              "2024-03-08": {
                  "1. open": "22.2800",
                  "2. high": "22.4300",
                  "3. low": "21.8800",
                  "4. close": "22.3600",
                  "5. volume": "2619872"
              },
              "2024-03-07": {
                  "1. open": "22.1900",
                  "2. high": "22.4200",
                  "3. low": "21.9520",
                  "4. close": "22.1300",
                  "5. volume": "2247544"
              },
              "2024-03-06": {
                  "1. open": "21.5700",
                  "2. high": "22.0300",
                  "3. low": "21.2500",
                  "4. close": "21.9700",
                  "5. volume": "3218606"
              },
              "2024-03-05": {
                  "1. open": "22.0000",
                  "2. high": "22.0300",
                  "3. low": "21.4250",
                  "4. close": "21.6300",
                  "5. volume": "4679984"
              },
              "2024-03-04": {
                  "1. open": "20.4500",
                  "2. high": "21.1200",
                  "3. low": "20.2300",
                  "4. close": "21.1100",
                  "5. volume": "3366288"
              },
              "2024-03-01": {
                  "1. open": "18.8700",
                  "2. high": "19.5400",
                  "3. low": "18.6900",
                  "4. close": "19.5000",
                  "5. volume": "2109319"
              },
              "2024-02-29": {
                  "1. open": "18.7100",
                  "2. high": "18.9000",
                  "3. low": "18.3700",
                  "4. close": "18.6100",
                  "5. volume": "2167971"
              },
              "2024-02-28": {
                  "1. open": "18.3000",
                  "2. high": "18.4150",
                  "3. low": "17.9450",
                  "4. close": "18.0100",
                  "5. volume": "1451270"
              },
              "2024-02-27": {
                  "1. open": "18.6600",
                  "2. high": "18.7900",
                  "3. low": "18.2900",
                  "4. close": "18.3000",
                  "5. volume": "1953122"
              },
              "2024-02-26": {
                  "1. open": "18.4800",
                  "2. high": "18.6500",
                  "3. low": "18.2100",
                  "4. close": "18.5200",
                  "5. volume": "2555484"
              },
              "2024-02-23": {
                  "1. open": "18.2200",
                  "2. high": "18.4600",
                  "3. low": "17.6300",
                  "4. close": "18.3300",
                  "5. volume": "4367837"
              },
              "2024-02-22": {
                  "1. open": "17.5100",
                  "2. high": "17.6000",
                  "3. low": "17.0100",
                  "4. close": "17.0200",
                  "5. volume": "1984497"
              },
              "2024-02-21": {
                  "1. open": "17.6700",
                  "2. high": "17.7100",
                  "3. low": "17.3800",
                  "4. close": "17.7100",
                  "5. volume": "1298770"
              },
              "2024-02-20": {
                  "1. open": "18.3300",
                  "2. high": "18.3300",
                  "3. low": "17.6700",
                  "4. close": "17.7600",
                  "5. volume": "2359125"
              },
              "2024-02-16": {
                  "1. open": "17.0100",
                  "2. high": "17.5200",
                  "3. low": "16.9300",
                  "4. close": "17.3300",
                  "5. volume": "1536352"
              },
              "2024-02-15": {
                  "1. open": "16.9300",
                  "2. high": "17.3900",
                  "3. low": "16.8200",
                  "4. close": "17.0300",
                  "5. volume": "1901924"
              },
              "2024-02-14": {
                  "1. open": "16.6700",
                  "2. high": "16.7200",
                  "3. low": "16.4850",
                  "4. close": "16.6800",
                  "5. volume": "2040579"
              },
              "2024-02-13": {
                  "1. open": "17.0400",
                  "2. high": "17.1600",
                  "3. low": "16.7750",
                  "4. close": "16.8600",
                  "5. volume": "1663751"
              },
              "2024-02-12": {
                  "1. open": "17.2100",
                  "2. high": "17.8175",
                  "3. low": "17.1800",
                  "4. close": "17.6800",
                  "5. volume": "1235611"
              },
              "2024-02-09": {
                  "1. open": "17.7200",
                  "2. high": "17.8550",
                  "3. low": "17.3800",
                  "4. close": "17.3800",
                  "5. volume": "1363428"
              },
              "2024-02-08": {
                  "1. open": "17.7100",
                  "2. high": "17.8800",
                  "3. low": "17.6650",
                  "4. close": "17.8500",
                  "5. volume": "942317"
              },
              "2024-02-07": {
                  "1. open": "17.9800",
                  "2. high": "18.0800",
                  "3. low": "17.8200",
                  "4. close": "17.8400",
                  "5. volume": "1193431"
              },
              "2024-02-06": {
                  "1. open": "17.8800",
                  "2. high": "18.0600",
                  "3. low": "17.8100",
                  "4. close": "17.9800",
                  "5. volume": "869575"
              },
              "2024-02-05": {
                  "1. open": "17.6400",
                  "2. high": "17.8600",
                  "3. low": "17.5700",
                  "4. close": "17.7300",
                  "5. volume": "814649"
              },
              "2024-02-02": {
                  "1. open": "18.2800",
                  "2. high": "18.4000",
                  "3. low": "17.8500",
                  "4. close": "18.0500",
                  "5. volume": "2120803"
              },
              "2024-02-01": {
                  "1. open": "18.1000",
                  "2. high": "18.8600",
                  "3. low": "18.0300",
                  "4. close": "18.7000",
                  "5. volume": "2919540"
              },
              "2024-01-31": {
                  "1. open": "17.8900",
                  "2. high": "18.1606",
                  "3. low": "17.4600",
                  "4. close": "17.6200",
                  "5. volume": "1618104"
              },
              "2024-01-30": {
                  "1. open": "18.0600",
                  "2. high": "18.1500",
                  "3. low": "17.6100",
                  "4. close": "17.7500",
                  "5. volume": "1182337"
              },
              "2024-01-29": {
                  "1. open": "17.8100",
                  "2. high": "17.8500",
                  "3. low": "17.5350",
                  "4. close": "17.8300",
                  "5. volume": "1154361"
              },
              "2024-01-26": {
                  "1. open": "17.6600",
                  "2. high": "17.8300",
                  "3. low": "17.4600",
                  "4. close": "17.4900",
                  "5. volume": "1048314"
              },
              "2024-01-25": {
                  "1. open": "17.4500",
                  "2. high": "17.5200",
                  "3. low": "17.2500",
                  "4. close": "17.5200",
                  "5. volume": "1197611"
              },
              "2024-01-24": {
                  "1. open": "17.9500",
                  "2. high": "17.9500",
                  "3. low": "17.1100",
                  "4. close": "17.1300",
                  "5. volume": "3358358"
              },
              "2024-01-23": {
                  "1. open": "16.6100",
                  "2. high": "16.8700",
                  "3. low": "16.4200",
                  "4. close": "16.8500",
                  "5. volume": "2387960"
              },
              "2024-01-22": {
                  "1. open": "15.9100",
                  "2. high": "16.2650",
                  "3. low": "15.8000",
                  "4. close": "16.1400",
                  "5. volume": "1104362"
              },
              "2024-01-19": {
                  "1. open": "16.1800",
                  "2. high": "16.3200",
                  "3. low": "16.0400",
                  "4. close": "16.2300",
                  "5. volume": "1509829"
              },
              "2024-01-18": {
                  "1. open": "16.3800",
                  "2. high": "16.4300",
                  "3. low": "16.0950",
                  "4. close": "16.3000",
                  "5. volume": "1283030"
              },
              "2024-01-17": {
                  "1. open": "16.2200",
                  "2. high": "16.3200",
                  "3. low": "15.9500",
                  "4. close": "16.2300",
                  "5. volume": "1708527"
              },
              "2024-01-16": {
                  "1. open": "17.1900",
                  "2. high": "17.2100",
                  "3. low": "16.4600",
                  "4. close": "16.4900",
                  "5. volume": "3108846"
              },
              "2024-01-12": {
                  "1. open": "17.5300",
                  "2. high": "17.8900",
                  "3. low": "17.3350",
                  "4. close": "17.4700",
                  "5. volume": "2000756"
              },
              "2024-01-11": {
                  "1. open": "17.0900",
                  "2. high": "17.1750",
                  "3. low": "16.7200",
                  "4. close": "16.8500",
                  "5. volume": "1207775"
              },
              "2024-01-10": {
                  "1. open": "17.0800",
                  "2. high": "17.1500",
                  "3. low": "16.9350",
                  "4. close": "17.0500",
                  "5. volume": "1339400"
              },
              "2024-01-09": {
                  "1. open": "17.4200",
                  "2. high": "17.4400",
                  "3. low": "17.1300",
                  "4. close": "17.1800",
                  "5. volume": "1290649"
              },
              "2024-01-08": {
                  "1. open": "17.3200",
                  "2. high": "17.5850",
                  "3. low": "17.2200",
                  "4. close": "17.5000",
                  "5. volume": "1073640"
              },
              "2024-01-05": {
                  "1. open": "17.4900",
                  "2. high": "17.9500",
                  "3. low": "17.4300",
                  "4. close": "17.6800",
                  "5. volume": "1597803"
              },
              "2024-01-04": {
                  "1. open": "17.8600",
                  "2. high": "17.8950",
                  "3. low": "17.5388",
                  "4. close": "17.7400",
                  "5. volume": "1425859"
              },
              "2024-01-03": {
                  "1. open": "17.6700",
                  "2. high": "18.0950",
                  "3. low": "17.6100",
                  "4. close": "17.9000",
                  "5. volume": "1715310"
              },
              "2024-01-02": {
                  "1. open": "18.7700",
                  "2. high": "18.8100",
                  "3. low": "18.2400",
                  "4. close": "18.2400",
                  "5. volume": "1337080"
              },
              "2023-12-29": {
                  "1. open": "18.7800",
                  "2. high": "18.9700",
                  "3. low": "18.5800",
                  "4. close": "18.6900",
                  "5. volume": "1296581"
              },
              "2023-12-28": {
                  "1. open": "19.4100",
                  "2. high": "19.4100",
                  "3. low": "18.7900",
                  "4. close": "18.8000",
                  "5. volume": "1410731"
              },
              "2023-12-27": {
                  "1. open": "19.5100",
                  "2. high": "19.7300",
                  "3. low": "19.4100",
                  "4. close": "19.4800",
                  "5. volume": "1261462"
              },
              "2023-12-26": {
                  "1. open": "19.0000",
                  "2. high": "19.0800",
                  "3. low": "18.8350",
                  "4. close": "19.0300",
                  "5. volume": "804767"
              },
              "2023-12-22": {
                  "1. open": "19.4500",
                  "2. high": "19.6400",
                  "3. low": "18.8950",
                  "4. close": "18.9600",
                  "5. volume": "1561464"
              },
              "2023-12-21": {
                  "1. open": "18.9600",
                  "2. high": "19.3400",
                  "3. low": "18.7700",
                  "4. close": "18.8800",
                  "5. volume": "1954044"
              },
              "2023-12-20": {
                  "1. open": "18.8500",
                  "2. high": "18.9300",
                  "3. low": "18.3100",
                  "4. close": "18.3400",
                  "5. volume": "4018094"
              },
              "2023-12-19": {
                  "1. open": "18.1600",
                  "2. high": "19.1800",
                  "3. low": "18.1500",
                  "4. close": "18.8300",
                  "5. volume": "2576469"
              },
              "2023-12-18": {
                  "1. open": "17.8300",
                  "2. high": "17.9200",
                  "3. low": "17.6000",
                  "4. close": "17.8300",
                  "5. volume": "1827951"
              },
              "2023-12-15": {
                  "1. open": "17.9600",
                  "2. high": "18.2000",
                  "3. low": "17.6000",
                  "4. close": "17.9600",
                  "5. volume": "3563913"
              },
              "2023-12-14": {
                  "1. open": "18.7000",
                  "2. high": "18.9400",
                  "3. low": "17.6550",
                  "4. close": "18.0400",
                  "5. volume": "3993286"
              },
              "2023-12-13": {
                  "1. open": "16.0800",
                  "2. high": "17.5700",
                  "3. low": "16.0600",
                  "4. close": "17.5400",
                  "5. volume": "3176596"
              },
              "2023-12-12": {
                  "1. open": "16.7000",
                  "2. high": "17.0000",
                  "3. low": "16.6100",
                  "4. close": "16.8600",
                  "5. volume": "2002298"
              },
              "2023-12-11": {
                  "1. open": "16.7200",
                  "2. high": "17.0961",
                  "3. low": "16.6000",
                  "4. close": "17.0300",
                  "5. volume": "2237532"
              }
          }
      },
      {
          "Meta Data": {
              "1. Information": "Daily Prices (open, high, low, close) and Volumes",
              "2. Symbol": "ASTR",
              "3. Last Refreshed": "2024-05-03",
              "4. Output Size": "Compact",
              "5. Time Zone": "US/Eastern"
          },
          "Time Series (Daily)": {
              "2024-05-03": {
                  "1. open": "0.6900",
                  "2. high": "0.6900",
                  "3. low": "0.6401",
                  "4. close": "0.6600",
                  "5. volume": "65751"
              },
              "2024-05-02": {
                  "1. open": "0.6699",
                  "2. high": "0.6800",
                  "3. low": "0.6300",
                  "4. close": "0.6496",
                  "5. volume": "44861"
              },
              "2024-05-01": {
                  "1. open": "0.6800",
                  "2. high": "0.6949",
                  "3. low": "0.6302",
                  "4. close": "0.6303",
                  "5. volume": "75640"
              },
              "2024-04-30": {
                  "1. open": "0.7290",
                  "2. high": "0.7300",
                  "3. low": "0.6555",
                  "4. close": "0.6799",
                  "5. volume": "215792"
              },
              "2024-04-29": {
                  "1. open": "0.6998",
                  "2. high": "0.7300",
                  "3. low": "0.6555",
                  "4. close": "0.7110",
                  "5. volume": "138994"
              },
              "2024-04-26": {
                  "1. open": "0.6548",
                  "2. high": "0.7000",
                  "3. low": "0.6117",
                  "4. close": "0.6900",
                  "5. volume": "80661"
              },
              "2024-04-25": {
                  "1. open": "0.6466",
                  "2. high": "0.6900",
                  "3. low": "0.6203",
                  "4. close": "0.6750",
                  "5. volume": "75381"
              },
              "2024-04-24": {
                  "1. open": "0.6300",
                  "2. high": "0.6520",
                  "3. low": "0.6100",
                  "4. close": "0.6430",
                  "5. volume": "102702"
              },
              "2024-04-23": {
                  "1. open": "0.6400",
                  "2. high": "0.6500",
                  "3. low": "0.6000",
                  "4. close": "0.6210",
                  "5. volume": "102263"
              },
              "2024-04-22": {
                  "1. open": "0.6250",
                  "2. high": "0.6399",
                  "3. low": "0.5813",
                  "4. close": "0.6399",
                  "5. volume": "199808"
              },
              "2024-04-19": {
                  "1. open": "0.6250",
                  "2. high": "0.6400",
                  "3. low": "0.6000",
                  "4. close": "0.6100",
                  "5. volume": "91572"
              },
              "2024-04-18": {
                  "1. open": "0.6164",
                  "2. high": "0.6300",
                  "3. low": "0.5800",
                  "4. close": "0.6300",
                  "5. volume": "162463"
              },
              "2024-04-17": {
                  "1. open": "0.5800",
                  "2. high": "0.6247",
                  "3. low": "0.5600",
                  "4. close": "0.5997",
                  "5. volume": "107264"
              },
              "2024-04-16": {
                  "1. open": "0.5502",
                  "2. high": "0.5877",
                  "3. low": "0.5305",
                  "4. close": "0.5800",
                  "5. volume": "170267"
              },
              "2024-04-15": {
                  "1. open": "0.5800",
                  "2. high": "0.5954",
                  "3. low": "0.5500",
                  "4. close": "0.5590",
                  "5. volume": "202974"
              },
              "2024-04-12": {
                  "1. open": "0.5900",
                  "2. high": "0.6000",
                  "3. low": "0.5552",
                  "4. close": "0.5685",
                  "5. volume": "113124"
              },
              "2024-04-11": {
                  "1. open": "0.6200",
                  "2. high": "0.6300",
                  "3. low": "0.5810",
                  "4. close": "0.5984",
                  "5. volume": "189767"
              },
              "2024-04-10": {
                  "1. open": "0.6390",
                  "2. high": "0.6400",
                  "3. low": "0.6200",
                  "4. close": "0.6200",
                  "5. volume": "122413"
              },
              "2024-04-09": {
                  "1. open": "0.6700",
                  "2. high": "0.6700",
                  "3. low": "0.6400",
                  "4. close": "0.6452",
                  "5. volume": "90691"
              },
              "2024-04-08": {
                  "1. open": "0.6600",
                  "2. high": "0.6800",
                  "3. low": "0.6300",
                  "4. close": "0.6680",
                  "5. volume": "152074"
              },
              "2024-04-05": {
                  "1. open": "0.6140",
                  "2. high": "0.6900",
                  "3. low": "0.6100",
                  "4. close": "0.6800",
                  "5. volume": "136360"
              },
              "2024-04-04": {
                  "1. open": "0.6322",
                  "2. high": "0.6500",
                  "3. low": "0.6200",
                  "4. close": "0.6290",
                  "5. volume": "111078"
              },
              "2024-04-03": {
                  "1. open": "0.6449",
                  "2. high": "0.6600",
                  "3. low": "0.6300",
                  "4. close": "0.6301",
                  "5. volume": "106208"
              },
              "2024-04-02": {
                  "1. open": "0.7000",
                  "2. high": "0.7000",
                  "3. low": "0.6201",
                  "4. close": "0.6486",
                  "5. volume": "135992"
              },
              "2024-04-01": {
                  "1. open": "0.7000",
                  "2. high": "0.7100",
                  "3. low": "0.6600",
                  "4. close": "0.6990",
                  "5. volume": "198571"
              },
              "2024-03-28": {
                  "1. open": "0.6373",
                  "2. high": "0.7212",
                  "3. low": "0.6202",
                  "4. close": "0.6820",
                  "5. volume": "279870"
              },
              "2024-03-27": {
                  "1. open": "0.6200",
                  "2. high": "0.6499",
                  "3. low": "0.6200",
                  "4. close": "0.6390",
                  "5. volume": "141621"
              },
              "2024-03-26": {
                  "1. open": "0.6300",
                  "2. high": "0.6480",
                  "3. low": "0.6000",
                  "4. close": "0.6192",
                  "5. volume": "223270"
              },
              "2024-03-25": {
                  "1. open": "0.5630",
                  "2. high": "0.6799",
                  "3. low": "0.5500",
                  "4. close": "0.6480",
                  "5. volume": "555839"
              },
              "2024-03-22": {
                  "1. open": "0.6500",
                  "2. high": "0.7400",
                  "3. low": "0.6484",
                  "4. close": "0.6790",
                  "5. volume": "515452"
              },
              "2024-03-21": {
                  "1. open": "0.5900",
                  "2. high": "0.6500",
                  "3. low": "0.5800",
                  "4. close": "0.6490",
                  "5. volume": "516991"
              },
              "2024-03-20": {
                  "1. open": "0.5580",
                  "2. high": "0.5700",
                  "3. low": "0.5487",
                  "4. close": "0.5640",
                  "5. volume": "243302"
              },
              "2024-03-19": {
                  "1. open": "0.5398",
                  "2. high": "0.5498",
                  "3. low": "0.5300",
                  "4. close": "0.5398",
                  "5. volume": "265286"
              },
              "2024-03-18": {
                  "1. open": "0.5612",
                  "2. high": "0.5750",
                  "3. low": "0.5250",
                  "4. close": "0.5300",
                  "5. volume": "431490"
              },
              "2024-03-15": {
                  "1. open": "0.5830",
                  "2. high": "0.5998",
                  "3. low": "0.5553",
                  "4. close": "0.5600",
                  "5. volume": "428166"
              },
              "2024-03-14": {
                  "1. open": "0.5800",
                  "2. high": "0.6000",
                  "3. low": "0.5639",
                  "4. close": "0.5970",
                  "5. volume": "274745"
              },
              "2024-03-13": {
                  "1. open": "0.5600",
                  "2. high": "0.6125",
                  "3. low": "0.5600",
                  "4. close": "0.5800",
                  "5. volume": "296447"
              },
              "2024-03-12": {
                  "1. open": "0.5700",
                  "2. high": "0.6100",
                  "3. low": "0.5515",
                  "4. close": "0.5710",
                  "5. volume": "543492"
              },
              "2024-03-11": {
                  "1. open": "0.5500",
                  "2. high": "0.5900",
                  "3. low": "0.5500",
                  "4. close": "0.5800",
                  "5. volume": "540658"
              },
              "2024-03-08": {
                  "1. open": "0.5818",
                  "2. high": "0.6290",
                  "3. low": "0.5208",
                  "4. close": "0.5750",
                  "5. volume": "2042699"
              },
              "2024-03-07": {
                  "1. open": "0.8600",
                  "2. high": "0.9000",
                  "3. low": "0.5209",
                  "4. close": "0.5840",
                  "5. volume": "1264336"
              },
              "2024-03-06": {
                  "1. open": "0.8906",
                  "2. high": "0.9376",
                  "3. low": "0.8500",
                  "4. close": "0.8600",
                  "5. volume": "304474"
              },
              "2024-03-05": {
                  "1. open": "0.8000",
                  "2. high": "1.0100",
                  "3. low": "0.7952",
                  "4. close": "0.8910",
                  "5. volume": "2090817"
              },
              "2024-03-04": {
                  "1. open": "0.9089",
                  "2. high": "0.9500",
                  "3. low": "0.7724",
                  "4. close": "0.8002",
                  "5. volume": "2930165"
              },
              "2024-03-01": {
                  "1. open": "1.3700",
                  "2. high": "1.3757",
                  "3. low": "1.2400",
                  "4. close": "1.3300",
                  "5. volume": "408634"
              },
              "2024-02-29": {
                  "1. open": "1.4900",
                  "2. high": "1.5400",
                  "3. low": "1.3400",
                  "4. close": "1.3700",
                  "5. volume": "516557"
              },
              "2024-02-28": {
                  "1. open": "1.6800",
                  "2. high": "1.7145",
                  "3. low": "1.5000",
                  "4. close": "1.5300",
                  "5. volume": "406032"
              },
              "2024-02-27": {
                  "1. open": "1.7200",
                  "2. high": "1.7800",
                  "3. low": "1.6400",
                  "4. close": "1.7450",
                  "5. volume": "274251"
              },
              "2024-02-26": {
                  "1. open": "1.9200",
                  "2. high": "1.9200",
                  "3. low": "1.7000",
                  "4. close": "1.7600",
                  "5. volume": "203920"
              },
              "2024-02-23": {
                  "1. open": "1.7500",
                  "2. high": "1.8367",
                  "3. low": "1.7100",
                  "4. close": "1.8100",
                  "5. volume": "186702"
              },
              "2024-02-22": {
                  "1. open": "1.8700",
                  "2. high": "1.8800",
                  "3. low": "1.6600",
                  "4. close": "1.7300",
                  "5. volume": "256662"
              },
              "2024-02-21": {
                  "1. open": "1.9600",
                  "2. high": "2.0000",
                  "3. low": "1.8000",
                  "4. close": "1.8400",
                  "5. volume": "125624"
              },
              "2024-02-20": {
                  "1. open": "1.9700",
                  "2. high": "2.1500",
                  "3. low": "1.9400",
                  "4. close": "1.9500",
                  "5. volume": "319815"
              },
              "2024-02-16": {
                  "1. open": "2.0100",
                  "2. high": "2.0700",
                  "3. low": "1.9446",
                  "4. close": "1.9600",
                  "5. volume": "123920"
              },
              "2024-02-15": {
                  "1. open": "2.0800",
                  "2. high": "2.0800",
                  "3. low": "1.9300",
                  "4. close": "2.0700",
                  "5. volume": "117013"
              },
              "2024-02-14": {
                  "1. open": "1.9400",
                  "2. high": "2.1000",
                  "3. low": "1.9400",
                  "4. close": "2.0700",
                  "5. volume": "136406"
              },
              "2024-02-13": {
                  "1. open": "2.0300",
                  "2. high": "2.0799",
                  "3. low": "1.9100",
                  "4. close": "1.9200",
                  "5. volume": "128103"
              },
              "2024-02-12": {
                  "1. open": "2.0400",
                  "2. high": "2.1980",
                  "3. low": "2.0000",
                  "4. close": "2.0900",
                  "5. volume": "254498"
              },
              "2024-02-09": {
                  "1. open": "1.9200",
                  "2. high": "2.0700",
                  "3. low": "1.9200",
                  "4. close": "2.0300",
                  "5. volume": "219031"
              },
              "2024-02-08": {
                  "1. open": "1.9000",
                  "2. high": "1.9999",
                  "3. low": "1.8500",
                  "4. close": "1.9400",
                  "5. volume": "129901"
              },
              "2024-02-07": {
                  "1. open": "2.0700",
                  "2. high": "2.0700",
                  "3. low": "1.8792",
                  "4. close": "1.9500",
                  "5. volume": "131864"
              },
              "2024-02-06": {
                  "1. open": "1.8400",
                  "2. high": "2.0900",
                  "3. low": "1.8397",
                  "4. close": "2.0700",
                  "5. volume": "192349"
              },
              "2024-02-05": {
                  "1. open": "1.8800",
                  "2. high": "1.9316",
                  "3. low": "1.8301",
                  "4. close": "1.8600",
                  "5. volume": "55302"
              },
              "2024-02-02": {
                  "1. open": "1.9600",
                  "2. high": "1.9600",
                  "3. low": "1.8100",
                  "4. close": "1.8900",
                  "5. volume": "86204"
              },
              "2024-02-01": {
                  "1. open": "1.9800",
                  "2. high": "2.0476",
                  "3. low": "1.8212",
                  "4. close": "1.9300",
                  "5. volume": "152130"
              },
              "2024-01-31": {
                  "1. open": "2.0400",
                  "2. high": "2.0784",
                  "3. low": "1.9400",
                  "4. close": "1.9800",
                  "5. volume": "162985"
              },
              "2024-01-30": {
                  "1. open": "2.3700",
                  "2. high": "2.3800",
                  "3. low": "1.9000",
                  "4. close": "2.0200",
                  "5. volume": "447894"
              },
              "2024-01-29": {
                  "1. open": "2.3700",
                  "2. high": "2.4800",
                  "3. low": "1.9300",
                  "4. close": "2.3700",
                  "5. volume": "570210"
              },
              "2024-01-26": {
                  "1. open": "2.1400",
                  "2. high": "2.4500",
                  "3. low": "2.1300",
                  "4. close": "2.3700",
                  "5. volume": "608462"
              },
              "2024-01-25": {
                  "1. open": "1.9900",
                  "2. high": "2.1400",
                  "3. low": "1.9550",
                  "4. close": "2.1400",
                  "5. volume": "238878"
              },
              "2024-01-24": {
                  "1. open": "1.9600",
                  "2. high": "1.9600",
                  "3. low": "1.8500",
                  "4. close": "1.9600",
                  "5. volume": "98458"
              },
              "2024-01-23": {
                  "1. open": "1.8200",
                  "2. high": "1.9400",
                  "3. low": "1.8200",
                  "4. close": "1.9200",
                  "5. volume": "277319"
              },
              "2024-01-22": {
                  "1. open": "1.5800",
                  "2. high": "1.7800",
                  "3. low": "1.5800",
                  "4. close": "1.7600",
                  "5. volume": "215609"
              },
              "2024-01-19": {
                  "1. open": "1.5200",
                  "2. high": "1.6000",
                  "3. low": "1.4850",
                  "4. close": "1.5800",
                  "5. volume": "169263"
              },
              "2024-01-18": {
                  "1. open": "1.6500",
                  "2. high": "1.6500",
                  "3. low": "1.5050",
                  "4. close": "1.5200",
                  "5. volume": "202758"
              },
              "2024-01-17": {
                  "1. open": "1.6200",
                  "2. high": "1.6400",
                  "3. low": "1.6000",
                  "4. close": "1.6100",
                  "5. volume": "136812"
              },
              "2024-01-16": {
                  "1. open": "1.7300",
                  "2. high": "1.7300",
                  "3. low": "1.6400",
                  "4. close": "1.6700",
                  "5. volume": "126710"
              },
              "2024-01-12": {
                  "1. open": "1.7400",
                  "2. high": "1.7800",
                  "3. low": "1.6600",
                  "4. close": "1.7000",
                  "5. volume": "147620"
              },
              "2024-01-11": {
                  "1. open": "1.7500",
                  "2. high": "1.7900",
                  "3. low": "1.6700",
                  "4. close": "1.7200",
                  "5. volume": "199790"
              },
              "2024-01-10": {
                  "1. open": "1.8800",
                  "2. high": "1.8845",
                  "3. low": "1.7100",
                  "4. close": "1.7400",
                  "5. volume": "303927"
              },
              "2024-01-09": {
                  "1. open": "2.0100",
                  "2. high": "2.0600",
                  "3. low": "1.8600",
                  "4. close": "1.8800",
                  "5. volume": "301384"
              },
              "2024-01-08": {
                  "1. open": "2.0400",
                  "2. high": "2.0900",
                  "3. low": "1.9500",
                  "4. close": "2.0000",
                  "5. volume": "324736"
              },
              "2024-01-05": {
                  "1. open": "2.0100",
                  "2. high": "2.0600",
                  "3. low": "1.7800",
                  "4. close": "2.0000",
                  "5. volume": "722772"
              },
              "2024-01-04": {
                  "1. open": "2.4500",
                  "2. high": "2.5800",
                  "3. low": "1.9600",
                  "4. close": "2.0200",
                  "5. volume": "1447178"
              },
              "2024-01-03": {
                  "1. open": "2.1700",
                  "2. high": "2.5486",
                  "3. low": "2.1602",
                  "4. close": "2.4000",
                  "5. volume": "1045024"
              },
              "2024-01-02": {
                  "1. open": "2.1900",
                  "2. high": "2.6600",
                  "3. low": "2.0200",
                  "4. close": "2.1900",
                  "5. volume": "2776584"
              },
              "2023-12-29": {
                  "1. open": "1.8500",
                  "2. high": "2.6700",
                  "3. low": "1.8200",
                  "4. close": "2.2800",
                  "5. volume": "8313441"
              },
              "2023-12-28": {
                  "1. open": "1.3800",
                  "2. high": "1.7500",
                  "3. low": "1.3550",
                  "4. close": "1.7300",
                  "5. volume": "1979278"
              },
              "2023-12-27": {
                  "1. open": "1.3400",
                  "2. high": "1.3900",
                  "3. low": "1.3400",
                  "4. close": "1.3700",
                  "5. volume": "280796"
              },
              "2023-12-26": {
                  "1. open": "1.2600",
                  "2. high": "1.3410",
                  "3. low": "1.2600",
                  "4. close": "1.3400",
                  "5. volume": "213786"
              },
              "2023-12-22": {
                  "1. open": "1.2700",
                  "2. high": "1.3100",
                  "3. low": "1.2600",
                  "4. close": "1.2700",
                  "5. volume": "235960"
              },
              "2023-12-21": {
                  "1. open": "1.2900",
                  "2. high": "1.3300",
                  "3. low": "1.2600",
                  "4. close": "1.2800",
                  "5. volume": "363900"
              },
              "2023-12-20": {
                  "1. open": "1.3200",
                  "2. high": "1.3500",
                  "3. low": "1.2800",
                  "4. close": "1.2900",
                  "5. volume": "162862"
              },
              "2023-12-19": {
                  "1. open": "1.3000",
                  "2. high": "1.3500",
                  "3. low": "1.3000",
                  "4. close": "1.3000",
                  "5. volume": "152567"
              },
              "2023-12-18": {
                  "1. open": "1.2900",
                  "2. high": "1.3600",
                  "3. low": "1.2700",
                  "4. close": "1.2900",
                  "5. volume": "191857"
              },
              "2023-12-15": {
                  "1. open": "1.4000",
                  "2. high": "1.4100",
                  "3. low": "1.2500",
                  "4. close": "1.2500",
                  "5. volume": "327494"
              },
              "2023-12-14": {
                  "1. open": "1.3400",
                  "2. high": "1.4300",
                  "3. low": "1.3350",
                  "4. close": "1.3900",
                  "5. volume": "325601"
              },
              "2023-12-13": {
                  "1. open": "1.3000",
                  "2. high": "1.3300",
                  "3. low": "1.2400",
                  "4. close": "1.3000",
                  "5. volume": "217172"
              },
              "2023-12-12": {
                  "1. open": "1.2900",
                  "2. high": "1.3000",
                  "3. low": "1.2316",
                  "4. close": "1.2600",
                  "5. volume": "246791"
              },
              "2023-12-11": {
                  "1. open": "1.3300",
                  "2. high": "1.3700",
                  "3. low": "1.2714",
                  "4. close": "1.2900",
                  "5. volume": "176211"
              }
          }
      }
  ],
  REMINDERS : []
  };

export const fetchData = createAsyncThunk('app/fetchData', async () => {
    const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=YYF59623R1GU0KKZ');
    const data = await response.json();
    return data;
});

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        // Define reducers to update state
        // For example:
        updateData(state, action) {
            state.data = action.payload;
        },
        addInUserWatchList (state,action){
          state.USER_WATCHLIST.push(action.payload.item);
          const current=state.ALL_DATA_STOCKS.find(obj => obj["Meta Data"]["2. Symbol"] === action.payload.item);
          state.USER_INDICATORS.map(item =>{
            if (item == "Relative Strength Index"){
              if(current["RSI"]!="NEUTRAL")
              state.REMINDERS.push(action.payload.item+" - "+current["RSI"]+" - Based on Relative strength index")
            }
            if (item == "MACD"){
              if(current["MACD"]!="NEUTRAL")
              state.REMINDERS.push(action.payload.item+" - "+current["MACD"]+" MACD")
            }
            if (item == "Harami"){
              if(current["HARAMI"]!="NEUTRAL")
              state.REMINDERS.push(action.payload.item+" - "+current["HARAMI"]+" HARAMI")
            }
            if (item == "Engulfing Pattern"){
              if(current["ENGULFING"]!="NEUTRAL")
              state.REMINDERS.push(action.payload.item+" - "+current["ENGULFING"]+" ENGULFING")
            }
            if (item == "Hammer"){
              if(current["hammer"]!="NEUTRAL")
              state.REMINDERS.push(action.payload.item+" - "+current["hammer"]+" HAMMER")
            }
            if (item == "Moving Average"){
              if(current["moving_avg"]!="NEUTRAL")
              state.REMINDERS.push(action.payload.item+" - "+current["moving_avg"]+" MOVING AVG")
            }
            if (item == "Doji"){
              if(current["is_doji"]!="NEUTRAL")
              state.REMINDERS.push(action.payload.item+" - "+current["is_doji"]+" DOJI")
            }
          });
        },
        deleteItem(state, action) {
            const new_list = [];
            state.REMINDERS.map((item)=>{
              console.log(item,state.USER_WATCHLIST[action.payload],item.includes(state.USER_WATCHLIST[action.payload]))
              if(!item.includes(state.USER_WATCHLIST[action.payload])){
                new_list.push(item);
                console.log(item)
              }

            });
            state.REMINDERS = new_list;
            state.USER_WATCHLIST.splice(action.payload, 1);

          },
          addInUserIndicators (state,action){
            const item=action.payload.item;
            state.USER_WATCHLIST.map((symb)=>{
              const current=state.ALL_DATA_STOCKS.find(obj => obj["Meta Data"]["2. Symbol"] === symb);
              if (item == "Relative Strength Index"){
                if(current["RSI"]!="NEUTRAL")
                state.REMINDERS.push(symb+" - "+current["RSI"]+" - Based on Relative strength index")
              }
              if (item == "MACD"){
                if(current["MACD"]!="NEUTRAL")
                state.REMINDERS.push(symb+" - "+current["MACD"]+" MACD")
              }
              if (item == "Harami"){
                if(current["HARAMI"]!="NEUTRAL")
                state.REMINDERS.push(symb+" - "+current["HARAMI"]+" HARAMI")
              }
              if (item == "Engulfing Pattern"){
                if(current["ENGULFING"]!="NEUTRAL")
                state.REMINDERS.push(symb+" - "+current["ENGULFING"]+" ENGULFING")
              }
              if (item == "Hammer"){
                if(current["hammer"]!="NEUTRAL")
                state.REMINDERS.push(symb+" - "+current["hammer"]+" HAMMER")
              }
              if (item == "Moving Average"){
                if(current["moving_avg"]!="NEUTRAL")
                state.REMINDERS.push(symb+" - "+current["moving_avg"]+" MOVING AVG")
              }
              if (item == "Doji"){
                if(current["is_doji"]!="NEUTRAL")
                state.REMINDERS.push(symb+" - "+current["is_doji"]+" DOJI")
              }


            });

          state.USER_INDICATORS.push(action.payload.item);
        },
        deleteUserIndicator(state, action) {
          const new_list = [];
          state.REMINDERS.map((item)=>{
            console.log(item,state.USER_WATCHLIST[action.payload],item.includes(state.USER_WATCHLIST[action.payload]))
            if(!item.includes(state.USER_WATCHLIST[action.payload])){
              new_list.push(item);
              console.log(item)
            }

          });
          state.REMINDERS = new_list;
            state.USER_INDICATORS.splice(action.payload, 1);
          },
          analyzeAllStocks(state,action){
            console.log(state.ALL_DATA_STOCKS)
            let new_symb_list = [];
            let new_all_stocks_list = [];
            let period = 50
            state.ALL_DATA_STOCKS.map((obj)=>{
              new_symb_list.push(obj["Meta Data"]["2. Symbol"])
              obj["is_doji"] = Math.abs(parseFloat(obj["Time Series (Daily)"]["2024-05-03"]["1. open"]) - parseFloat(obj["Time Series (Daily)"]["2024-05-03"]["4. close"])) < 0.01 * parseFloat(obj["Time Series (Daily)"]["2024-05-03"]["1. open"]) || Math.abs(parseFloat(obj["Time Series (Daily)"]["2024-05-02"]["1. open"]) - parseFloat(obj["Time Series (Daily)"]["2024-05-02"]["4. close"])) < 0.01 * parseFloat(obj["Time Series (Daily)"]["2024-05-02"]["1. open"]) ? "FOUND" : "NEUTRAL";
              const dates = Object.keys(obj["Time Series (Daily)"]);
              const closingPrices = dates.map(date => parseFloat(obj["Time Series (Daily)"][date]['4. close']));
              const movingAverage = [];
          
              for (let i = period - 1; i < closingPrices.length; i++) {
                  const sum = closingPrices.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val, 0);
                  const average = sum / period;
                  movingAverage.push(average);
              }     
              const lastMA = movingAverage[movingAverage.length - 1];
    
              if (parseFloat(obj["Time Series (Daily)"]["2024-05-03"]['4. close']) > lastMA) {
                obj["moving_avg"]='UPTREND';
              } else if (parseFloat(obj["Time Series (Daily)"]["2024-05-03"]['4. close']) < lastMA) {
                obj["moving_avg"]= 'DOWNTREND';
              } else {
                obj["moving_avg"]= 'NEUTRAL';
              }     
              const data = obj["Time Series (Daily)"]
               period = 10
              const closePrices = Object.values(data).map(entry => parseFloat(entry['4. close']));
              const changes = [];
          
              // Calculate price changes
              for (let i = 1; i < closePrices.length; i++) {
                  changes.push(closePrices[i] - closePrices[i - 1]);
              }
          
              // Calculate gains and losses
              const gains = [];
              const losses = [];
              for (let i = 0; i < changes.length; i++) {
                  if (changes[i] > 0) {
                      gains.push(changes[i]);
                      losses.push(0);
                  } else {
                      gains.push(0);
                      losses.push(Math.abs(changes[i]));
                  }
              }
          
              // Calculate average gains and losses
              let avgGain = gains.slice(0, period).reduce((acc, val) => acc + val, 0) / period;
              let avgLoss = losses.slice(0, period).reduce((acc, val) => acc + val, 0) / period;
          
              // Calculate initial RS
              let RS = avgGain / avgLoss;
              let RSI = 100 - (100 / (1 + RS));
          
              // Calculate subsequent RS and RSI
              for (let i = period; i < changes.length; i++) {
                  let gain = changes[i] > 0 ? changes[i] : 0;
                  let loss = changes[i] < 0 ? Math.abs(changes[i]) : 0;
          
                  avgGain = ((avgGain * (period - 1)) + gain) / period;
                  avgLoss = ((avgLoss * (period - 1)) + loss) / period;
          
                  RS = avgGain / avgLoss;
                  RSI = 100 - (100 / (1 + RS));
              }
              if (RSI > 70){
                obj["RSI"] = "OVER BOUGHT";
              }
              else if (RSI < 30){
                obj["RSI"] = "OVER SOLD";
              }
              else{
                obj["RSI"] = "NEUTRAL";
              }

              // Calculate short-term EMA (Exponential Moving Average)
              const shortEMA = [];
              const shortPeriod = 20;
              const longPeriod = 50
              let shortEMA_prev = closePrices.slice(0, shortPeriod).reduce((acc, val) => acc + val, 0) / shortPeriod;
              shortEMA.push(shortEMA_prev);
              for (let i = shortPeriod; i < closePrices.length; i++) {
                  const EMA = (closePrices[i] - shortEMA_prev) * (2 / (shortPeriod + 1)) + shortEMA_prev;
                  shortEMA.push(EMA);
                  shortEMA_prev = EMA;
              }
          
              // Calculate long-term EMA
              const longEMA = [];
              let longEMA_prev = closePrices.slice(0, longPeriod).reduce((acc, val) => acc + val, 0) / longPeriod;
              longEMA.push(longEMA_prev);
              for (let i = longPeriod; i < closePrices.length; i++) {
                  const EMA = (closePrices[i] - longEMA_prev) * (2 / (longPeriod + 1)) + longEMA_prev;
                  longEMA.push(EMA);
                  longEMA_prev = EMA;
              }
          
              // Calculate MACD line
              const MACDLine = [];
              for (let i = 0; i < shortEMA.length; i++) {
                  const MACD = shortEMA[i] - longEMA[i];
                  MACDLine.push(MACD);
              }
              const signalPeriod=10;
              const signalLine = [];
              let signalEMA_prev = MACDLine.slice(0, signalPeriod).reduce((acc, val) => acc + val, 0) / signalPeriod;
              signalLine.push(signalEMA_prev);
              for (let i = signalPeriod; i < MACDLine.length; i++) {
                  const EMA = (MACDLine[i] - signalEMA_prev) * (2 / (signalPeriod + 1)) + signalEMA_prev;
                  signalLine.push(EMA);
                  signalEMA_prev = EMA;
              }
              const currentMACD = MACDLine[0];
              const currentSignal = signalLine[0];
          
              obj["MACD"]=currentMACD > currentSignal ? "POSITIVE": "NEGATIVE";
              const currentDateData = data["2024-05-03"];
              const open = parseFloat(currentDateData["1. open"]);
              const close = parseFloat(currentDateData["4. close"]);
              const high = parseFloat(currentDateData["2. high"]);
              const low = parseFloat(currentDateData["3. low"]);          
              const body = Math.abs(open - close);
              const lowerShadow = Math.abs(open - low);
              const upperShadow = Math.abs(high - close);
          
              obj["hammer"] = 
                  body < 0.1 * open && // Small body
                  lowerShadow >= 2 * body && // Lower shadow at least twice as long as body
                  upperShadow < 0.1 * open ? "FOUND" : "NEUTRAL"// Little to no upper shadow
                  const prevDateData = data["2024-05-02"];
                  const prevOpen = parseFloat(prevDateData["1. open"]);
                  const prevClose = parseFloat(prevDateData["4. close"]);
                  const currentOpen = parseFloat(currentDateData["1. open"]);
                  const currentClose = parseFloat(currentDateData["4. close"]);
                  if (        currentOpen < prevClose && // Current candle opens below the previous close
                  currentClose > prevOpen && // Current candle closes above the previous open
                  currentClose > prevClose && // Current candle closes above the previous close
                  currentOpen < prevOpen )
                  obj["ENGULFING"] = "BULLISH";
                  else if(        currentOpen > prevClose && // Current candle opens above the previous close
                  currentClose < prevOpen && // Current candle closes below the previous open
                  currentClose < prevClose && // Current candle closes below the previous close
                  currentOpen > prevOpen )
                  obj["ENGULFING"] = "BEARISH";
                  else{
                    obj["ENGULFING"] = "NEUTRAL";
                  }
                  if (        currentOpen < prevClose && // Current candle opens below the previous close
                  currentClose > prevOpen && // Current candle closes above the previous open
                  currentClose < prevClose && // Current candle closes below the previous close
                  currentOpen > prevOpen )
                  obj["HARAMI"] = "BULLISH";
                  else if (        currentOpen > prevClose && // Current candle opens above the previous close
                  currentClose < prevOpen && // Current candle closes below the previous open
                  currentClose > prevClose && // Current candle closes above the previous close
                  currentOpen < prevOpen ){
                    obj["HARAMI"] = "BEARISH";
                  }
                  else{
                    obj["HARAMI"] = "NEUTRAL";
                  }
                  new_all_stocks_list.push( obj );
        console.log(obj["HARAMI"])
            });
            state.ALL_DATA_STOCKS = new_all_stocks_list;
            state.US_STOCKS = new_symb_list;
          }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchData.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
          })
          .addCase(fetchData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
      },
    },
);

export const { updateData,addInUserWatchList,deleteItem ,deleteUserIndicator,addInUserIndicators,analyzeAllStocks} = appSlice.actions;
export default appSlice.reducer;
