import React, { useEffect, useRef } from 'react';

function kakaoSideRightAdfit() {
    // 최초 1회만 광고를 불러오기 위한 변수
    const adRef = useRef<boolean>(false);

    useEffect(() => {
        // 로딩된 광고가 있으면, 추가 로딩 X
        if (adRef.current) {
            return;
        }

        // 윈도우 사이즈에 따라 광고 사이즈 조정(사이즈마다 해당 광고 단위 ID 적용)
        const winodwSize = window.innerWidth;
        if (winodwSize > 980) {
            const ins: any = document.createElement('ins');
            const script: any = document.createElement('script');

            ins.className = 'kakao_ad_area';
            ins.style = 'display:none; position: fixed; right: 120px; top:90px';

            ins.setAttribute('data-ad-width', '160');
            ins.setAttribute('data-ad-height', '600');
            ins.setAttribute('data-ad-unit', 'DAN-0B2DjbAPc5ducndB');

            script.async = 'true';
            script.type = 'text/javascript';
            script.src = '//t1.daumcdn.net/kas/static/ba.min.js';

            document.querySelector('.aside_side_right_kakaoAdFit')?.appendChild(ins);
            document.querySelector('.aside_side_right_kakaoAdFit')?.appendChild(script);

            // 광고 로딩 여부 상태 변경
            adRef.current = true;
        }
    }, []);
    return (
        <>
            <div className="aside_side_right_kakaoAdFit"></div>
        </>
    );
}

export default React.memo(kakaoSideRightAdfit);
