export const passwordTemplate = (url: string, name: string): string => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
        </head>
        <body>
            <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="padding: 0; margin: 0 auto; width: 100%; max-width: 620px"
            >
                <style>
                    tbody {
                        font-family: 'Haas Grot Text R Web',
                                                                'Helvetica Neue',
                                                                Helvetica, Arial,
                                                                sans-serif;
                        margin: 0;
                        padding: 0;
                    }
                </style>
                <tbody>
                    <tr>
                        <td
                            colspan="3"
                            style="
                                padding: 0;
                                margin: 0;
                                font-size: 1px;
                                height: 1px;
                            "
                            height="1"
                        >
                            &nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0; margin: 0; font-size: 1px">
                            &nbsp;
                        </td>
                        <td style="padding: 0; margin: 0" width="590">
                            <table
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                            >
                                <tbody>
                                    <tr style="background-color: #3e7d73">
    
                                        <td
                                            style="
                                                padding: 11px 23px 8px 15px;
                                                float: right;
                                                line-height: 1;
                                                                                                text-decoration: none;
                                                font-weight: 500;
                                                font-size: 16px;
                                                color: #ffffff;
                                            "
                                        >
                                            <p style="float: right;
                                            font-weight: 500;
                                            font-size: 16px;
                                            color: #ffffff;
                                            ">${name}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                            >
                                <tbody>
                                    <tr>
                                        <td height="0"></td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="display: none">
                                            <img
                                                width="90"
                                                style="
                                                    width: 90px;
                                                    text-align: center;
                                                "
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td height="0"></td>
                                    </tr>
                                    <tr>
                                        <td
                                            style="
                                                padding: 63px 33px;
                                                text-align: center;
                                            "
                                            align="center"
                                        >
                                            <span
                                                style="
                                                    font-size: 26px;
                                                    font-weight: 400;
                                                    color: #333333;
                                                    text-decoration: none;
                                                    line-height: 1.2;
                                                "
                                                >Reset your account's password by
                                                pressing the following button.</span
                                            >
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style="text-align: center; margin: 0 auto">
                                <table
                                    bgcolor="#ffffff"
                                    align="center"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    style="
                                        border: none;
                                        padding: 48px 33px 0;
                                        text-align: center;
                                    "
                                >
                                    <tbody>
                                        <tr>
                                            <td align="center">
                                                <p
                                                    style="
                                                        text-decoration: none;
                                                        font-weight: 400;
                                                        font-size: 16px;
                                                        text-align: center;
                                                        color: rgba(0, 0, 0, 0.45);
                                                        line-height: 1.2;
                                                        max-width: 390px;
                                                        width: 100%;
                                                        margin: 0 auto;
                                                    "
                                                >
                                                    Salutations, ${name}! This here
                                                    missive be meant solely for
                                                    thee, that thou mayst safeguard
                                                    thy account. No soul from the
                                                    realm of Robin Boook shall
                                                    beseech this of thee in any
                                                    circumstance, mark my words.
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style="
                                                    text-align: center;
                                                    padding: 0;
                                                "
                                            >
                                                <div
                                                    style="
                                                        height: 25px;
                                                        margin: 0 auto;
                                                    "
                                                >
                                                    &nbsp;
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <a href="${url}">
                                                    <button
                                                        style="
                                                            cursor: pointer;
                                                            background-color: #3e7d73;
                                                            border-radius: 7px;
                                                            border-style: none;
                                                            box-sizing: border-box;
                                                            color: #ffffff;
                                                            cursor: pointer;
                                                            display: inline-block;
                                                            font-family: 'Haas Grot Text R Web',
                                                                'Helvetica Neue',
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                            font-size: 14px;
                                                            font-weight: 500;
                                                            line-height: 20px;
                                                            list-style: none;
                                                            margin: 0;
                                                            outline: none;
                                                            padding: 16px 24px;
                                                            position: relative;
                                                            text-align: center;
                                                            text-decoration: none;
                                                            transition: color 100ms;
                                                            vertical-align: baseline;
                                                            user-select: none;
                                                            -webkit-user-select: none;
                                                            touch-action: manipulation;
                                                        "
                                                    >
                                                        Reset Password
                                                    </button>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style="
                                                    text-align: center;
                                                    padding: 0;
                                                "
                                            >
                                                <div
                                                    style="
                                                        height: 25px;
                                                        margin: 0 auto;
                                                    "
                                                >
                                                    &nbsp;
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <p
                                                    style="
                                                        text-decoration: none;
                                                        font-weight: 400;
                                                        font-size: 16px;
                                                        text-align: center;
                                                        color: rgba(0, 0, 0, 0.45);
                                                        line-height: 1.2;
                                                        max-width: 390px;
                                                        width: 100%;
                                                        margin: 0 auto;
                                                    "
                                                >
                                                    Verily, mark ye well, forsooth,
                                                    that its expiration doth draw
                                                    nigh in but half an hour's span.
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style="
                                                    text-align: center;
                                                    padding: 0;
                                                "
                                            >
                                                <div
                                                    style="
                                                        height: 50px;
                                                        margin: 0 auto;
                                                    "
                                                >
                                                    &nbsp;
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <table
                                align="center"
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                                style="
                                    text-align: center;
                                    background-color: #f8f8f8 !important;
                                "
                            >
                                <tbody>
                                    <tr
                                        style="background-color: #f8f8f8 !important"
                                    >
                                        <td
                                            colspan="3"
                                            align="center"
                                            height="48"
                                        ></td>
                                    </tr>
                                    <tr style="background-color: #f8f8f8">
                                        <td                                        colspan="3"
                                        align="center"
                                        style="
                                            font-size: 13px;
                                            font-weight: 300;
                                            line-height: 1.08;
                                            padding: 11px 23px 8px 15px;
                                            float: right;
    
                                            text-align: center;
                                            color: #999;
                                        "
                                    >
                                        <a
                                            href="https://robinboook.com/#/app/info/faq"
                                            style="
                                                text-decoration: none;
                                                font-weight: 500;
                                                font-size: 16px;
                                                color: #000;
                                            "
                                            target="_blank"
                                            >ROBIN BOOOK</a
                                        >
                                        </td>
                                        <td
                                            colspan="6"
                                            align="center"
                                            style="
                                                font-size: 13px;
                                                font-weight: 300;
                                                line-height: 1.08;
                                                padding: 11px 23px 8px 15px;
                                                float: left;
    
                                                text-align: center;
                                                color: #999;
                                            "
                                        >
                                            Do you need help?
                                            <a
                                                href="https://robinboook.com/#/app/info/faq"
                                                style="
                                                    text-decoration: none;
                                                    font-weight: 400;
                                                    color: #ccda4e;
                                                "
                                                target="_blank"
                                                >Contact us.</a
                                            >
                                        </td>
                                    </tr>
                                    <tr style="background-color: #f8f8f8">
                                        <td
                                            colspan="3"
                                            align="center"
                                            height="48"
                                        ></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td style="padding: 0; margin: 0; font-size: 1px">
                            &nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td
                            colspan="3"
                            style="
                                padding: 0;
                                margin: 0;
                                font-size: 1px;
                                height: 1px;
                            "
                            height="1"
                        >
                            &nbsp;
                        </td>
                    </tr>
                </tbody>
            </table>
        </body>
    </html>
    `}
