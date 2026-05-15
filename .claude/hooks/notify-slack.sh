#!/bin/bash
# Claude Code → Slack 알림 훅
# Notification(권한 요청) 및 Stop(작업 완료) 이벤트를 Slack으로 전송합니다.
# 필요 환경변수: SLACK_WEBHOOK_URL

WEBHOOK_URL="${SLACK_WEBHOOK_URL}"

# 웹훅 URL 미설정 시 조용히 종료 (Claude Code 동작에 영향 없음)
if [ -z "$WEBHOOK_URL" ]; then
  exit 0
fi

input=$(cat)
event=$(echo "$input" | jq -r '.hook_event_name')
project=$(basename "$(echo "$input" | jq -r '.cwd // ""')")

case "$event" in
  "Notification")
    message=$(echo "$input" | jq -r '.message // "권한 요청 또는 알림이 있습니다."')
    payload=$(jq -n \
      --arg project "$project" \
      --arg message "$message" \
      '{
        text: "🔔 *Claude Code — 확인 필요*",
        attachments: [{
          color: "#FF9800",
          fields: [
            {title: "프로젝트", value: $project, short: true},
            {title: "내용",    value: $message, short: false}
          ],
          footer: "Claude Code · Notification Hook"
        }]
      }')
    ;;

  "Stop")
    payload=$(jq -n \
      --arg project "$project" \
      '{
        text: "✅ *Claude Code — 작업 완료*",
        attachments: [{
          color: "#4CAF50",
          fields: [
            {title: "프로젝트", value: $project, short: true},
            {title: "상태",    value: "작업이 완료되었습니다", short: true}
          ],
          footer: "Claude Code · Stop Hook"
        }]
      }')
    ;;

  *)
    exit 0
    ;;
esac

curl -s -X POST \
  -H 'Content-type: application/json' \
  --data "$payload" \
  "$WEBHOOK_URL" > /dev/null 2>&1

exit 0
